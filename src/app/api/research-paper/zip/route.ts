import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(request: NextRequest) {
  let zipPath = path.join(process.cwd(), 'public', 'research-paper', 'Research_Paper.zip');
  if (!fs.existsSync(zipPath)) {
    zipPath = path.join(process.cwd(), 'coursework_vault', 'research-paper', 'Research_Paper.zip');
  }

  if (!fs.existsSync(zipPath)) {
    return NextResponse.json({ error: 'Research Paper ZIP not found' }, { status: 404 });
  }

  const zipBuffer = fs.readFileSync(zipPath);

  return new NextResponse(zipBuffer as any, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="Research_Paper.zip"',
      'Content-Length': zipBuffer.length.toString(),
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
