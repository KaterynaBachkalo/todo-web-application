import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TODO web application",
  description: "TODO list",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
