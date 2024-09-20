import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "/components/ui/sonner";
import "@liveblocks/react-ui/styles.css";
import ButtonStack from "../components/ButtonStack";
const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "StudySphere",
  description: "The best way to collaborate and learn online",
};
const clerkAppearance = {
  elements: {
    card: {
      boxShadow:
        "0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)",
      backdropFilter: "blur(16px) saturate(180%)",
      backgroundColor: "rgba(17, 25, 40, 0.75)",
      borderRadius: "12px",
      border: "1px solid rgba(255, 255, 255, 0.125)",
    },
    formFieldLabel: {
      color: "#FFFFFF", // Change the color of the labels like "Email" and "Password"
    },

    // socialButtons: {
    //   backgroundColor: "rgba(17, 25, 40, 0.75)", // Same background as the card
    //   border: "1px solid rgba(255, 255, 255, 0.125)", // Same border as the card
    //   borderRadius: "12px", // Same border radius as the card
    //   boxShadow:
    //     "0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)", // Same shadow as the card
    //   color: "#FFFFFF", // White text color
    // },
    socialButton: {
      backgroundColor: "rgba(17, 25, 40, 0.75)", // Same background as card
      borderRadius: "12px", // Rounded corners
      border: "1px solid rgba(255, 255, 255, 1)", // Border to match the card
      color: "#FFFFFF", // Text color
      padding: "10px 20px", // Adjust padding if needed
      boxShadow: "0px 2px 3px -1px rgba(0,0,0,0.1)", // Add shadow to buttons
    },
    // button: {
    //   backgroundColor: "#111827", // Change button background color
    // },
    footer: {
      background:
        "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), linear-gradient(rgb(17, 25, 40), rgb(17, 25, 40))", // Customize background
    },
    footerActionText: {
      color: "#FFFFFF", // Customize text color
    },
    footerActionLink: {
      color: "#FFFFFF", // Customize link color
    },
    headerTitle: {
      color: "#FFFFFF",
    },

    // Customize more elements if needed
  },
};
export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
    <html lang="en">
    <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
      <body className={inter.className}>
      <Toaster />
      <ButtonStack/>
      {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
