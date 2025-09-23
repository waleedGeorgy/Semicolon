import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Condensed } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes"
import Footer from "./components/Footer";
import ConvexClientProvider from "./components/providers/ConvexClientProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap"
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap"
});

const roboto = Roboto_Condensed({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-condensed',
})

export const metadata: Metadata = {
  title: "Semicolon",
  description: "A web-based code editor",
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}
      >
        <ClerkProvider appearance={{ theme: [dark] }}>
          <ConvexClientProvider>{children}</ConvexClientProvider>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
