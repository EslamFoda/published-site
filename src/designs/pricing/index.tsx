import React from "react";
import Design1 from "./design1";
import Design2 from "./design2";
import { SectionType } from "@/types/section";

interface PricingProps {
  section: SectionType;
  sectionIndex: number;
}
function Pricing({ section }: PricingProps) {
  const designs = {
    design1: Design1,
    design2: Design2,
  };

  const PricingSection =
    designs[section?.style.designName as keyof typeof designs];
  return <PricingSection section={section} />;
}

export default Pricing;
