import React from "react";
import Design1 from "./design1";
import { SectionType } from "@/types/section";

interface LogosProps {
  section: SectionType;
}
function Logos({ section }: LogosProps) {
  const designs = {
    design1: Design1,
  };

  const LogoSection = designs[section?.style.designName as keyof typeof designs];
  return <LogoSection section={section} />;
}

export default Logos;
