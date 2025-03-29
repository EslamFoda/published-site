"use client";

import { createContext, useContext, ReactNode } from "react";
import { SiteData } from "@/types/section";

interface SiteDataContextType {
  siteData: SiteData | null;
  error: Error | null;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(
  undefined
);

export const SiteDataProvider = ({
  children,
  siteData,
  error,
}: {
  children: ReactNode;
  siteData: SiteData | null;
  error: Error | null;
}) => {
  return (
    <SiteDataContext.Provider value={{ siteData, error }}>
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (context === undefined) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return context;
};
