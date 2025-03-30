"use client";
import { useSiteData } from "@/context/SiteDataContext";
import React from "react";

function FontLoader() {
  const { siteData } = useSiteData();
  const fonts = siteData?.designSettings.fonts;

  return (
    <>
      {/* <head>
        <title>{siteData?.settings.name}</title>
        <meta name="description" content={siteData?.settings.name} />
      </head> */}
      {/* Body Font Face Definition */}
      {fonts?.bodyFont.fontFamilyUrl && (
        <style type="text/css">
          {`
            @font-face {
              font-family: '${fonts.bodyFont.fontFamily}';
              src: url('${fonts.bodyFont.fontFamilyUrl}') format('truetype');
              font-weight: normal;
              font-style: normal;
              font-display: swap;
            }
            
            .page-container span,
            .page-container p,
            .page-container div,
            .text-body {
              font-family: '${fonts.bodyFont.fontFamily}', sans-serif;
            }
          `}
        </style>
      )}

      {/* Title Font Face Definition */}
      {fonts?.titleFont.fontFamilyUrl && (
        <style type="text/css">
          {`
            @font-face {
              font-family: '${fonts.titleFont.fontFamily}';
              src: url('${fonts.titleFont.fontFamilyUrl}') format('truetype');
              font-weight: normal;
              font-style: normal;
              font-display: swap;
            }
            
            .page-container h1,
            .page-container h2,
            .page-container h3,
            .page-container h4,
            .page-container h5,
            .page-container h6,
            .text-title {
              font-family: '${fonts.titleFont.fontFamily}', sans-serif;
            }
          `}
        </style>
      )}
    </>
  );
}

export default FontLoader;
