import { Inter } from "next/font/google";
import "./globals.css";
import {AuthProvider} from './context/AuthContext.js'
import QueryWrapper from "./QueryWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ShopEasy",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
        <html lang="en">
          <body className={inter.className}>
          <QueryWrapper suppressHydrationWarning>
            {children}
          </QueryWrapper>
          </body>
        </html>
      </AuthProvider>
  );
}
