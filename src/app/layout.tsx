import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import FontLoader from "@/components/shared/fontLoader";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }} className="dark">
      <body>
        <FontLoader />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
