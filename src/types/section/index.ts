// Import section-specific content and style types
import {
  AccordionContent,
  AccordionStyle,
} from "@/types/sectionsTypes/accordion/accordion";

import { BannerContent, BannerStyle } from "@/types/sectionsTypes/banner";
import { CardStyle, CardsContent } from "@/types/sectionsTypes/cards";
import { FluidContent, FluidStyle } from "@/types/sectionsTypes/fluid";
import { FooterContent, FooterStyle } from "@/types/sectionsTypes/footer";
import { GalleryContent, GalleryStyle } from "@/types/sectionsTypes/gallery";
import { HeaderContent, HeaderStyle } from "@/types/sectionsTypes/header";
import { ListContent, ListStyle } from "@/types/sectionsTypes/list";
import { LogosContent, LogosStyle } from "@/types/sectionsTypes/logos";
import { PricingContent, PricingStyle } from "@/types/sectionsTypes/pricing";
import {
  TestimonialContent,
  TestimonialStyle,
} from "@/types/sectionsTypes/testimonials";

// Define all possible content types for sections
export type SectionContentTypes = {
  banner: BannerContent;
  cards: CardsContent;
  list: ListContent;
  accordion: AccordionContent;
  testimonial: TestimonialContent;
  header: HeaderContent;
  gallery: GalleryContent;
  logos: LogosContent;
  fluid: FluidContent;
  footer: FooterContent;
  pricing: PricingContent;
  // Add more content types here as needed
};

// Define all possible style types for sections
export type SectionStyleTypes = {
  banner: BannerStyle;
  cards: CardStyle;
  list: ListStyle;
  accordion: AccordionStyle;
  testimonial: TestimonialStyle;
  header: HeaderStyle;
  gallery: GalleryStyle;
  logos: LogosStyle;
  fluid: FluidStyle;
  footer: FooterStyle;
  pricing: PricingStyle;
  // Add more style types here as needed
};

// Define the type for a single editor section
export interface Section<
  T extends keyof SectionContentTypes,
  U extends keyof SectionStyleTypes
> {
  id: string;
  sectionName: string;
  content: SectionContentTypes[T];
  style: SectionStyleTypes[U];
}

export type SectionType =
  | Section<keyof SectionContentTypes, keyof SectionStyleTypes>
  | undefined;
