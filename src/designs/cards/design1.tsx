import { ImagePlaceHolder } from "@/icons/common";
import Image from "next/image";
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
  Card as CardType,
  CardsContent,
  CardStyle,
} from "@/types/sectionsTypes/cards";
import { Button } from "@/components/ui/button";
import BackgroundImage from "@/components/shared/backgroundImage";
import SectionHeader from "@/components/shared/sectionHeader";
import { Spacing } from "@/types/common";
import { SectionType } from "@/types/section";
import { useRouter } from "next/navigation";
import { useSiteData } from "@/context/SiteDataContext";

interface CardProps {
  card: CardType;
  index: number;
  cardClassNames: string;
  titleClassName: string;
  textOrderClassName: string;
  imageOrderClassName: string;
  imagePlaceholderClassNames: string;
  cardBackground: boolean;
  bgMuted: boolean;
  image: boolean;
  height: { desktop: number; mobile: number };
  spacing: Spacing;
  isDesktop: boolean;
}

const Card: React.FC<CardProps> = ({
  card,
  index,
  cardClassNames,
  titleClassName,
  textOrderClassName,
  imageOrderClassName,
  imagePlaceholderClassNames,
  cardBackground,
  bgMuted,
  image,
  height,
  spacing,
  isDesktop,
}) => {
  const router = useRouter();
  const { siteData } = useSiteData();
  const homePageId = siteData?.settings.homePage;
  const handleCardClick = (card: CardType) => {
    if (card.linkType === "internal" && card.pageId) {
      // Use router.push for internal Next.js navigation
      router.push(homePageId === card.pageId ? "/" : card.link);
      return;
    }

    if (card.linkType === "external" && card.externalLink) {
      let finalLink = card.externalLink;

      // Ensure the link has http/https prefix
      if (
        !finalLink.startsWith("http://") &&
        !finalLink.startsWith("https://")
      ) {
        finalLink = "https://" + finalLink;
      }

      // Open in new tab or same tab based on openNewTab prop
      if (card.openNewTab) {
        window.open(finalLink, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = finalLink;
      }
    }
  };
  return (
    <div
      key={card.id || index}
      className={cn(cardClassNames, {
        "cursor-pointer": card.link || card.externalLink,
      })}
      style={{
        padding: isDesktop ? spacing.padding.desktop : spacing.padding.mobile,
      }}
      onClick={() => handleCardClick(card)}
    >
      <div className="flex flex-col gap-2">
        <h5 className={titleClassName} style={{ whiteSpace: "pre-line" }}>
          {card.title}
        </h5>
        <p className={textOrderClassName} style={{ whiteSpace: "pre-line" }}>
          {card.text}
        </p>
        {image && (
          <div className={imageOrderClassName}>
            {card.image?.length ? (
              <div
                className="relative w-full overflow-hidden rounded-md"
                style={{
                  height: isDesktop ? height.desktop : height.mobile,
                }}
              >
                <Image
                  alt={card.image}
                  src={card.image}
                  fill
                  sizes="100%"
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                style={{
                  height: isDesktop ? height.desktop : height.mobile,
                }}
                className={imagePlaceholderClassNames}
              >
                <ImagePlaceHolder
                  fillColor={
                    cardBackground && !bgMuted
                      ? "fill-muted"
                      : "fill-background"
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>
      {card.button && (
        <Button
          className={cn("mt-2", {
            "bg-primary": card.buttonColor === "primary",
            "bg-mediumGrey hover:bg-mediumGrey text-foreground":
              card.buttonColor === "gray",
          })}
        >
          {card.button}
        </Button>
      )}
    </div>
  );
};

interface DesignProps {
  section: SectionType;
}
function Design1({ section }: DesignProps) {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const cardStyle = section?.style as CardStyle;
  const cardContent = section?.content as CardsContent;
  const { cards } = cardContent;
  const {
    spacing,
    sectionBackground,
    layout,
    grid,
    align,
    titleSize,
    cardBackground,
    cardBorder,
    cardSlider,
    displayType,
    height,
    image,
    leftTitlePosition,
  } = cardStyle.designSettings;

  const bgMuted = sectionBackground.color === "gray";
  const autoScroll = cardStyle?.designSettings?.cardSlider?.autoScroll;
  const scrollSpeed = cardStyle?.designSettings?.cardSlider?.scrollSpeed;
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

  const imageOrderClassName = cn(
    layout === "top" && "order-1",
    layout === "center" && "order-2",
    layout === "bottom" && "order-3"
  );
  const titleClassName = cn(
    layout === "top" && "order-2",
    layout === "center" && "order-1",
    layout === "bottom" && "order-1",
    titleSize === "s" && "text-sm font-medium",
    titleSize === "m" && "text-base font-semibold",
    titleSize === "l" && "text-lg font-bold"
  );
  const textOrderClassName = cn(
    "text-muted-foreground",
    layout === "top" && "order-3",
    layout === "center" && "order-3",
    layout === "bottom" && "order-2"
  );
  const gridClassNames = cn(
    "grid",
    grid.desktop === 3 && "lg:grid-cols-3",
    grid.desktop === 2 && "lg:grid-cols-2",
    grid.desktop === 1 && "lg:grid-cols-1",
    grid.mobile === 2 && "grid-cols-2",
    grid.mobile === 1 && "grid-cols-1"
  );

  const cardClassNames = cn(
    "flex flex-col gap-2 rounded-md",
    cardBackground && "bg-muted",
    cardBorder && "outline outline-[1px] outline-muted",
    bgMuted && "bg-background"
  );

  const imagePlaceholderClassNames = cn(
    "w-full flex justify-center items-center rounded-md",
    cardBackground ? "bg-background" : "bg-muted",
    bgMuted && "bg-muted"
  );

  const containerClassNames = cn(
    "grid grid-cols-1 space-y-4",
    leftTitlePosition &&
      "md:grid-cols-3 grid-cols-1 gap-4 md:space-y-0 space-y-4"
  );

  const sectionTitleAndSubTitleClassNames = cn({
    "text-start": leftTitlePosition,
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
    "text-start": align === "start",
    "text-center": align === "center",
    "text-end": align === "end",
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
              content={cardContent}
              sectionBackground={sectionBackground}
              align={align}
              leftTitlePosition={leftTitlePosition}
              containerClassName={sectionTitleAndSubTitleClassNames}
            />
            <div className="md:col-span-2">
              {displayType === "grid" ? (
                <div
                  className={gridClassNames}
                  style={{
                    gap: isDesktop ? spacing.gap.desktop : spacing.gap.mobile,
                  }}
                >
                  {cardContent.cards.map((card: CardType, index: number) => (
                    <Card
                      key={card.id || index}
                      card={card}
                      index={index}
                      cardClassNames={cardClassNames}
                      titleClassName={titleClassName}
                      textOrderClassName={textOrderClassName}
                      imageOrderClassName={imageOrderClassName}
                      imagePlaceholderClassNames={imagePlaceholderClassNames}
                      cardBackground={cardBackground}
                      bgMuted={bgMuted}
                      image={image}
                      height={height}
                      spacing={spacing}
                      isDesktop={isDesktop}
                    />
                  ))}
                </div>
              ) : (
                <Carousel
                  plugins={autoScrollPlugin}
                  opts={{
                    skipSnaps: true,
                    loop: autoScroll ? true : false,
                  }}
                  className="w-full items-stretch"
                >
                  <CarouselContent className="py-1">
                    {cards.map((card, index) => (
                      <CarouselItem
                        key={card.id || index}
                        style={{
                          flexBasis: isDesktop
                            ? cardSlider.desktopWidth
                            : cardSlider.mobileWidth,
                          marginInlineEnd: isDesktop
                            ? spacing.gap.desktop
                            : spacing.gap.mobile,
                          paddingInlineStart: index === 0 ? "" : 0,
                        }}
                      >
                        <Card
                          card={card}
                          index={index}
                          cardClassNames={cardClassNames + " h-full"}
                          titleClassName={titleClassName}
                          textOrderClassName={textOrderClassName}
                          imageOrderClassName={imageOrderClassName}
                          imagePlaceholderClassNames={
                            imagePlaceholderClassNames
                          }
                          cardBackground={cardBackground}
                          bgMuted={bgMuted}
                          image={image}
                          height={height}
                          spacing={spacing}
                          isDesktop={isDesktop}
                        />
                      </CarouselItem>
                    ))}
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
