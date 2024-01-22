'use client'
import { Inter } from "next/font/google";
import { ProductProvider } from "../contexts/ProductContext"
import "./globals.css";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProductProvider>
          <Navbar />
          {children}
        </ProductProvider>
      </body>
    </html>
  )
}
