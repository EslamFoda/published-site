import { createContext, useContext, ReactNode } from "react";
import { SiteData } from "@/types/section"; // Adjust the import based on your types file

interface GlobalSectionsContextType {
  globalSections: SiteData["globalSections"] | null;
}

const GlobalSectionsContext = createContext<
  GlobalSectionsContextType | undefined
>(undefined);

export const useGlobalSections = () => {
  const context = useContext(GlobalSectionsContext);
  if (!context) {
    throw new Error(
      "useGlobalSections must be used within a GlobalSectionsProvider"
    );
  }
  return context;
};

export const GlobalSectionsProvider = ({
  globalSections,
  children,
}: {
  globalSections: SiteData["globalSections"] | null;
  children: ReactNode;
}) => {
  return (
    <GlobalSectionsContext.Provider value={{ globalSections }}>
      {children}
    </GlobalSectionsContext.Provider>
  );
};
