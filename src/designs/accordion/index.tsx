import React from "react";
import Design1 from "./design1";
import { SectionType } from "@/types/section";

interface AccordionProps {
  section: SectionType;
}
function Accordion({ section }: AccordionProps) {
  const designs = {
    design1: Design1,
  };

  const AccordionSection =
    designs[section.style.designName as keyof typeof designs];
  return <AccordionSection section={section} />;
}

export default Accordion;
