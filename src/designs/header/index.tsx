import React from "react";
import Design1 from "./design1";
import Design2 from "./design2";
import Design3 from "./design3";
import Design4 from "./design4";
import { SectionType } from "@/types/section";

interface HeaderProps {
  section: SectionType;
}
function Header({ section }: HeaderProps) {
  const designs = {
    design1: Design1,
    design2: Design2,
    design3: Design3,
    design4: Design4,
  };
  const HeaderSection =
    designs[section?.style.designName as keyof typeof designs];

  return <HeaderSection section={section} />;
}

export default Header;
