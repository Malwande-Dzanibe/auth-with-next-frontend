import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { UserContextWrapper } from "./context/userContextWrapper";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Custom Auth Project Demo",
  description: "Created By Malwande Dzanibe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextWrapper>
          <NavBar />
          {children}
        </UserContextWrapper>
      </body>
    </html>
  );
}
