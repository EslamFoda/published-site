import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import FontLoader from "@/components/shared/fontLoader";
import { createClient } from "@/supabase/server";
import { SiteDataProvider } from "@/context/SiteDataContext";
import { SiteData } from "@/types/siteData";
import { ReactNode } from "react";
import { headers } from "next/headers";

async function getSiteData() {
  const supabase = await createClient();
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];

  const { data: siteData, error } = await supabase
    .from("published_sites")
    .select()
    .eq("domainName", subdomain)
    .order("created_at", { ascending: false })
    .single();

  return { siteData, error };
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { siteData, error } = await getSiteData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SiteDataProvider siteData={siteData as SiteData} error={error}>
          <FontLoader />
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <main>{children}</main>
          </ThemeProvider>
        </SiteDataProvider>
      </body>
    </html>
  );
}
