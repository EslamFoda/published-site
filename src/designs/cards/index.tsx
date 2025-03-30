import React from "react";
import Design1 from "./design1";
import Design2 from "./design2";
import { SectionType } from "@/types/section";

interface CardsProps {
  section: SectionType;
  sectionIndex: number;
}
function Cards({ section }: CardsProps) {
  const designs = {
    design1: Design1,
    design2: Design2,
  };
  const CardsSection =
    designs[section?.style.designName as keyof typeof designs];
  return <CardsSection section={section} />;
}

export default Cards;
