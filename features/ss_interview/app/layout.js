import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import ButtonStack from "@/components/ButtonStack";

const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "StudySphere",
  description: "The best way to collaborate and learn online",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
    <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
      <body className={inter.className}>
      <Toaster />
      <ButtonStack/>
      {children}</body>
    </html>
    </ClerkProvider>
  );
}
