"use client";

import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import FontLoader from "@/components/shared/fontLoader";
import { createClient } from "@/supabase/client";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { SiteDataProvider } from "@/context/SiteDataContext";
import { SiteData } from "@/types/siteData";

const fetchSiteData = async (subdomain: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("published_sites")
    .select()
    .eq("domainName", subdomain)
    .order("created_at", { ascending: false })
    .single();

  if (error || !data) throw new Error("No site data found");
  return data as SiteData;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();
  console.log(params, "params");
  const subdomainArray = (params.subdomain as string[] | undefined) || [];
  const subdomain = subdomainArray[0];

  const { data: siteData, error } = useSWR(subdomain, fetchSiteData, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  return (
    <html lang="en" suppressHydrationWarning>
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
