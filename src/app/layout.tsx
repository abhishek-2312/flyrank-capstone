// src/app/layout.tsx
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Nexus AI — Strategic Sales Intelligence',
  description: 'Autonomous sales intelligence and market strategy engine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans">
        <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 px-4 py-3 sm:px-8 shadow-xs">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight text-blue-600 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-blue-600 inline-block"></span>
              Nexus AI
            </Link>
            <nav className="flex space-x-6 text-sm font-medium text-slate-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">Hub</Link>
              <Link href="/analytics" className="hover:text-blue-600 transition-colors">Analytics</Link>
              <Link href="/settings" className="hover:text-blue-600 transition-colors">Settings</Link>
              <Link href="/health" className="hover:text-blue-600 transition-colors">Health</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-7xl p-4 sm:p-8">{children}</main>
      </body>
    </html>
  );
}