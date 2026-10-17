import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Research Paper — Redirecting to EW-15',
  description: 'Authoritative research paper coursework submission cataloged under EW-15.',
};

export default function ResearchPaperPage() {
  redirect('/assignments/EW-15');
}
