"use client";

import Section from "@/components/shared/section";
import { MobileMenuProvider } from "@/context/MobileMenuContext";
import { useSiteData } from "@/context/SiteDataContext";
import { EditorPage } from "@/types/section";
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
