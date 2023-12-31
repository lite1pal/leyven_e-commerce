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
  metadataBase: new URL("https://www.leyven.com.ua"),
  title: "Інтернет-зоомагазин Лейвен ✅",
  openGraph: {
    title: "Інтернет-зоомагазин Лейвен ✅",
    description:
      "Дізнайтеся про широкий вибір якісних товарів для тварин в інтернет-зоомагазині Лейвен ✅",
    url: "https://www.leyven.com.ua",
    siteName: "Інтернет-зоомагазин Лейвен ✅",
    locale: "uk_UA",
    type: "website",
  },
  description:
    "Дізнайтеся про широкий вибір якісних товарів для тварин в інтернет-зоомагазині Лейвен. Купуйте онлайн зручно та швидко. Низькі ціни, акції, та висока якість обслуговування. Перегляньте відгуки клієнтів та зробіть свій вибір для здоров'я та комфорту вашого улюбленця.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "JLTSwXlT0sRG6kVovctrOBXqForC6gMBF00to7EKzoM",
  },
};

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="google-analytics-script-1"
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
        ></Script>
        <Script
          id="google-analytics-script-2"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', '${GOOGLE_ANALYTICS_ID}');`,
          }}
        ></Script>
      </head>
      <body className={inter.className}>
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
