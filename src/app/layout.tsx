import type { Metadata } from 'next';
import { StorageProvider } from '@/lib/storage/StorageContext';
import { AppShell } from '@/components/shell/AppShell';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'E-Waste | Academic Portfolio',
  description:
    'Academic coursework portfolio for 15 EW/EM assignments with interactive document inspection and verified deliverables.',
  openGraph: {
    title: 'E-Waste | Academic Portfolio',
    description:
      'Academic coursework portfolio for 15 EW/EM assignments with interactive document inspection and verified deliverables.',
    siteName: 'E-Waste Academic Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Waste | Academic Portfolio',
    description:
      'Academic coursework portfolio for 15 EW/EM assignments with interactive document inspection and verified deliverables.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body>
        <StorageProvider>
          <AppShell>{children}</AppShell>
        </StorageProvider>
      </body>
    </html>
  );
}
