import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
import DatabaseInitializer from "./components/DatabaseInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VulnSite - Vulnerable Web Application for Security Testing",
  description: "Educational platform for web security testing, penetration testing training, and vulnerability assessment. Practice SQL injection, XSS, and other web security vulnerabilities in a safe environment.",
  keywords: "web security, penetration testing, SQL injection, XSS, vulnerability testing, cybersecurity, ethical hacking, security training",
  authors: [{ name: "Juan Veltri", url: "https://jveltri.com.ar" }],
  creator: "Juan Veltri",
  publisher: "Juan Veltri",
  robots: "index, follow",
  metadataBase: new URL('https://vulns-expose.jveltri.com.ar'),
  alternates: {
    canonical: 'https://vulns-expose.jveltri.com.ar',
  },
  openGraph: {
    title: "VulnSite - Web Security Testing Platform",
    description: "Educational platform for practicing web security vulnerabilities like SQL injection and XSS in a controlled environment.",
    url: 'https://vulns-expose.jveltri.com.ar',
    siteName: 'VulnSite',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VulnSite - Web Security Testing Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VulnSite - Web Security Testing Platform',
    description: 'Practice web security vulnerabilities in a safe educational environment',
    images: ['/og-image.jpg'],
    creator: '@JuanVeltri',
  },
  category: 'cybersecurity',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DatabaseInitializer />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
