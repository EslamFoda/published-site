import { create } from "zustand";
import { SiteData } from "@/types/section";
import { createClient } from "@/supabase/client";

interface SiteState {
  siteData: { [key: string]: SiteData | null };
  loading: boolean;
  error: string | null;
  fetchSiteData: (subdomain: string) => Promise<void>;
}

export const useSiteStore = create<SiteState>((set, get) => ({
  siteData: {},
  loading: false,
  error: null,
  fetchSiteData: async (subdomain: string) => {
    if (!subdomain || get().siteData[subdomain]) return; // Skip if already fetched

    set({ loading: true });
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("published_sites")
        .select()
        .eq("settings->>name", "fresh")
        .order("created_at", { ascending: false })
        .single();

      if (error || !data) {
        throw new Error("No site data found");
      }

      set((state) => ({
        siteData: { ...state.siteData, [subdomain]: data as SiteData },
        loading: false,
        error: null,
      }));
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Unknown error",
        loading: false,
      });
    }
  },
}));
