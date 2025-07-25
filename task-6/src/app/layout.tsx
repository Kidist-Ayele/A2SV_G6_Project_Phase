import type { Metadata } from "next";
import { Epilogue } from 'next/font/google';
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Job Listing App",
  description: "A Next.js job listing application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${epilogue.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}