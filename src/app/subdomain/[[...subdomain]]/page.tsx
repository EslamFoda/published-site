"use client";

import Section from "@/components/shared/section";
import { MobileMenuProvider } from "@/context/MobileMenuContext";
import { useSiteData } from "@/context/SiteDataContext";
import { Page } from "@/types/pages";
import { useParams } from "next/navigation";

export default function SubdomainPage() {
  const params = useParams();
  const { siteData, error } = useSiteData();

  if (error) {
    return (
      <div className="not-found">
        <h1>404 - Site Not Found</h1>
        <p>Sorry, the requested site could not be found.</p>
      </div>
    );
  }

  if (!siteData) return null;

  const route = params.subdomain?.[1] || "home";
  const currentPage =
    siteData.pages.find((page: Page) => page.pageSettings.link === route) ||
    null;

  if (!currentPage) {
    return (
      <div className="not-found">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page {route} could not be found.</p>
      </div>
    );
  }

  return (
    <MobileMenuProvider>
      <div className={`${siteData.selectedPallet} page-container`}>
        <Section
          globalSections={siteData.globalSections}
          currentPage={currentPage}
        />
      </div>
    </MobileMenuProvider>
  );
}
