import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from "next-auth/react";
import Header from "@/components/ui/header";
import ButtonStack from '../components/ButtonStack';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "StudySphere",
  description: "The best way to collaborate and learn online",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
      <SessionProvider>
        <body className={"dark"}>
          <Header />
          <ButtonStack/>
          {children}
        </body>
      </SessionProvider>
    </html>
  )
}
