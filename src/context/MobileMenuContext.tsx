"use client";
import { createContext, useContext, ReactNode, useState } from "react";

// Define the context type
interface MobileMenuContextType {
  isMobMenuOpen: boolean;
  toggleMobMenu: () => void; // Optional: toggle function
  setMobMenuOpen: (open: boolean) => void; // Explicit setter
}

// Create the context with an undefined default value
const MobileMenuContext = createContext<MobileMenuContextType | undefined>(
  undefined
);

// Custom hook to use the context
export const useMobileMenu = () => {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error("useMobileMenu must be used within a MobileMenuProvider");
  }
  return context;
};

// Provider component
export const MobileMenuProvider = ({ children }: { children: ReactNode }) => {
  const [isMobMenuOpen, setMobMenuOpen] = useState(false);

  // Toggle function (optional, for convenience)
  const toggleMobMenu = () => setMobMenuOpen((prev) => !prev);

  return (
    <MobileMenuContext.Provider
      value={{ isMobMenuOpen, toggleMobMenu, setMobMenuOpen }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
};
