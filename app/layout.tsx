'use client';

import './globals.css';
import { Poppins } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import type { Metadata } from 'next';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'LinkedIn Genius',
    template: '%s | LinkedIn Genius',
  },
  description: 'Generación inteligente de contenido para LinkedIn',
  keywords: ['LinkedIn', 'generador de contenido', 'marca personal'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={poppins.variable} suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
      </head>
      <body className="bg-gray-50 text-gray-900 font-sans">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
