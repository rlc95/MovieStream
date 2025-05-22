import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NProgressProvider from "./nprogress-provider"; // import the component
import StarsCanvas from "./dashboard/components/bckgrnd";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "RLCflix",
  description: "Movie Stream",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden bg-black`}
      >
        <StarsCanvas/>
        <NProgressProvider />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
