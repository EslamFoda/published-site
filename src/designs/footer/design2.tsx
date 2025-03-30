import { FooterContent } from "@/types/sectionsTypes/footer";
import React from "react";
import { FooterLink } from "./footerLink";
import { cn } from "@/lib/utils";
import { FooterMobileLinks } from "./footerMobileLinks";
import DesignButtons from "@/components/shared/designButtons";
import { SectionType } from "@/types/section";
import { iconMap } from "@/icons/socialIcons";
import { LogoText } from "../header/logoText";
import Logo from "../header/logo";
import { HeaderContent, HeaderStyle } from "@/types/sectionsTypes/header";
import { useSiteData } from "@/context/SiteDataContext";

interface Design2Props {
  section: SectionType;
}

function Design2({ section }: Design2Props) {
  const { siteData } = useSiteData();
  const footerContent = section?.content as FooterContent;
  const globalHeader = siteData?.globalSections?.find(
    (section) => section.sectionName === "Header"
  );
  const headerStyle = globalHeader?.style as HeaderStyle;
  const headerContent = globalHeader?.content as HeaderContent;
  const { logo } = headerContent;

  // Function to handle social link clicks
  const handleSocialLinkClick = (link: string) => {
    if (!link) return;

    let finalLink = link;

    // Ensure the link has http/https prefix
    if (!finalLink.startsWith("http://") && !finalLink.startsWith("https://")) {
      finalLink = "https://" + finalLink;
    }

    // Open in new tab
    window.open(finalLink, "_blank", "noopener,noreferrer");
  };

  const groupTextClassName = cn("text-muted-foreground", {
    hidden: footerContent.links.length === 1,
  });

  const linkContainerClassName = cn({
    "flex flex-col gap-3": footerContent.links.length > 1,
    "flex flex-row gap-6 flex-wrap": footerContent.links.length === 1,
  });
  const logoClassNames = cn("text-xl", {
    "text-primary": headerStyle.designSettings.logoColor === "primary",
  });

  return (
    <section className="container max-w-container  w-full py-12">
      <div className="space-y-6">
        <div className="flex lg:flex-row flex-col items-start gap-7 md:gap-10 lg:gap-36 justify-between">
          <div className="lg:flex hidden basis-3/5  flex-wrap items-start gap-8 justify-start">
            {footerContent.links.map((link) => {
              return (
                <div className="space-y-3" key={link.id}>
                  <span className={groupTextClassName}>{link.text}</span>
                  <div className={linkContainerClassName}>
                    {link.subLinks.map((subLink) => (
                      <FooterLink key={subLink.id} subLink={subLink} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="space-y-4 lg:flex hidden flex-col basis-2/5  text-end items-end">
            {footerContent.siteLogo && (
              <div>
                <LogoText
                  logo={headerContent.logo}
                  logoClassNames={logoClassNames}
                />
                <Logo
                  logoType={headerContent.logo.logoType}
                  logoSize={headerStyle.designSettings.logoSize}
                  logo={logo}
                />
              </div>
            )}
            <div
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: footerContent.text }}
            />
            <DesignButtons buttons={footerContent.buttons} reverse />
          </div>
          <FooterMobileLinks footerContent={footerContent} />
        </div>
        <div className="w-full flex gap-2 flex-wrap ">
          {footerContent.social.map((social) => {
            return (
              <div
                key={social.id}
                className={cn(
                  "h-10 w-10 bg-muted rounded-sm flex items-center justify-center",
                  { "cursor-pointer": social.link }
                )}
                onClick={() => handleSocialLinkClick(social.link)}
              >
                {iconMap[social.icon]}
              </div>
            );
          })}
        </div>
        <div className="space-y-4 lg:hidden flex flex-col w-full text-end items-end">
          {footerContent.siteLogo && (
            <div>
              <LogoText
                logo={headerContent.logo}
                logoClassNames={logoClassNames}
              />
              <Logo
                logoType={headerContent.logo.logoType}
                logoSize={headerStyle.designSettings.logoSize}
                logo={logo}
              />
            </div>
          )}
          <div
            className="text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: footerContent.text }}
          />
          <DesignButtons buttons={footerContent.buttons} />
        </div>
        <hr />
        <div className="flex items-start justify-between  gap-7 md:gap-10 lg:gap-36">
          <div
            className="text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: footerContent.copyRight.leftArea,
            }}
          />
          <div
            className="text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: footerContent.copyRight.rightArea,
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Design2;
