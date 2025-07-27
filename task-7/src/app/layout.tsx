import type React from "react"
import type { Metadata } from "next"
import { Epilogue } from "next/font/google"
import "./globals.css"
import Providers from "@/components/Providers"

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
})

export const metadata: Metadata = {
  title: "Job Listing App",
  description: "Find your next opportunity",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${epilogue.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
