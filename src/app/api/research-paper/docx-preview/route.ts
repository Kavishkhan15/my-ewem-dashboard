import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(request: NextRequest) {
  const filePath = path.join(process.cwd(), 'public', 'research-paper', 'paper_docx_preview.html');

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'DOCX preview not found' }, { status: 404 });
  }

  const content = fs.readFileSync(filePath, 'utf8');

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
