import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FullScreenLayout from "@/components/FullScreenLayout";
import { AssetProvider } from "@/contexts/AssetContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Falck Data Platform",
  description: "Data discovery and management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AssetProvider>
          <FullScreenLayout>{children}</FullScreenLayout>
        </AssetProvider>
      </body>
    </html>
  );
}