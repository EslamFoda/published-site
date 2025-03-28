import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Accordion as AccordionType,
  AccordionContent as AccordionContentType,
  AccordionStyle,
} from "@/types/sectionsTypes/accordion/accordion";
import { useMediaQuery } from "react-responsive";
import BackgroundImage from "@/components/shared/backgroundImage";
import SectionHeader from "@/components/shared/sectionHeader";
import { SectionType } from "@/types/section";
import { cn } from "@/lib/utils";

interface DesignProps {
  section: SectionType;
}
function Design1({ section }: DesignProps) {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const accordionStyle = section?.style as AccordionStyle;
  const accordionContent = section?.content as AccordionContentType;
  const {
    spacing,
    align,
    background,
    border,
    icon,
    leftTitlePosition,
    sectionBackground,
  } = accordionStyle.designSettings;

  const bgMuted = sectionBackground.color === "gray";
  const bgPrimary = sectionBackground.color === "primary";

  const containerClassNames = cn(" grid grid-cols-1 space-y-4", {
    "md:grid-cols-3 grid-cols-1 gap-4 md:space-y-0 space-y-4":
      leftTitlePosition,
  });

  const accordionItemClassNames = cn("p-5 py-2 rounded-md", {
    "bg-muted": background,
    "outline outline-[1px] outline-muted": border,
    "bg-background": bgMuted || bgPrimary,
  });

  const sectionBgClassName = cn("flex flex-col relative overflow-hidden", {
    "bg-primary": sectionBackground.color === "primary",
    "bg-muted": sectionBackground.color === "gray",
    "bg-background": sectionBackground.color === "none",
    "min-h-screen": sectionBackground.height === "fill",
    "h-auto": sectionBackground.height === "fit",
    "justify-start": sectionBackground.align === "start",
    "justify-center": sectionBackground.align === "center",
    "justify-end": sectionBackground.align === "end",
    "container max-w-container rounded-md": sectionBackground.width === "fit",
  });
  const mainSection = cn("flex flex-col overflow-hidden", {
    "container max-w-container my-4": sectionBackground.width === "fit",
  });

  const sectionInnerContainer = cn("z-0 gap-10 w-full", {
    "container max-w-container": sectionBackground.width === "fill",
  });

  return (
    <section className={mainSection}>
      <div className={sectionBgClassName}>
        <BackgroundImage
          imageUrl={sectionBackground.media.imageUrl}
          parallax={sectionBackground.parallax}
          blur={sectionBackground.blur}
          blurEffect={sectionBackground.blurEffect}
          greyScale={sectionBackground.greyScale}
          overlay={sectionBackground.overlay}
          overlayEffect={sectionBackground.overlayEffect}
          backgroundColor={sectionBackground.color}
        />
        <div
          className={sectionInnerContainer}
          style={{
            paddingTop: isDesktop ? spacing.top.desktop : spacing.top.mobile,
            paddingBottom: isDesktop
              ? spacing.bottom.desktop
              : spacing.bottom.mobile,
          }}
        >
          <div className={containerClassNames}>
            <SectionHeader
              content={accordionContent}
              sectionBackground={sectionBackground}
              align={align}
              leftTitlePosition={leftTitlePosition}
            />
            <div className="md:col-span-2">
              <Accordion
                type="multiple"
                className="w-full flex flex-col"
                style={{
                  gap: isDesktop ? spacing.gap.desktop : spacing.gap.mobile,
                }}
              >
                {accordionContent.accordions.map((accordion: AccordionType) => (
                  <div key={accordion.id}>
                    <AccordionItem
                      className={accordionItemClassNames}
                      key={accordion.id}
                      value={accordion.id}
                    >
                      <AccordionTrigger iconType={icon}>
                        <span>{accordion.title}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <span
                          className="text-muted-foreground"
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {accordion.text}
                        </span>
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Design1;
