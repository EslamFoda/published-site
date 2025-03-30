"use client";

import PageNotFound from "@/components/pageNotFound";
import Section from "@/components/shared/section";
import SiteNotExists from "@/components/siteNotExists";
import { MobileMenuProvider } from "@/context/MobileMenuContext";
import { useSiteData } from "@/context/SiteDataContext";
import { Page } from "@/types/pages";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SubdomainPage() {
  const params = useParams();
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const subdomainArray = (params.subdomain as string[] | undefined) || [];
  const subdomain = subdomainArray[0] || "fresh";
  const route = subdomainArray[1] || "home";

  const { siteData, error } = useSiteData();
  const designSettings = siteData?.designSettings;
  const selectedPallet = siteData?.selectedPallet;

  useEffect(() => {
    if (pageContainerRef.current && designSettings) {
      pageContainerRef.current.style.setProperty(
        "--radius",
        designSettings.borderRadius
      );

      if (selectedPallet === "custom") {
        pageContainerRef.current.style.setProperty(
          "--primary",
          designSettings.colors.primary
        );
        pageContainerRef.current.style.setProperty(
          "--primary-foreground",
          designSettings.colors.primaryForGround
        );
      }
      pageContainerRef.current.style.setProperty(
        "--container-max-width",
        designSettings.width.fullWidthPage
          ? "100%"
          : `${designSettings.width.pages}px`
      );
    }
  }, [pageContainerRef, selectedPallet, designSettings]);

  if (error) return <SiteNotExists subdomain={subdomain} />;

  if (!siteData) return null;

  const currentPage =
    siteData.pages.find((page: Page) => page.pageSettings.link === route) ||
    null;

  if (!currentPage) return <PageNotFound />;

  return (
    <MobileMenuProvider>
      <div
        className={`${siteData.selectedPallet} page-container`}
        ref={pageContainerRef}
      >
        <Section
          globalSections={siteData.globalSections}
          currentPage={currentPage}
        />
      </div>
    </MobileMenuProvider>
  );
}
