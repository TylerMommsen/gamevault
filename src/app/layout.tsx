import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { CatalogProvider } from "@/contexts/CatalogContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GameVault",
  description: "GameVault catalogue",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <CatalogProvider>
          <Header />
          {children}
        </CatalogProvider>
      </body>
    </html>
  );
}
