import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;700&family=Koulen&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
        {/* Non-hydrating script to prevent flash */}
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
