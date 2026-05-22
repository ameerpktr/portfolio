import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ameer-portfolio.vercel.app"),
  title: {
    default: "Ameer M | Fintech Operations Associate",
    template: "%s | Ameer M"
  },
  description:
    "Premium fintech operations portfolio for Ameer M, specializing in fraud monitoring, payments, compliance, onboarding, and scalable risk systems.",
  keywords: ["Ameer M", "Fintech Operations", "Fraud Monitoring", "Payments", "AML", "KYC", "Risk Management"],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png"
  },
  openGraph: {
    title: "Ameer M | Fintech Operations Associate",
    description: "Fintech operations professional specializing in risk management and fraud reduction.",
    type: "website",
    url: "https://ameer-portfolio.vercel.app"
  },
  twitter: {
    card: "summary_large_image",
    title: "Ameer M | Fintech Operations Associate",
    description: "Premium fintech operations portfolio specializing in fraud monitoring and risk management."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
