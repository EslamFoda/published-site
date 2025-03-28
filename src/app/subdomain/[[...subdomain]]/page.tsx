"use client";
import Section from "@/components/shared/section";
import { GlobalSectionsProvider } from "@/context/GlobalSectionsContext";
import { MobileMenuProvider } from "@/context/MobileMenuContext";
import { createClient } from "@/supabase/client";
import { EditorPage, SiteData } from "@/types/section";
import { useParams } from "next/navigation";
import useSWR from "swr";

const fetchSiteData = async (subdomain: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("published_sites")
    .select()
    .eq("settings->>name", "fresh")
    .order("created_at", { ascending: false })
    .single();

  if (error || !data) throw new Error("No site data found");
  return data as SiteData;
};

export default function SubdomainPage() {
  const params = useParams();
  const subdomainArray = (params.subdomain as string[] | undefined) || [];
  const subdomain = subdomainArray[0] || "fresh";
  const route = subdomainArray[1] || "home";

  const { data: siteData, error } = useSWR(subdomain, fetchSiteData, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  if (error) {
    return <div>Error loading site data</div>;
  }

  if (!siteData) return null;

  const currentPage =
    siteData.pages.find(
      (page: EditorPage) => page.pageSettings.link === route
    ) || null;

  if (!currentPage) {
    return (
      <div className="not-found">
        <h1>404 - Page Not Found</h1>
        <p>
          Sorry, the page {route} could not be found for {subdomain}.
        </p>
      </div>
    );
  }

  return (
    <GlobalSectionsProvider globalSections={siteData.globalSections}>
      <MobileMenuProvider>
        <div className={`${siteData.selectedPallet} page-container`}>
          <Section
            globalSections={siteData.globalSections} // This can still be passed directly if needed
            currentPage={currentPage}
          />
        </div>
      </MobileMenuProvider>
    </GlobalSectionsProvider>
  );
}
