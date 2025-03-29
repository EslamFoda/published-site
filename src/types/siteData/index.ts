import { DesignSettings } from "../designSettings";
import { Page } from "../pages";
import { Section, SectionContentTypes, SectionStyleTypes } from "../section";

export interface SiteData {
  created_at: string;
  globalSections: Section<keyof SectionContentTypes, keyof SectionStyleTypes>[];
  designSettings: DesignSettings;
  siteSettings: SiteSettings;
  id: number;
  owner_id: string;
  pages: Page[];
  selectedPallet: string;
  settings: SiteSettings;
  domainName: string;
}

export interface SiteSettings {
  email: string | undefined;
  favicon: string;
  homePage: string;
  isTemplate: boolean;
  showMadeBy: boolean;
  name: string;
  link: string;
  siteId: string;
  published: boolean;
  owner_id: string;
}
