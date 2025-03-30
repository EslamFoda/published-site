import React from "react";
import Design1 from "./design1";
import { SectionType } from "@/types/section";

interface GalleryProps {
  section: SectionType;
  sectionIndex: number;
}
function Gallery({ section }: GalleryProps) {
  const designs = {
    design1: Design1,
  };

  const GallerySection =
    designs[section?.style.designName as keyof typeof designs];
  return <GallerySection section={section} />;
}

export default Gallery;
