import type { Metadata } from "next";
import "./globals.css";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  title: "Koko Art Agency - Contemporary Art Representation",
  description: "Representing contemporary artists and showcasing exceptional artwork across all mediums.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Brandon+Grotesque:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans font-light antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
