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
import {
  TestimonialContent,
  TestimonialStyle,
} from "@/types/sectionsTypes/testimonials";
import { Star } from "lucide-react";
import { QuoteIcon } from "@/icons/testimonials";
import BackgroundImage from "@/components/shared/backgroundImage";
import SectionHeader from "@/components/shared/sectionHeader";
import { SectionType } from "@/types/section";

interface DesignProps {
  section: SectionType;
}
function Design1({ section }: DesignProps) {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const testimonialStyle = section?.style as TestimonialStyle;
  const testimonialsContent = section?.content as TestimonialContent;
  const {
    avatar,
    rating,
    spacing,
    align,
    background,
    border,
    carouselSettings,
    displayType,
    grid,
    leftTitlePosition,
    sectionBackground,
    shape,
    textSize,
  } = testimonialStyle?.designSettings;

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

  const reviewClassNames = cn({
    "text-sm": textSize === "s",
    "text-sm font-semibold": textSize === "m",
    "text-md font-semibold": textSize === "l",
  });

  const gridClassNames = cn(
    "grid items-start",
    grid.desktop === 3 && "lg:grid-cols-3",
    grid.desktop === 2 && "lg:grid-cols-2",
    grid.desktop === 1 && "lg:grid-cols-1",
    grid.mobile === 2 && "grid-cols-2",
    grid.mobile === 1 && "grid-cols-1"
  );

  const listItemClassNames = cn(
    "flex flex-col justify-between h-full rounded-md min-h-44",
    {
      "bg-muted": background,
      "outline outline-[1px] outline-muted": border,
      "bg-background": bgMuted || bgPrimary,
      "items-start": align === "start",
      "items-center": align === "center",
      "items-end": align === "end",
    }
  );

  const avatarClassNames = cn(
    "flex items-center h-10 w-10 bg-background self-baseline  justify-center shrink-0",
    {
      "rounded-md": shape === "square",
      "rounded-full": shape === "rounded",
      "self-baseline": align === "start",
      "self-center": align === "center",
      "self-end": align === "end",
    },
    background ? "bg-background" : "bg-muted",
    bgMuted && "bg-muted",
    bgPrimary && "bg-muted"
  );

  const containerClassNames = cn(" grid grid-cols-1 space-y-4", {
    "md:grid-cols-3 grid-cols-1 gap-4 md:space-y-0 space-y-4":
      leftTitlePosition,
  });

  const starsBoxClassNames = cn("flex flex-col", {
    "items-start text-start": align === "start",
    "items-center text-center": align === "center",
    "items-end text-end": align === "end",
  });

  const userClassNames = cn("flex flex-col gap-1", {
    "items-start text-start": align === "start",
    "items-center text-center": align === "center",
    "items-end text-end": align === "end",
  });

  const imgContainerClassNames = cn(
    "flex items-center h-10 w-10  self-baseline justify-center shrink-0",
    {
      "rounded-md": shape === "square",
      "rounded-full": shape === "rounded",
    }
  );

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
              content={testimonialsContent}
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
                  {testimonialsContent.testimonials.map(
                    (review, index: number) => {
                      return (
                        <div
                          key={review.id || index}
                          className={listItemClassNames}
                          style={{
                            padding: isDesktop
                              ? spacing.padding.desktop
                              : spacing.padding.mobile,
                          }}
                        >
                          <div className={starsBoxClassNames}>
                            {rating && (
                              <div className="flex gap-1 mb-2">
                                {testimonialsContent.iconType === "star" ? (
                                  [...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      size={24}
                                      className={
                                        i < review.rating
                                          ? "fill-primary stroke-none"
                                          : "fill-muted-foreground/50 stroke-none"
                                      }
                                    />
                                  ))
                                ) : (
                                  <QuoteIcon />
                                )}
                              </div>
                            )}
                            <h5
                              className={reviewClassNames}
                              style={{ whiteSpace: "pre-line" }}
                            >
                              {review.review}
                            </h5>
                          </div>
                          <div className="flex flex-col items-start mt-10 gap-2">
                            {avatar && (
                              <div className={avatarClassNames}>
                                {review.avatar ? (
                                  <div
                                    className={imgContainerClassNames}
                                    style={{
                                      backgroundImage: `url(${review.avatar})`,
                                      backgroundSize: "cover",
                                      backgroundPosition: "center",
                                      backgroundRepeat: "no-repeat",
                                    }}
                                  ></div>
                                ) : (
                                  <div className={avatarClassNames}>
                                    <ImagePlaceHolder
                                      fillColor={
                                        testimonialStyle.designSettings
                                          .background &&
                                        !bgMuted &&
                                        !bgPrimary
                                          ? "fill-muted"
                                          : "fill-background"
                                      }
                                      height={20}
                                      width={20}
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                            <div className={userClassNames}>
                              <span
                                className="text-xs"
                                style={{ whiteSpace: "pre-line" }}
                              >
                                {review.name}
                              </span>
                              <span
                                className="text-xs text-muted-foreground"
                                style={{ whiteSpace: "pre-line" }}
                              >
                                {review.bio}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <Carousel
                  plugins={autoScrollPlugin}
                  opts={{
                    skipSnaps: true,
                    loop: autoScroll ? true : false,
                  }}
                >
                  <CarouselContent className="py-1">
                    {testimonialsContent.testimonials.map(
                      (review, index: number) => {
                        return (
                          <CarouselItem
                            key={review.id || index}
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
                              <div className={starsBoxClassNames}>
                                <div className="flex gap-1 mb-2">
                                  {testimonialsContent.iconType === "star" ? (
                                    [...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        size={21}
                                        className={
                                          i < review.rating
                                            ? "fill-primary stroke-none"
                                            : "fill-muted-foreground/50 stroke-none"
                                        }
                                      />
                                    ))
                                  ) : (
                                    <QuoteIcon />
                                  )}
                                </div>
                                <h5
                                  className={reviewClassNames}
                                  style={{ whiteSpace: "pre-line" }}
                                >
                                  {review.review}
                                </h5>
                              </div>
                              <div className="flex flex-col items-center mt-10 gap-2">
                                <div className={avatarClassNames}>
                                  {review.avatar ? (
                                    <div
                                      className={imgContainerClassNames}
                                      style={{
                                        backgroundImage: `url(${review.avatar})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                      }}
                                    ></div>
                                  ) : (
                                    <div className={avatarClassNames}>
                                      <ImagePlaceHolder
                                        fillColor={
                                          testimonialStyle.designSettings
                                            .background &&
                                          !bgMuted &&
                                          !bgPrimary
                                            ? "fill-muted"
                                            : "fill-background"
                                        }
                                        height={20}
                                        width={20}
                                      />
                                    </div>
                                  )}
                                </div>
                                <div className={userClassNames}>
                                  <span
                                    className="text-xs"
                                    style={{ whiteSpace: "pre-line" }}
                                  >
                                    {review.name}
                                  </span>
                                  <span
                                    className="text-xs text-muted-foreground"
                                    style={{ whiteSpace: "pre-line" }}
                                  >
                                    {review.bio}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CarouselItem>
                        );
                      }
                    )}
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
