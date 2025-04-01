import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { HeaderContent, HeaderStyle } from "@/types/sectionsTypes/header";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChevronDown } from "lucide-react";
import { HeaderLink } from "./headerLink";
import DesignButtons from "@/components/shared/designButtons";
import Logo from "./logo";
import { LogoText } from "./logoText";
import Announcement from "./announcement";
import HeaderMenu from "./headerMenu";
import { SectionType } from "@/types/section";
import { useMobileMenu } from "@/context/MobileMenuContext";

interface Design4Props {
  section: SectionType;
}

function Design4({ section }: Design4Props) {
  const { setMobMenuOpen } = useMobileMenu();
  const headerContent = section?.content as HeaderContent;
  const headerStyle = section?.style as HeaderStyle;
  const { sticky, float, autoHide, width, shadow, glass } =
    headerStyle.designSettings;
  const { logo } = headerContent;

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveringIndex, setHoveringIndex] = useState<number | null>(null);
  const handleMouseEnter = (index: number) => {
    setHoveringIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveringIndex(null);
  };

  const logoClassNames = cn("text-xl", {
    "text-primary": headerStyle.designSettings.logoColor === "primary",
  });

  const normalHeaderClassName = cn(
    "bg-background transition-transform ease-linear",
    {
      "fixed right-0 w-screen  top-0 z-10": sticky,
      "-translate-y-48": !isVisible && autoHide && sticky, // hide navbar when not visible
      "translate-y-0": isVisible && autoHide && sticky, // show navbar when visible
      "bg-background/50 backdrop-blur-lg": glass,
      "shadow-lg": shadow,
      "absolute bg-background/50 backdrop-blur-lg top-0 right-0 w-screen z-10":
        glass && !sticky,
    }
  );

  const normalHeaderInnerClassName = cn(
    "min-h-20 py-3 grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] gap-7 items-center",
    {
      "container max-w-container": width === "fit",
      "px-3": width === "fill",
    }
  );

  const floatHeaderClassName = cn(
    "bg-background transition-transform ease-linear",
    {
      "mx-auto inset-x-0 rounded-md fixed right-0 top-0 z-10 mt-2": float,
      "-translate-y-48": !isVisible && autoHide && sticky, // hide navbar when not visible
      "translate-y-0": isVisible && autoHide && sticky, // show navbar when visible
      "shadow-lg": shadow && width === "fill",
      "bg-background/50 backdrop-blur-lg": glass && width === "fill",
      "bg-transparent": glass && width === "fit",
      "w-[99vw] ms-1 max-lg:ms-2 max-lg:w-[98vw] max-md:w-[96vw] max-md:ms-2":
        width === "fill",
      "ms-0 max-md:ms-0 bg-transparent": width === "fit",
    }
  );

  const floatHeaderInnerClassName = cn({
    "container max-w-container": width === "fit",
  });

  const innerHeaderClassName = cn(
    "grid grid-cols-2 rounded-md lg:grid-cols-[1fr_auto_1fr] items-center gap-7 w-full bg-background px-3 py-3 min-h-20",
    {
      "shadow-lg": shadow && width === "fit",
      "bg-transparent": glass && width === "fill",
      "bg-background/50 backdrop-blur-lg": glass && width === "fit",
      "rounded-t-none":
        headerContent.announcement.position === "above" &&
        headerContent.announcement.text,
      "rounded-b-none":
        headerContent.announcement.position === "below" &&
        headerContent.announcement.text,
    }
  );

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const scrollY = window.scrollY;

        if (scrollY > lastScrollY) {
          setIsVisible(false); // hide the navbar when scrolling down
        } else {
          setIsVisible(true); // show the navbar when scrolling up
        }

        setLastScrollY(scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastScrollY]);

  if (float) {
    return (
      <header className={floatHeaderClassName}>
        <div className={floatHeaderInnerClassName}>
          {headerContent.announcement.text &&
            headerContent.announcement.position === "above" && (
              <Announcement
                announcement={headerContent.announcement}
                headerFloat={float}
                glassEffect={glass}
                headerWidth={width}
              />
            )}
          <div className={innerHeaderClassName}>
            <nav className="hidden lg:flex gap-7 group">
              {headerContent.links.map((link, i) => (
                <HoverCard key={link.id} closeDelay={100} openDelay={100}>
                  <HoverCardTrigger
                    asChild
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                    onMouseOver={() => handleMouseEnter(i)}
                    className={`flex items-center gap-1 cursor-pointer  whitespace-nowrap group-hover:text-muted-foreground transition-colors hover:!text-secondary-foreground ${
                      hoveringIndex === i && "!text-secondary-foreground"
                    }`}
                  >
                    <div>
                      <HeaderLink link={link} />
                      {link.subLinks.length > 0 && (
                        <span>
                          <ChevronDown
                            size={16}
                            className={`${
                              hoveringIndex === i && "rotate-180"
                            } transition-transform ease-in-out`}
                          />
                        </span>
                      )}
                    </div>
                  </HoverCardTrigger>
                  {link.subLinks.length ? (
                    <HoverCardContent
                      onMouseEnter={() => handleMouseEnter(i)}
                      onMouseLeave={handleMouseLeave}
                      onMouseOver={() => handleMouseEnter(i)}
                      className="flex flex-col gap-2 p-1"
                      align="start"
                    >
                      {link.subLinks.map((subLink) => (
                        <div
                          key={subLink.id}
                          className="cursor-pointer whitespace-nowrap rounded-sm hover:bg-muted py-1 px-2"
                        >
                          <HeaderLink link={subLink} />
                        </div>
                      ))}
                    </HoverCardContent>
                  ) : null}
                </HoverCard>
              ))}
            </nav>
            <LogoText
              logo={headerContent.logo}
              logoClassNames={logoClassNames}
            />
            <Logo
              logoType={headerContent.logo.logoType}
              logoSize={headerStyle.designSettings.logoSize}
              logo={logo}
            />
            <div className="hidden lg:flex items-center gap-3 justify-self-end">
              <DesignButtons
                buttons={headerContent.buttons}
                reverse
                btnClassNames="min-w-24"
              />
              <div
                className="cursor-pointer"
                onClick={() => setMobMenuOpen(true)}
              >
                <HeaderMenu options={headerContent.options} />
              </div>
            </div>
            <div
              className="block lg:hidden cursor-pointer justify-self-end"
              onClick={() => setMobMenuOpen(true)}
            >
              <HeaderMenu options={headerContent.options} />
            </div>
          </div>
          {headerContent.announcement.text &&
            headerContent.announcement.position === "below" && (
              <Announcement
                announcement={headerContent.announcement}
                headerFloat={float}
                glassEffect={glass}
                headerWidth={width}
              />
            )}
        </div>
      </header>
    );
  }

  return (
    <header className={normalHeaderClassName}>
      {headerContent.announcement.text &&
        headerContent.announcement.position === "above" && (
          <Announcement
            announcement={headerContent.announcement}
            headerFloat={float}
            glassEffect={glass}
            headerWidth={width}
          />
        )}
      <div className={normalHeaderInnerClassName}>
        <nav className="hidden lg:flex gap-7 group">
          {headerContent.links.map((link, i) => (
            <HoverCard key={link.id} closeDelay={100} openDelay={100}>
              <HoverCardTrigger
                asChild
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                onMouseOver={() => handleMouseEnter(i)}
                className={`flex items-center gap-1 cursor-pointer  whitespace-nowrap group-hover:text-muted-foreground transition-colors hover:!text-secondary-foreground ${
                  hoveringIndex === i && "!text-secondary-foreground"
                }`}
              >
                <div>
                  <HeaderLink link={link} />
                  {link.subLinks.length > 0 && (
                    <span>
                      <ChevronDown
                        size={16}
                        className={`${
                          hoveringIndex === i && "rotate-180"
                        } transition-transform ease-in-out`}
                      />
                    </span>
                  )}
                </div>
              </HoverCardTrigger>
              {link.subLinks.length ? (
                <HoverCardContent
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                  onMouseOver={() => handleMouseEnter(i)}
                  className="flex flex-col gap-2 p-1"
                  align="start"
                >
                  {link.subLinks.map((subLink) => (
                    <div
                      key={subLink.id}
                      className="cursor-pointer whitespace-nowrap rounded-sm hover:bg-muted py-1 px-2"
                    >
                      <HeaderLink link={subLink} />
                    </div>
                  ))}
                </HoverCardContent>
              ) : null}
            </HoverCard>
          ))}
        </nav>
        <LogoText logo={headerContent.logo} logoClassNames={logoClassNames} />
        <Logo
          logoType={headerContent.logo.logoType}
          logoSize={headerStyle.designSettings.logoSize}
          logo={logo}
        />
        <div className="hidden lg:flex items-center gap-3 justify-self-end">
          <DesignButtons
            buttons={headerContent.buttons}
            reverse
            btnClassNames="min-w-24"
          />
          <div className="cursor-pointer" onClick={() => setMobMenuOpen(true)}>
            <HeaderMenu options={headerContent.options} />
          </div>
        </div>
        <div
          className="block lg:hidden cursor-pointer justify-self-end"
          onClick={() => setMobMenuOpen(true)}
        >
          <HeaderMenu options={headerContent.options} />
        </div>
      </div>
      {headerContent.announcement.text &&
        headerContent.announcement.position === "below" && (
          <Announcement
            announcement={headerContent.announcement}
            headerFloat={float}
            glassEffect={glass}
            headerWidth={width}
          />
        )}
    </header>
  );
}

export default Design4;
