const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

const EWEM_DIR = '/home/anonymous/EWEM-dashboard/RECLAIM/ewem';
const PUBLIC_FILES_DIR = path.join(__dirname, '..', 'public', 'coursework', 'files');
const PUBLIC_PREVIEWS_DIR = path.join(__dirname, '..', 'public', 'coursework', 'previews');
const MANIFEST_PATH = path.join(__dirname, '..', 'src', 'data', 'courseworkManifest.json');

// Ensure destination directories exist
fs.mkdirSync(PUBLIC_FILES_DIR, { recursive: true });
fs.mkdirSync(PUBLIC_PREVIEWS_DIR, { recursive: true });
fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });

// Authoritative assignment mapping based on folder names
const FOLDER_TO_ASSIGNMENT_MAP = {
  'Toxic Chemicals_Any 5': 'EW-01',
  'Assignment 2_Submit the Class Activity_Map of e waste': 'EW-02',
  'Assignment 3_Elemental Recovery Process Update': 'EW-03',
  'Assignment Zero_Check AAP': 'EW-04',
  'Assignment 1_ E waste Traker': 'EW-05',
  'E waste India Vs World Data Task_Class Activity': 'EW-06',
  'Carbon Footprint Task_Excel activity Task': 'EW-07',
  'TE CMPN C PPT_ State tracker submission Folder': 'EW-08',
  'E Waste Recovery Process_Modification for Design Patent': 'EW-09',
  'Indian Companies Following E waste Rules_Comparative Study': 'EW-10',
  'Novel Idea_E waste_Pitch Deck Submit Folder_CMPN C': 'EW-11',
  'Campaign For E Waste in Campus_Class Activity': 'EW-12',
  'LEED Certification of Green Buildings in India': 'EW-13',
  'Case Studies E waste': 'EW-14',
};

function getMimeType(ext) {
  switch (ext.toLowerCase()) {
    case '.pdf': return 'application/pdf';
    case '.pptx': return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    case '.ppt': return 'application/vnd.ms-powerpoint';
    case '.docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case '.doc': return 'application/msword';
    case '.xlsx': return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case '.xls': return 'application/vnd.ms-excel';
    case '.csv': return 'text/csv';
    case '.html':
    case '.htm': return 'text/html';
    case '.jpeg':
    case '.jpg': return 'image/jpeg';
    case '.png': return 'image/png';
    case '.webp': return 'image/webp';
    case '.txt': return 'text/plain';
    default: return 'application/octet-stream';
  }
}

function getPreviewType(ext) {
  switch (ext.toLowerCase()) {
    case '.pdf': return 'pdf';
    case '.pptx':
    case '.ppt': return 'presentation';
    case '.docx':
    case '.doc': return 'document';
    case '.xlsx':
    case '.xls':
    case '.csv': return 'spreadsheet';
    case '.html':
    case '.htm': return 'html';
    case '.jpeg':
    case '.jpg':
    case '.png':
    case '.webp': return 'image';
    default: return 'download_only';
  }
}

function computeSha256(filePath) {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

// Convert PPTX/DOCX to PDF and images using LibreOffice & pdftoppm
function generateDocumentPreviews(sourcePath, baseFileId) {
  const ext = path.extname(sourcePath).toLowerCase();
  const previews = [];

  if (ext === '.pptx' || ext === '.ppt' || ext === '.docx') {
    const tmpDir = path.join(PUBLIC_PREVIEWS_DIR, baseFileId);
    fs.mkdirSync(tmpDir, { recursive: true });

    try {
      console.log(`Converting ${path.basename(sourcePath)} to PDF via LibreOffice...`);
      execSync(`libreoffice --headless --convert-to pdf "${sourcePath}" --outdir "${tmpDir}"`, {
        stdio: 'pipe',
        timeout: 30000,
      });

      const convertedPdfName = path.basename(sourcePath, ext) + '.pdf';
      const convertedPdfPath = path.join(tmpDir, convertedPdfName);

      if (fs.existsSync(convertedPdfPath)) {
        // Also convert PDF pages to PNG slides using pdftoppm
        console.log(`Rendering slide images via pdftoppm for ${convertedPdfName}...`);
        execSync(`pdftoppm -png -r 150 "${convertedPdfPath}" "${path.join(tmpDir, 'slide')}"`, {
          stdio: 'pipe',
          timeout: 30000,
        });

        // Collect all slide PNGs
        const generatedSlides = fs.readdirSync(tmpDir)
          .filter(f => f.startsWith('slide-') && f.endsWith('.png'))
          .sort((a, b) => {
            const numA = parseInt(a.replace('slide-', '').replace('.png', ''), 10);
            const numB = parseInt(b.replace('slide-', '').replace('.png', ''), 10);
            return numA - numB;
          })
          .map(f => `/coursework/previews/${baseFileId}/${f}`);

        return {
          pdfPreviewUrl: `/coursework/previews/${baseFileId}/${convertedPdfName}`,
          slideImages: generatedSlides,
        };
      }
    } catch (err) {
      console.warn(`Preview conversion note for ${sourcePath}: ${err.message}`);
    }
  }

  return { pdfPreviewUrl: null, slideImages: [] };
}

console.log('--- RECLAIM Phase 3: Ingesting Coursework Deliverables ---');

const manifestFiles = [];
const subdirs = fs.readdirSync(EWEM_DIR);

for (const folderName of subdirs) {
  const folderPath = path.join(EWEM_DIR, folderName);
  if (!fs.statSync(folderPath).isDirectory()) continue;

  const assignmentId = FOLDER_TO_ASSIGNMENT_MAP[folderName] || 'UNMAPPED';
  console.log(`Scanning [${folderName}] -> Mapping: ${assignmentId}`);

  const filesInFolder = fs.readdirSync(folderPath);
  for (const filename of filesInFolder) {
    const sourceFilePath = path.join(folderPath, filename);
    if (!fs.statSync(sourceFilePath).isFile()) continue;

    const ext = path.extname(filename);
    const size = fs.statSync(sourceFilePath).size;
    const sha256 = computeSha256(sourceFilePath);
    const mimeType = getMimeType(ext);
    const previewType = getPreviewType(ext);

    // Create safe target filename
    const safeFileId = `${assignmentId}_${crypto.randomBytes(4).toString('hex')}`;
    const targetFilename = `${assignmentId}_${filename.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const targetFilePath = path.join(PUBLIC_FILES_DIR, targetFilename);

    // Copy original file to public directory without modifying source
    fs.copyFileSync(sourceFilePath, targetFilePath);

    // Generate previews for presentation/docx
    const previewData = generateDocumentPreviews(sourceFilePath, safeFileId);

    const fileRecord = {
      id: safeFileId,
      filename,
      safeFilename: targetFilename,
      ext: ext.toLowerCase(),
      mimeType,
      size,
      sha256,
      assignmentId,
      parentFolder: folderName,
      publicUrl: `/coursework/files/${targetFilename}`,
      publicPath: `public/coursework/files/${targetFilename}`,
      previewType,
      pdfPreviewUrl: previewData.pdfPreviewUrl,
      slideImages: previewData.slideImages,
      uploadedAt: new Date().toISOString(),
      verifiedSafe: true,
      downloadCount: 0,
      published: true, // Coursework deliverable published for faculty viewing
    };

    manifestFiles.push(fileRecord);
    console.log(`  + Discovered: ${filename} (${previewType}, ${(size / 1024).toFixed(1)} KB)`);
  }
}

// Generate Manifest JSON
const manifest = {
  version: 1,
  scannedAt: new Date().toISOString(),
  sourceDirectory: EWEM_DIR,
  totalFiles: manifestFiles.length,
  assignmentsRepresented: Array.from(new Set(manifestFiles.map(f => f.assignmentId))).sort(),
  files: manifestFiles,
};

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log(`\nGenerated Coursework Manifest at: ${MANIFEST_PATH}`);
console.log(`Total Deliverables Indexed: ${manifestFiles.length}`);
