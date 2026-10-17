const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, '../src/data/courseworkManifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: Buffer.concat(chunks)
        });
      });
    }).on('error', reject);
  });
}

async function runAudit() {
  console.log('======================================================================');
  console.log('RECLAIM MAGNUM — PHASE 4 DELIVERABLE INTEGRITY & SECURITY AUDIT');
  console.log('======================================================================\n');

  let passedDownloads = 0;
  let passedHashes = 0;
  const results = [];

  for (let i = 0; i < manifest.files.length; i++) {
    const file = manifest.files[i];
    const url = `http://localhost:3000/api/coursework/file/${file.id}`;
    const res = await fetchBuffer(url);

    const is200 = res.statusCode === 200;
    const downloadedHash = crypto.createHash('sha256').update(res.data).digest('hex');
    const hashMatches = downloadedHash === file.sha256;
    const sizeMatches = res.data.length === file.size;

    if (is200) passedDownloads++;
    if (hashMatches) passedHashes++;

    results.push({
      id: file.id,
      assignmentId: file.assignmentId,
      filename: file.filename,
      previewType: file.previewType,
      statusCode: res.statusCode,
      expectedSize: file.size,
      downloadedSize: res.data.length,
      expectedHash: file.sha256,
      downloadedHash,
      hashMatch: hashMatches,
      sizeMatch: sizeMatches,
      contentType: res.headers['content-type'],
      contentDisposition: res.headers['content-disposition']
    });

    console.log(`[${i + 1}/19] ${file.assignmentId} : ${file.filename}`);
    console.log(`       Status: ${res.statusCode} | Size: ${res.data.length}/${file.size} bytes | Hash Match: ${hashMatches ? '✓ OK' : '✗ MISMATCH'}`);
    if (!hashMatches) {
      console.log(`       Expected:   ${file.sha256}`);
      console.log(`       Downloaded: ${downloadedHash}`);
    }
  }

  console.log('\n--- SPREADSHEET PARSER AUDIT ---');
  const xlsxFile = manifest.files.find(f => f.previewType === 'spreadsheet');
  if (xlsxFile) {
    const sheetUrl = `http://localhost:3000/api/coursework/spreadsheet/${xlsxFile.id}`;
    const sheetRes = await fetchBuffer(sheetUrl);
    console.log(`Spreadsheet endpoint status: ${sheetRes.statusCode}`);
    if (sheetRes.statusCode === 200) {
      try {
        const json = JSON.parse(sheetRes.data.toString('utf8'));
        const sheetKeys = Object.keys(json.sheets || {});
        console.log(`Total sheets found: ${sheetKeys.length} (${sheetKeys.join(', ')})`);
        sheetKeys.forEach(key => {
          const s = json.sheets[key];
          console.log(`  - Sheet "${key}": ${s.rows.length} rows, headers: [${s.headers.slice(0, 4).join(', ')}...]`);
        });
      } catch (e) {
        console.error('Failed to parse spreadsheet response:', e.message);
      }
    }
  }

  console.log('\n--- ZIP DOWNLOAD VERIFICATION ---');
  const assignmentsWithFiles = [...new Set(manifest.files.map(f => f.assignmentId))];
  let zipPassed = 0;
  for (const aid of assignmentsWithFiles) {
    const zipUrl = `http://localhost:3000/api/download/${aid}`;
    const zipRes = await fetchBuffer(zipUrl);
    const count = manifest.files.filter(f => f.assignmentId === aid).length;
    const isZip = zipRes.statusCode === 200 && zipRes.headers['content-type'] === 'application/zip';
    if (isZip && zipRes.data.length > 500) {
      zipPassed++;
      console.log(`✓ Assignment ${aid} ZIP downloaded (${zipRes.data.length} bytes, contains ${count} files)`);
    } else {
      console.log(`✗ Assignment ${aid} ZIP failed: status ${zipRes.statusCode}`);
    }
  }

  console.log('\n--- PATH TRAVERSAL & SECURITY BOUNDARY AUDIT ---');
  const maliciousIds = [
    '../../etc/passwd',
    '..%2F..%2Fetc%2Fpasswd',
    'EW-01_unknown',
    '../../package.json'
  ];
  let securityPassed = 0;
  for (const badId of maliciousIds) {
    const badUrl = `http://localhost:3000/api/coursework/file/${encodeURIComponent(badId)}`;
    const badRes = await fetchBuffer(badUrl);
    if (badRes.statusCode === 400 || badRes.statusCode === 403 || badRes.statusCode === 404) {
      securityPassed++;
      console.log(`✓ Blocked malicious request '${badId}': HTTP ${badRes.statusCode}`);
    } else {
      console.log(`✗ Vulnerability! '${badId}' returned HTTP ${badRes.statusCode}`);
    }
  }

  console.log('\n======================================================================');
  console.log(`AUDIT SUMMARY:`);
  console.log(`- 19 Files Download HTTP 200: ${passedDownloads}/19`);
  console.log(`- 19 Files SHA-256 Match:     ${passedHashes}/19`);
  console.log(`- Assignment ZIP Endpoints:   ${zipPassed}/${assignmentsWithFiles.length}`);
  console.log(`- Security Boundary Traversal Tests Blocked: ${securityPassed}/${maliciousIds.length}`);
  console.log('======================================================================\n');

  fs.writeFileSync(path.join(__dirname, '../audit_results.json'), JSON.stringify(results, null, 2));
}

runAudit().catch(err => {
  console.error('Audit encountered error:', err);
  process.exit(1);
});
