import React from "react";
import Design1 from "./design1";
import Design2 from "./design2";
import Design3 from "./design3";
import Design4 from "./design4";
import Design6 from "./design6";
import Design5 from "./design5";
import { SectionType } from "@/types/section";

interface BannerProps {
  section: SectionType;
  sectionIndex: number;
}
function Banner({ section, sectionIndex }: BannerProps) {
  const designs = {
    design1: Design1,
    design2: Design2,
    design3: Design3,
    design4: Design4,
    design5: Design5,
    design6: Design6,
  };

  const BannerSection =
    designs[section?.style.designName as keyof typeof designs];
  return <BannerSection section={section} sectionIndex={sectionIndex} />;
}

export default Banner;
