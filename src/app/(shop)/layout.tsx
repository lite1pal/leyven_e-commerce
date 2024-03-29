import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/layout/navbar/navbar";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ServerCartProvider from "@/context/cart";
import Script from "next/script";
import { GOOGLE_ANALYTICS_ID } from "@/config/api";
import ExtraNavbar from "@/components/layout/navbar/components/extraNavbar";
import Footer from "@/components/layout/footer";
import { cn } from "@/lib/utils";

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
    "Дізнайтеся про широкий вибір якісних товарів для тварин в Інтернет-зоомагазині Лейвен. Купуйте онлайн зручно та швидко. Низькі ціни, акції, та висока якість обслуговування. Перегляньте відгуки клієнтів та зробіть свій вибір для здоров'я та комфорту вашого улюбленця.",
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
    google: "X7a8gFFkuXfifg9yAqCcvruvPAImvzMJlZXHiIlvCsA",
  },
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
      <body
        className={cn(
          "bg-background min-h-screen bg-slate-200 font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ServerCartProvider>
          <Toaster />
          <main
            className={`max-w-screen mx-auto flex min-h-screen flex-grow flex-col bg-slate-200 text-slate-900 xl:container`}
          >
            <ExtraNavbar />
            <Navbar />
            {children}
            <Footer />
          </main>
        </ServerCartProvider>
      </body>
    </html>
  );
}
