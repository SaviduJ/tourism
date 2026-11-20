import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: {
    default: "CEYLON — Beyond the Ordinary",
    template: "%s | CEYLON",
  },
  description:
    "Discover Sri Lanka through thoughtfully curated journeys, extraordinary destinations, and meaningful local experiences.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
