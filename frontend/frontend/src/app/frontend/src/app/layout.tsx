import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReDi 2.0 - Regulatory Platform",
  description: "AI-Agentic Regulatory Integrity Platform for PayPal India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-[#0b0f19] text-white">
        {children}
      </body>
    </html>
  );
}
