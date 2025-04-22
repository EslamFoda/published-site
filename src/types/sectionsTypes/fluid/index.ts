import { ButtonVariantProps } from "@/components/ui/button";
import { Layouts } from "react-grid-layout";

export interface FluidContent {
  gridLayout: Layouts;
  gridCards: GridCard[];
}

export interface FluidStyle {
  designName: string;
  minHeights: {
    lg: number;
    md: number;
    xs: number;
  };
  gridSettings: {
    cols: { lg: number; sm: number; xs: number };
    padding: [number, number];
    rowHeight: number;
  };
}

export type ButtonDisplay = "Text only" | "Icon only" | "Text and icon";

export type ButtonAlignment = "start" | "center" | "end";
export type IconPositionTypes = "right" | "left" | "below" | "above";

export interface FluidButtonSettings {
  text: string;
  link?: string;
  size: ButtonVariantProps["size"];
  variant: ButtonVariantProps["variant"];
  buttonDisplay: ButtonDisplay;
  alignment: ButtonAlignment;
  buttonIcon: string;
  textIconGap: number;
  iconPosition: IconPositionTypes;
}
export interface FluidImageSettings {
  imageId: string;
  src: string;
  originalSrc: string;
  link?: string;
  imageFilters: {
    brightness?: number;
    contrast?: number;
    hue?: number;
    opacity?: number;
    saturate?: number;
    blur?: number;
    exposure?: number;
    zoom?: number;
    rotate?: number;
    vintage?: number;
    grain?: number;
    sharpness?: number;
  };
}

export interface FluidTextSettings {
  html: string;
  color: string;
}

export interface GridCardButton {
  i: string;
  content: string;
  settings: FluidButtonSettings;
  w: number;
  h: number;
  type: "button"; // Discriminator
  zIndex: number;
}

export interface GridCardImage {
  i: string;
  content: string;
  settings: FluidImageSettings;
  w: number;
  h: number;
  type: "image"; // Discriminator
  zIndex: number;
}
export interface GridCardText {
  i: string;
  content: string;
  settings: FluidTextSettings;
  w: number;
  h: number;
  type: "text"; // Discriminator
  zIndex: number;
}

// Union of GridCard types
export type GridCard = GridCardButton | GridCardImage | GridCardText;
