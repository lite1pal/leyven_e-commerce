import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/sections/navbar/navbar";
import FooterComponent from "@/components/sections/footer/footer";
import { Inter, Montserrat, Raleway, Wallpoet } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ServerCartProvider from "@/context/cart";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { GOOGLE_ANALYTICS_ID } from "@/config/api";

export const metadata: Metadata = {
  title: "LeyVen",
  description: "Generated by create next app",
};

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
        />
        <Script strategy="lazyOnload">
          {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                  
                    gtag('config', '${GOOGLE_ANALYTICS_ID}');
                `}
        </Script>

        <SpeedInsights />
        <ServerCartProvider>
          <Toaster />
          <main className={`max-w-screen flex min-h-screen flex-grow flex-col`}>
            <Navbar />
            {children}
          </main>
        </ServerCartProvider>
      </body>
    </html>
  );
}
