import { Inter,Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";

const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "StudySphere",
  description: "Generated Your Course with the power of ai",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.svg" sizes="any" />
        </head>
        <GoogleOneTap />
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
