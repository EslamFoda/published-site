"use client";
import { useSiteData } from "@/context/SiteDataContext";
import React from "react";
import Head from "next/head";

function FontLoader() {
  const { siteData } = useSiteData();
  const fonts = siteData?.designSettings.fonts;

  // Extract domains from font URLs
  const bodyFontDomain = fonts?.bodyFont.fontFamilyUrl
    ? new URL(fonts.bodyFont.fontFamilyUrl).origin
    : null;
  const titleFontDomain = fonts?.titleFont.fontFamilyUrl
    ? new URL(fonts.titleFont.fontFamilyUrl).origin
    : null;

  return (
    <>
      {/* Resource Hints */}
      <Head>
        {bodyFontDomain && <link rel="preconnect" href={bodyFontDomain} />}
        {titleFontDomain && titleFontDomain !== bodyFontDomain && (
          <link rel="preconnect" href={titleFontDomain} />
        )}
      </Head>

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