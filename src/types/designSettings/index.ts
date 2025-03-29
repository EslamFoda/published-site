// Define the type for design settings

export interface DesignSettings {
  fonts: Fonts;
  colors: {
    primary: string;
    primaryForGround: string;
  };
  borderRadius: string;
  width: {
    pages: number;
    fullWidthPage: boolean;
  };
}

export interface Fonts {
  titleFont: FontSettings;
  bodyFont: FontSettings;
}

// Define the type for font settings
export interface FontSettings {
  fontFamily: string;
  fontWeight: string;
  fontFamilyUrl: string;
}
