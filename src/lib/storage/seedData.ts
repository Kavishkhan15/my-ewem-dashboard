import { Assignment, StudentProfile, AnalyticsMetric, FileRecord } from '@/types/domain';
import rawSeed from '../../../data/assignments.seed.json';

interface SeedItem {
  id: string;
  portalTitle: string;
  displayTitle: string;
  portalActivityDate: string;
  category: string;
  dueDate: string | null;
  portalBadgeObserved: boolean;
  portalBadgeText: string | null;
  actualSubmissionStatus: string;
  workStatus: string;
  qualityStatus: string;
  grade: number | null;
  published: boolean;
  tasks?: any[];
  files?: any[];
  sources?: any[];
  notes?: string;
}

import courseworkManifest from '@/data/courseworkManifest.json';
import researchPaperData from '@/data/researchPaperManifest.json';

const MANIFEST_FILES_MAP: Record<string, FileRecord[]> = {};

// Register EW-15 research paper files into MANIFEST_FILES_MAP
MANIFEST_FILES_MAP['EW-15'] = [
  {
    id: 'EW-15_PDF',
    name: researchPaperData.documents.pdf.filename,
    size: researchPaperData.documents.pdf.size,
    mimeType: 'application/pdf',
    uploadedAt: '2026-10-07T12:00:00Z',
    assignmentId: 'EW-15',
    previewType: 'pdf',
    publicUrl: researchPaperData.documents.pdf.publicUrl,
    sha256: researchPaperData.documents.pdf.sha256,
    verifiedSafe: true,
    published: true,
  },
  {
    id: 'EW-15_DOCX',
    name: researchPaperData.documents.docx.filename,
    size: researchPaperData.documents.docx.size,
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    uploadedAt: '2026-10-07T12:00:00Z',
    assignmentId: 'EW-15',
    previewType: 'document',
    publicUrl: researchPaperData.documents.docx.publicUrl,
    sha256: researchPaperData.documents.docx.sha256,
    verifiedSafe: true,
    published: true,
  },
  {
    id: 'EW-15_TEX',
    name: researchPaperData.documents.tex.filename,
    size: researchPaperData.documents.tex.size,
    mimeType: 'text/x-tex',
    uploadedAt: '2026-10-07T12:00:00Z',
    assignmentId: 'EW-15',
    previewType: 'text',
    publicUrl: researchPaperData.documents.tex.publicUrl,
    sha256: researchPaperData.documents.tex.sha256,
    verifiedSafe: true,
    published: true,
  },
];

export const INITIAL_FILES: FileRecord[] = courseworkManifest.files.map((f: any) => {
  const record: FileRecord = {
    id: f.id,
    name: f.filename,
    size: f.size,
    mimeType: f.mimeType,
    uploadedAt: f.uploadedAt,
    assignmentId: f.assignmentId,
    previewType: f.previewType as FileRecord['previewType'],
    publicUrl: f.publicUrl,
    pdfPreviewUrl: f.pdfPreviewUrl,
    slideImages: f.slideImages,
    sha256: f.sha256,
    verifiedSafe: true,
    published: f.published,
  };
  if (!MANIFEST_FILES_MAP[f.assignmentId]) {
    MANIFEST_FILES_MAP[f.assignmentId] = [];
  }
  MANIFEST_FILES_MAP[f.assignmentId].push(record);
  return record;
});

export const INITIAL_ASSIGNMENTS: Assignment[] = (rawSeed.assignments as any[]).map((item: any) => ({
  id: item.id,
  portalTitle: item.portalTitle,
  displayTitle: item.displayTitle,
  portalActivityDate: item.portalActivityDate,
  category: item.category as Assignment['category'],
  dueDate: item.dueDate,
  portalBadgeObserved: item.portalBadgeObserved,
  portalBadgeText: item.portalBadgeText as 'Turned in' | null,
  actualSubmissionStatus: item.actualSubmissionStatus as Assignment['actualSubmissionStatus'],
  workStatus: item.workStatus as Assignment['workStatus'],
  qualityStatus: item.qualityStatus as Assignment['qualityStatus'],
  grade: item.grade,
  published: item.published,
  tasks: item.tasks || [],
  files: MANIFEST_FILES_MAP[item.id] || [],
  sources: item.sources || [],
  notes: item.notes || '',
  requirements: '',
  lastModified: new Date().toISOString(),
}));

export const INITIAL_PROFILE: StudentProfile = {
  studentName: 'Student Researcher',
  studentId: 'EW-EM-2026',
  courseName: 'Electronic Waste & Environmental Management (EW/EM)',
  institution: 'Department of Computer Engineering',
  academicYear: '2026–2027',
};

export const INITIAL_ANALYTICS: AnalyticsMetric[] = [
  {
    id: 'AN-01',
    title: 'E-Waste Generation: India vs Global Benchmark',
    category: 'Data Analytics & Tracking',
    scope: 'Comparative Global Assessment',
    metric: 'Annual E-Waste Per Capita & Total Mass',
    unit: 'Kilograms per capita / Million Metric Tons (Mt)',
    period: '2024–2026',
    source: 'Global E-Waste Monitor / CPCB India (Pending Local Worksheet Upload)',
    method: 'Awaiting raw dataset upload to compute verified comparison.',
    provenance: 'unverified',
    hasData: false,
  },
  {
    id: 'AN-02',
    title: 'State-Wise Collection & Dismantler Capacity',
    category: 'Data Analytics & Tracking',
    scope: 'National State-by-State Assessment',
    metric: 'Authorized Recyclers & Processing Volume',
    unit: 'Metric Tons per Annum (MTA)',
    period: '2025–2026',
    source: 'State Pollution Control Boards / State Tracker PPT (EW-08)',
    method: 'Awaiting state tracker dataset to render spatial distribution.',
    provenance: 'unverified',
    hasData: false,
  },
  {
    id: 'AN-03',
    title: 'Carbon Footprint & Lifecycle Assessment',
    category: 'Data Analytics & Tracking',
    scope: 'Device Lifecycle Emissions',
    metric: 'CO2 Equivalent Saved through Recovery',
    unit: 'kg CO2e / unit recovered',
    period: '2026 Activity',
    source: 'Carbon Footprint Excel Task (EW-07)',
    method: 'Awaiting Excel workbook upload to parse emission calculations.',
    provenance: 'unverified',
    hasData: false,
  },
  {
    id: 'AN-04',
    title: 'Hazardous Chemical Substance Distribution',
    category: 'Research, Policy & Sustainability',
    scope: 'Substance Toxicity Classification',
    metric: 'Hazard Index & Presence in Circuitry (Lead, Mercury, Cadmium, PBDE, BFR)',
    unit: 'PPM / Toxicity Category',
    period: 'July 2026',
    source: 'Toxic Chemicals Research Brief (EW-01)',
    method: 'Awaiting verified 5-chemical substance data sheet.',
    provenance: 'unverified',
    hasData: false,
  },
  {
    id: 'AN-05',
    title: 'Corporate Compliance: Indian E-Waste Rules',
    category: 'Research, Policy & Sustainability',
    scope: 'E-Waste Management Rules EPR Target Audit',
    metric: 'EPR Target Fulfillment Percentage',
    unit: 'Percentage (%) of EPR target achieved',
    period: '2025–2026',
    source: 'Comparative Company Study (EW-10)',
    method: 'Awaiting company comparison matrix to graph compliance rates.',
    provenance: 'unverified',
    hasData: false,
  },
];
