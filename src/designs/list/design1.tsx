import { ImagePlaceHolder } from "@/icons/common";
import React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "react-responsive";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { ListContent, ListStyle } from "@/types/sectionsTypes/list";
import { getPhosphorIcon } from "@/helper/phosphorIcons";
import BackgroundImage from "@/components/shared/backgroundImage";
import SectionHeader from "@/components/shared/sectionHeader";
import { SectionType } from "@/types/section";

interface DesignProps {
  section: SectionType;
}
function Design1({ section }: DesignProps) {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const listStyle = section?.style as ListStyle;
  const listContent = section?.content as ListContent;
  const {
    spacing,
    align,
    background,
    border,
    carouselSettings,
    grid,
    height,
    iconColor,
    layout,
    leftTitlePosition,
    sectionBackground,
    shape,
    textSize,
    displayType,
    icon,
  } = listStyle.designSettings;

  const bgMuted = sectionBackground.color === "gray";
  const bgPrimary = sectionBackground.color === "primary";
  const autoScroll = carouselSettings?.autoScroll;
  const scrollSpeed = carouselSettings?.scrollSpeed;
  const autoScrollPlugin = autoScroll
    ? [
        AutoScroll({
          startDelay: 3000,
          stopOnMouseEnter: true,
          stopOnInteraction: false,
          playOnInit: true,
          speed: scrollSpeed || 2,
        }),
      ]
    : [];

  const titleClassName = cn(
    textSize === "s" && "text-sm",
    textSize === "m" && "text-base",
    textSize === "l" && "text-lg"
  );
  const texClassName = cn("text-muted-foreground text-sm");
  const gridClassNames = cn(
    "grid items-start",
    grid.desktop === 3 && "lg:grid-cols-3",
    grid.desktop === 2 && "lg:grid-cols-2",
    grid.desktop === 1 && "lg:grid-cols-1",
    grid.mobile === 2 && "grid-cols-2",
    grid.mobile === 1 && "grid-cols-1"
  );

  const listItemClassNames = cn("flex gap-5 gap-y-3  rounded-md", {
    "bg-muted": background,
    "outline outline-[1px] outline-muted": border,
    "bg-background": bgMuted || bgPrimary,
    "flex-row items-start": layout === "row",
    "flex-col": layout === "col",
  });

  const listItemTextClassNames = cn("self-center", {
    "self-start": layout === "col",
  });

  const iconContainerClassNames = cn(
    "flex items-center  justify-center shrink-0",
    {
      "rounded-sm": shape === "square",
      "rounded-full": shape === "rounded",
      "bg-background": iconColor === "none",
      hidden: !icon,
      "bg-muted": (iconColor === "none" && border) || bgMuted || bgPrimary,
    }
  );

  const containerClassNames = cn(" grid grid-cols-1 space-y-4", {
    "md:grid-cols-3 grid-cols-1 gap-4 md:space-y-0 space-y-4":
      leftTitlePosition,
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
              content={listContent}
              sectionBackground={sectionBackground}
              align={align}
              leftTitlePosition={leftTitlePosition}
            />
            <div className="md:col-span-2">
              {displayType === "grid" ? (
                <div
                  className={gridClassNames}
                  style={{
                    gap: isDesktop ? spacing.gap.desktop : spacing.gap.mobile,
                  }}
                >
                  {listContent.list.map((listItem, index: number) => {
                    const ListIcon = getPhosphorIcon(listItem.icon);
                    return (
                      <div
                        key={listItem.id || index}
                        className={listItemClassNames}
                        style={{
                          padding: isDesktop
                            ? spacing.padding.desktop
                            : spacing.padding.mobile,
                        }}
                      >
                        <div
                          className={cn(iconContainerClassNames, {
                            "bg-primary":
                              iconColor === "primary" && listItem.icon,
                            "bg-background": !listItem.icon,
                            "bg-muted":
                              (bgMuted || bgPrimary || border) &&
                              !listItem.icon,
                          })}
                          style={{
                            height: height,
                            width: height,
                          }}
                        >
                          {listItem.icon ? (
                            <ListIcon
                              size={height / 2.5}
                              className={cn({
                                "text-primary-foreground":
                                  iconColor === "primary",
                              })}
                            />
                          ) : (
                            <ImagePlaceHolder
                              fillColor={
                                border || bgMuted || bgPrimary
                                  ? "fill-background"
                                  : "fill-muted"
                              }
                              height={height / 2.5}
                              width={height / 2.5}
                            />
                          )}
                        </div>
                        <div className={listItemTextClassNames}>
                          <h5
                            className={titleClassName}
                            style={{ whiteSpace: "pre-line" }}
                          >
                            {listItem.title}
                          </h5>
                          <p
                            className={texClassName}
                            style={{ whiteSpace: "pre-line" }}
                          >
                            {listItem.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <Carousel
                  plugins={autoScrollPlugin}
                  opts={{
                    skipSnaps: true,
                    loop: autoScroll ? true : false,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="items-stretch py-1">
                    {listContent.list.map((listItem, index: number) => {
                      const ListIcon = getPhosphorIcon(listItem.icon);
                      return (
                        <CarouselItem
                          className="h-full"
                          key={index}
                          style={{
                            flexBasis: isDesktop
                              ? carouselSettings.desktopWidth
                              : carouselSettings.mobileWidth,
                            marginInlineEnd: isDesktop
                              ? spacing.gap.desktop
                              : spacing.gap.mobile,
                            paddingInlineStart: index === 0 ? "" : 0,
                          }}
                        >
                          <div
                            key={index}
                            className={listItemClassNames}
                            style={{
                              padding: isDesktop
                                ? spacing.padding.desktop
                                : spacing.padding.mobile,
                            }}
                          >
                            <div
                              className={cn(iconContainerClassNames, {
                                "bg-primary":
                                  iconColor === "primary" && listItem.icon,
                                "bg-background": !listItem.icon,
                                "bg-muted":
                                  (bgMuted || bgPrimary || border) &&
                                  !listItem.icon,
                              })}
                              style={{
                                height: height,
                                width: height,
                              }}
                            >
                              {listItem.icon ? (
                                <ListIcon
                                  size={height / 2.5}
                                  className={cn({
                                    "text-primary-foreground":
                                      iconColor === "primary",
                                  })}
                                />
                              ) : (
                                <ImagePlaceHolder
                                  fillColor={
                                    border || bgMuted || bgPrimary
                                      ? "fill-background"
                                      : "fill-muted"
                                  }
                                  height={height / 2.5}
                                  width={height / 2.5}
                                />
                              )}
                            </div>
                            <div className={listItemTextClassNames}>
                              <h5
                                className={titleClassName}
                                style={{ whiteSpace: "pre-line" }}
                              >
                                {listItem.title}
                              </h5>
                              <p
                                className={texClassName}
                                style={{ whiteSpace: "pre-line" }}
                              >
                                {listItem.text}
                              </p>
                            </div>
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Design1;
