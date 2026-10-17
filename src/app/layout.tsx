import type { Metadata } from 'next';
import { StorageProvider } from '@/lib/storage/StorageContext';
import { AppShell } from '@/components/shell/AppShell';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'EWEM Dashboard | Kavish Khan',
  description:
    'Personal EWEM assignment dashboard for Kavish Khan (24102C0036) — 13 E-Waste & Environmental Management coursework deliverables.',
  openGraph: {
    title: 'EWEM Dashboard | Kavish Khan',
    description:
      'Personal EWEM assignment dashboard for Kavish Khan (24102C0036) — 13 E-Waste & Environmental Management coursework deliverables.',
    siteName: 'EWEM Dashboard — Kavish Khan',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EWEM Dashboard | Kavish Khan',
    description:
      'Personal EWEM assignment dashboard for Kavish Khan (24102C0036) — 13 E-Waste & Environmental Management coursework deliverables.',
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
