import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import manifest from '@/data/courseworkManifest.json';

// In-memory or file-backed publication configuration
const CONFIG_FILE = path.join(process.cwd(), 'coursework_vault', 'publication_config.json');

function getPublishedState(): Record<string, boolean> {
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    } catch (e) {
      // fallback
    }
  }
  // Default: by default, all initial files are accessible to the student,
  // but can be toggled by the user in settings / workbench.
  const defaults: Record<string, boolean> = {};
  manifest.files.forEach((f) => {
    defaults[f.id] = f.published !== false;
  });
  return defaults;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  const { fileId } = await params;

  // Prevent path traversal
  const cleanId = path.basename(fileId);

  // Look up file in manifest
  const fileRecord = manifest.files.find((f) => f.id === cleanId || f.safeFilename === cleanId);

  if (!fileRecord) {
    return NextResponse.json(
      { error: 'File record not found in secure manifest.' },
      { status: 404 }
    );
  }

  // Check publication authorization
  const pubState = getPublishedState();
  const isAuthorized = pubState[fileRecord.id] !== false;

  // If request contains query ?checkOnly=1
  const searchParams = request.nextUrl.searchParams;
  if (searchParams.get('checkOnly') === '1') {
    return NextResponse.json({
      fileId: fileRecord.id,
      published: isAuthorized,
      filename: fileRecord.filename,
    });
  }

  if (!isAuthorized) {
    return NextResponse.json(
      { error: 'Access Denied: This coursework deliverable has not been approved for publication.' },
      { status: 403 }
    );
  }

  // Resolve file path: check coursework_vault first, then public/coursework fallback
  let filePath = path.join(process.cwd(), 'coursework_vault', 'files', fileRecord.safeFilename);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), 'public', 'coursework', 'files', fileRecord.safeFilename);
  }

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: 'Physical coursework file not found on disk.' },
      { status: 404 }
    );
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': fileRecord.mimeType || 'application/octet-stream',
      'Content-Length': fileRecord.size.toString(),
      'Content-Disposition': `inline; filename="${encodeURIComponent(fileRecord.filename)}"`,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'private, no-cache, no-store, must-revalidate',
    },
  });
}
