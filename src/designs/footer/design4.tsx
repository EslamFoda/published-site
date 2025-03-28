import { FooterContent } from "@/types/sectionsTypes/footer";
import React from "react";
import { FooterLink } from "./footerLink";
import { cn } from "@/lib/utils";
import { FooterMobileLinks } from "./footerMobileLinks";
import DesignButtons from "@/components/shared/designButtons";
import { SectionType } from "@/types/section";
import { iconMap } from "@/icons/socialIcons";
interface Design4Props {
  section: SectionType;
}

function Design4({ section }: Design4Props) {
  // const { settings } = useAppSelector((state) => state.editor.present);
  const footerContent = section?.content as FooterContent;

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
    "flex items-center justify-center flex-col gap-3":
      footerContent.links.length > 1,
    "flex items-center justify-center flex-row gap-6 flex-wrap":
      footerContent.links.length === 1,
  });

  return (
    <section className="container max-w-container  w-full py-12">
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center gap-12 justify-center">
          <div className="lg:flex hidden flex-wrap items-start gap-8 justify-center">
            {footerContent.links.map((link) => {
              return (
                <div className="space-y-3 text-center" key={link.id}>
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
          <FooterMobileLinks footerContent={footerContent} />
          <div className="w-full flex gap-2 flex-wrap items-center justify-center">
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
          <div className="space-y-4 ">
            <div
              className="text-muted-foreground max-w-3xl"
              dangerouslySetInnerHTML={{ __html: footerContent.text }}
            />
            <DesignButtons
              buttons={footerContent.buttons}
              btnClassNames="justify-center"
            />
            <h2>{"settings.name"}</h2>
          </div>
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

export default Design4;
