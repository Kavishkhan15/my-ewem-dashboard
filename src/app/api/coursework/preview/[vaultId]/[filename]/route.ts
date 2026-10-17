import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ vaultId: string; filename: string }> }
) {
  const { vaultId, filename } = await params;

  // Sanitize path inputs to prevent traversal attacks
  const safeVaultId = path.basename(vaultId);
  const safeFilename = path.basename(filename);

  let previewPath = path.join(process.cwd(), 'coursework_vault', 'previews', safeVaultId, safeFilename);
  if (!fs.existsSync(previewPath)) {
    previewPath = path.join(process.cwd(), 'public', 'coursework', 'previews', safeVaultId, safeFilename);
  }

  if (!fs.existsSync(previewPath)) {
    return NextResponse.json({ error: 'Preview asset not found' }, { status: 404 });
  }

  const ext = path.extname(safeFilename).toLowerCase();
  let mimeType = 'application/octet-stream';
  if (ext === '.png') mimeType = 'image/png';
  else if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
  else if (ext === '.pdf') mimeType = 'application/pdf';

  const buffer = fs.readFileSync(previewPath);

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': mimeType,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
