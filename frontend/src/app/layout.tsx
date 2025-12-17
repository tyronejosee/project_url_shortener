import type { Metadata } from "next";
import { Outfit, Roboto_Mono } from "next/font/google";

import { Footer, Navigation } from "@/components/common";
import { COMPANY_NAME } from "@/config/constants";

import Providers from "./providers";

import "@/app/global.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `Home - ${COMPANY_NAME}`,
  description: "URL Shortener is a URL shortener service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${robotoMono.variable} antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
