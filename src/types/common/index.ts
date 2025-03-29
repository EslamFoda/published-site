export type TextSizeType = "s" | "m" | "l";

export type AlignType = "start" | "center" | "end";
export type SectionBgColorType = "primary" | "gray" | "none";
export type ShapeType = "square" | "rounded";
export type displayType = "grid" | "carousel";

export interface CarouselSettings {
  desktopWidth: number;
  mobileWidth: number;
  autoScroll: boolean;
  scrollSpeed: number;
}

export interface Font {
  family: string;
  category: string;
  variants: string[];
}

export enum SocialLinkIcons {
  Twitter = "Twitter",
  Facebook = "Facebook",
  Instagram = "Instagram",
  Tiktok = "Tiktok",
  Email = "Email",
  Medium = "Medium",
  LinkedIn = "LinkedIn",
  WhatsApp = "WhatsApp",
  Github = "Github",
  Youtube = "Youtube",
  Behance = "Behance",
  Telegram = "Telegram",
  Discord = "Discord",
  Reddit = "Reddit",
  SoundCloud = "SoundCloud",
  Pinterest = "Pinterest",
}

export enum PlanType {
  plan1 = "plan1",
  plan2 = "plan2",
  plan3 = "plan3",
}

export interface Spacing {
  top: {
    desktop: number;
    mobile: number;
  };
  bottom: {
    desktop: number;
    mobile: number;
  };
  gap: {
    desktop: number;
    mobile: number;
  };
  padding: {
    desktop: number;
    mobile: number;
  };
}

export interface SectionBackground {
  color: SectionBgColorType;
  media: {
    imageUrl: string;
    imageId: string;
  };
  textColor: "light" | "dark";
  height: "fill" | "fit";
  width: "fill" | "fit";
  spacing?: string;
  overlay: boolean;
  blur: boolean;
  greyScale: boolean;
  parallax: boolean;
  overlayEffect: "s" | "m" | "l";
  blurEffect: "s" | "m" | "l";
  align: AlignType;
}

export interface ButtonTypes {
  text: string;
  link: string;
  id: string;
  pageId: string;
  linkType: LinkTypes;
  externalLink: string;
  openNewTab: boolean;
}

export type LinkTypes = "internal" | "external";
