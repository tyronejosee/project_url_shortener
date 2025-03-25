import type { Metadata } from "next";
import { Outfit, Roboto_Mono } from "next/font/google";
import Providers from "./providers";
import { Footer, Navigation } from "@/components/common";
import "../styles/globals.css";
import { Aurora } from "@/components/animated";

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
  title: "URL Shortener",
  description: "URL Shortener",
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
          <Aurora
            colorStops={["#ff1168", "#292cff", "#5856D6"]}
            blend={1.0}
            amplitude={1.0}
            speed={0.5}
          />
          <Navigation />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
