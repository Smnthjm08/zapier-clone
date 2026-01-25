import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { app } from "@/constants/base";
import { AnchoredToastProvider, ToastProvider } from "@/components/ui/toast";

const calSans = localFont({
  src: "../public/fonts/CalSans-Regular.ttf",
  variable: "--font-cal-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: app.title,
  description: app.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${calSans.variable}`}
      suppressHydrationWarning
      suppressContentEditableWarning
    >
      <body className={`antialiased`}>
        <ToastProvider>
          <AnchoredToastProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </AnchoredToastProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
