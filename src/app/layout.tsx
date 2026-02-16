'use client';

import { Inter, Noto_Serif } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import "./globals.css";
import { usePathname } from "next/navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${notoSerif.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        {!isAdminPage && <Navbar />}
        {children}
        {!isAdminPage && <WhatsAppButton />}
        {!isAdminPage && <Footer />}
      </body>
    </html>
  );
}
