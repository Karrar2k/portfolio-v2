import type { Metadata } from "next";
import { Instrument_Sans, Koulen } from 'next/font/google';
import "./globals.css";

// Instrument Sans font
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-instrument-sans',
  display: 'swap',
});

// Koulen font
const koulen = Koulen({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-koulen',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Karrar Almayali | Portfolio",
  description: "Full-stack engineer and problem solver showcasing projects and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${instrumentSans.variable} ${koulen.variable}`}>
      <head>
      </head>
      <body suppressHydrationWarning className={`${instrumentSans.className} antialiased bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300`}>
        {/* script to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const isDark = localStorage.theme === 'dark' ||
                    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  document.documentElement.classList.toggle('dark', isDark);
                } catch (e) {}
              })()
            `
          }}
        />
        {children}
      </body>
    </html>
  );
}
