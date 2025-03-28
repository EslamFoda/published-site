import React from "react";
import Design1 from "./design1";
import Design2 from "./design2";
import { SectionType } from "@/types/section";

interface TestimonialProps {
  section: SectionType;
}
function Testimonials({ section }: TestimonialProps) {
  const designs = {
    design1: Design1,
    design2: Design2,
  };
  const TestimonialSection =
    designs[section?.style.designName as keyof typeof designs];
  return <TestimonialSection section={section} />;
}

export default Testimonials;
