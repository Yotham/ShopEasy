import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../global.css";
import "../../index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopEasy",
  description: "Meal Planning made Easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
