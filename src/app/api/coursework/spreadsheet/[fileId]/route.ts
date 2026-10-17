import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import * as XLSX from 'xlsx';
import manifest from '@/data/courseworkManifest.json';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  const { fileId } = await params;
  const cleanId = path.basename(fileId);

  const fileRecord = manifest.files.find((f) => f.id === cleanId || f.safeFilename === cleanId);

  if (!fileRecord) {
    return NextResponse.json({ error: 'Spreadsheet file not found' }, { status: 404 });
  }

  let filePath = path.join(process.cwd(), 'coursework_vault', 'files', fileRecord.safeFilename);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), 'public', 'coursework', 'files', fileRecord.safeFilename);
  }

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Physical spreadsheet file not found' }, { status: 404 });
  }

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

    const sheetNames = workbook.SheetNames;
    const sheetsData: Record<string, { headers: string[]; rows: any[][] }> = {};

    for (const name of sheetNames) {
      const worksheet = workbook.Sheets[name];
      const rawJson = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

      if (rawJson.length > 0) {
        const headers = (rawJson[0] || []).map((h) => String(h || ''));
        const rows = rawJson.slice(1, 100); // Read up to first 100 rows for preview
        sheetsData[name] = { headers, rows };
      } else {
        sheetsData[name] = { headers: [], rows: [] };
      }
    }

    return NextResponse.json({
      filename: fileRecord.filename,
      sheetNames,
      sheets: sheetsData,
    });
  } catch (err: any) {
    return NextResponse.json({ error: `Failed to parse spreadsheet: ${err.message}` }, { status: 500 });
  }
}
