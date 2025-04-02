"use client";

import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import FontLoader from "@/components/shared/fontLoader";
import { createClient } from "@/supabase/client";
import { useParams } from "next/navigation";
import { SiteDataProvider } from "@/context/SiteDataContext";
import { SiteData } from "@/types/siteData";
import { useState, useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();
  const subdomainArray = (params.subdomain as string[] | undefined) || [];
  const subdomain = subdomainArray[0] || "fresh";
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchSiteData = async (subdomain: string) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("published_sites")
        .select()
        .eq("domainName", subdomain)
        .single();
      if (error || !data) throw new Error("No site data found");
      setSiteData(data as SiteData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      setSiteData(null);
    }
  };

  useEffect(() => {
    fetchSiteData(subdomain);
  }, [subdomain]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{siteData?.settings.name}</title>
        <meta name="description" content={siteData?.settings.name} />
      </head>
      <body>
        <SiteDataProvider siteData={siteData || null} error={error || null}>
          <FontLoader />
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <main>{children}</main>
          </ThemeProvider>
        </SiteDataProvider>
      </body>
    </html>
  );
}
