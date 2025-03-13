import type { Metadata } from "next";
import { Outfit, Roboto_Mono } from "next/font/google";
// import { HeroUIProvider } from "@heroui/system";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";
import { Footer, Navigation } from "@/components/common";
import Providers from "./providers";

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
          <Navigation />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
