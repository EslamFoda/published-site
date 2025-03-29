"use client";

import Accordion from "@/designs/accordion";
import Banner from "@/designs/banner";
import Cards from "@/designs/cards";
import FluidPreview from "@/designs/fluidPreview";
import Footer from "@/designs/footer";
import Gallery from "@/designs/gallery";
import Header from "@/designs/header";
import List from "@/designs/list";
import Logos from "@/designs/logos";
import Pricing from "@/designs/pricing";
import Testimonials from "@/designs/testimonials";
import useScrollParallax from "@/hooks/useScrollParallax";
import { SectionType } from "@/types/section";
import ProgressBar from "../progressBar";
import { HeaderContent, HeaderStyle } from "@/types/sectionsTypes/header";
import Sidebar from "../sideBar";
import HeaderMobMenu from "../headerMobMenu";
import { X } from "lucide-react";
import { useMobileMenu } from "@/context/MobileMenuContext";
import { Page } from "@/types/pages";

const Section: React.FC<{
  globalSections: SectionType[] | undefined;
  currentPage: Page;
}> = ({ globalSections, currentPage }) => {
  const { ParallaxProvider } = useScrollParallax();
  const { isMobMenuOpen, setMobMenuOpen } = useMobileMenu();

  const globalHeader = globalSections?.find(
    (section) => section?.sectionName === "Header"
  );
  const globalFooter = globalSections?.find(
    (section) => section?.sectionName === "Footer"
  );

  const headerStyle = globalHeader?.style as HeaderStyle;
  const headerContent = globalHeader?.content as HeaderContent;

  const sectionsMapper: {
    [key: string]: React.ComponentType<{
      section: SectionType;
      sectionIndex: number;
    }>;
  } = {
    Banner,
    Cards,
    List,
    Accordion,
    Testimonials,
    Gallery,
    Logos,
    Fluid: FluidPreview,
    Pricing,
  };

  const globalSectionMapper = {
    Header,
    Footer,
  };

  const GlobalHeaderSection = globalSectionMapper["Header"];
  const GlobalFooterSection = globalSectionMapper["Footer"];

  if (!currentPage) return null;

  return (
    <div className="relative bg-background">
      {headerStyle.designSettings.scrollIndicator &&
        currentPage?.pageSettings.showHeader && <ProgressBar />}
      {isMobMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-background/50 backdrop-blur-sm"
          onClick={() => setMobMenuOpen(false)}
        />
      )}
      {currentPage?.pageSettings.showHeader && (
        <div key="global-header">
          <GlobalHeaderSection section={globalHeader} />
        </div>
      )}
      {currentPage?.sections?.map((section, i) => {
        if (!section) return null;
        const SectionComponent = sectionsMapper[section.sectionName];

        return (
          <div key={section.id} className="relative">
            <div id={`section-${i}`}>
              <ParallaxProvider>
                <SectionComponent
                  key={section.id}
                  section={section}
                  sectionIndex={i}
                />
              </ParallaxProvider>
            </div>
          </div>
        );
      })}
      {currentPage?.pageSettings.showFooter && (
        <div key="global-footer">
          <GlobalFooterSection section={globalFooter} />
        </div>
      )}

      {/* Header sidebar for the mobile screen */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <Sidebar
            open={isMobMenuOpen}
            onClose={() => setMobMenuOpen(false)}
            closeButton={
              headerContent.options.iconType === "text" ? (
                headerContent.options.closeMenuText
              ) : (
                <X size={18} />
              )
            }
          >
            <HeaderMobMenu headerContent={headerContent} />
          </Sidebar>
        </div>
      </div>
    </div>
  );
};

export default Section;
