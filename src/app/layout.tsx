import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from 'next/link'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "VAR CHECK",
  description: "",
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
        <div className="flex h-screen bg-gray-100">
          <div className="hidden md:flex flex-col w-64 bg-gray-800">
            <div className="flex items-center justify-center h-16 bg-gray-900">
              <span className="text-white font-bold uppercase">Demo</span>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto">
              <nav className="flex-1 px-2 py-4 bg-gray-800">
              <Link href="/home"  className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                Shopee Parse
              </Link>
              <Link href="/simple"  className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                Simple List
              </Link>
              </nav>
            </div>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
              <div className="p-4">     
                {children}
              </div>
          </div>
        </div>
      </body>
    </html>
  );
}
