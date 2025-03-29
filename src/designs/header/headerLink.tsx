import { useSiteData } from "@/context/SiteDataContext";
import { Link as LinkType, SubLink } from "@/types/sectionsTypes/header";
import Link from "next/link";
import React from "react";

interface HeaderLinkProps {
  link: LinkType | SubLink;
}

export const HeaderLink: React.FC<HeaderLinkProps> = ({ link }) => {
  const { siteData } = useSiteData();
  const homePageId = siteData?.settings.homePage;
  const handleLinkClick = () => {
    if (link.linkType === "internal" && link.pageId) {
      // For internal links, let Next.js handle navigation through the Link component
      return;
    }

    if (link.linkType === "external" && link.externalLink) {
      let finalLink = link.externalLink;

      // Ensure the link has http/https prefix
      if (
        !finalLink.startsWith("http://") &&
        !finalLink.startsWith("https://")
      ) {
        finalLink = "https://" + finalLink;
      }

      // Open in new tab or same tab based on openNewTab prop
      if (link.openNewTab) {
        window.open(finalLink, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = finalLink;
      }
    }
  };

  // Render logic
  if (!link.pageId && !link.externalLink) {
    return (
      <div onClick={handleLinkClick}>
        <span>{link.text}</span>
      </div>
    );
  }

  if (link.linkType === "external") {
    return (
      <div onClick={handleLinkClick}>
        <span>{link.text}</span>
      </div>
    );
  }

  return (
    <Link href={homePageId === link.pageId ? "/" : link.link}>
      <div>
        <span>{link.text}</span>
      </div>
    </Link>
  );
};
