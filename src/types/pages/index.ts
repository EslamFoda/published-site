import { Section, SectionContentTypes, SectionStyleTypes } from "../section";

// Define the type for Page
export interface Page {
  pageId: string;
  sections:
    | Section<keyof SectionContentTypes, keyof SectionStyleTypes>[]
    | undefined;
  pageSettings: PageSettings;
}

// Define the type for page settings
export interface PageSettings {
  coverImage: string;
  description: string;
  isPublished: boolean;
  isVisibleInSearch: boolean;
  link: string;
  pagePasswordButton: string;
  seoTitle: string;
  showFooter: boolean;
  showHeader: boolean;
  title: string;
  userEditedSlug: boolean;
}
