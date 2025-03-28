"use client";
import { createClient } from "@/supabase/client";
import { Fonts } from "@/types/section";
import React, { useEffect, useState } from "react";

function FontLoader() {
  const siteName = "fresh";
  const [fonts, setFonts] = useState<Fonts>({
    titleFont: {
      fontFamily: "Space Grotesk",
      fontWeight: "600",
      fontFamilyUrl:
        "https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVksjNsFjTDJK.ttf",
    },
    bodyFont: {
      fontFamily: "Space Grotesk",
      fontWeight: "regular",
      fontFamilyUrl:
        "https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUUsjNsFjTDJK.ttf",
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("published_sites")
          .select()
          .eq("settings->>name", siteName) // Changed -> to ->>
          .order("created_at", { ascending: false }); // Add ordering by creation time;
        if (error) {
          throw error;
        }
        setFonts(data[0].designSettings.fonts);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setLoading(false);
        }
      }
    };

    fetchSiteData();
  }, []);

  // Use state to track client-side rendering
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true once component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render styles on the client to avoid hydration mismatch
  if (!isClient) {
    return null;
  }
  if (loading) return null;

  return (
    <>
      {/* Body Font Face Definition */}
      {fonts.bodyFont.fontFamilyUrl && (
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
      {fonts.titleFont.fontFamilyUrl && (
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
