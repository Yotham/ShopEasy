import { Inter } from "next/font/google";
import "./globals.css";
import {AuthProvider} from './context/AuthContext.js'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ShopEasy",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </AuthProvider>
  );
}
