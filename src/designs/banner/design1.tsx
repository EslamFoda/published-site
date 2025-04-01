import { ImagePlaceHolder, VideoPlaceHolder } from "@/icons/common";
import { cn } from "@/lib/utils";
import React, { useState, useRef } from "react";
import { BannerContent, BannerStyle } from "@/types/sectionsTypes/banner";
import BannerButtons from "./bannerButtons";
import { Input } from "@/components/ui/input";
import ReactPlayer from "react-player";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import BackgroundImage from "@/components/shared/backgroundImage";
import DesignLabel from "@/components/shared/label";
import { SectionType } from "@/types/section";
import { HeaderContent, HeaderStyle } from "@/types/sectionsTypes/header";
import { SectionBackground } from "@/types/common";
import { useSiteData } from "@/context/SiteDataContext";

interface Design1Props {
  section: SectionType;
  sectionIndex: number;
}

function Design1({ section, sectionIndex }: Design1Props) {
  const { siteData } = useSiteData();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const globalHeader = siteData?.globalSections?.find(
    (section) => section.sectionName === "Header"
  );
  const headerStyle = globalHeader?.style as HeaderStyle;
  const headerContent = globalHeader?.content as HeaderContent;
  const bannerContent = section?.content as BannerContent;
  const bannerStyle = section?.style as BannerStyle;

  // State for video player
  const [playing, setPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const playerRef = useRef<ReactPlayer>(null);

  // Destructure design settings for easier access
  const {
    showButtons,
    showForm,
    leftTitleWidth,
    align,
    titleSize,
    leftTitlePosition,
    imageSetting,
    sectionBackground,
    height,
    subtitleWidth,
    showVideo,
    spacing,
  } = bannerStyle.designSettings;

  const showImage = imageSetting.showImage;
  const bgMuted = sectionBackground.color === "gray";
  const bgPrimary = sectionBackground.color === "primary";

  // Handle play button click
  const handlePlayButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent section click
    setPlaying(true);
    setMuted(false);
    setShowPlayButton(false);
    setShowControls(true);
  };

  // Handle video end
  const handleVideoEnd = () => {
    setPlaying(false);
    setMuted(true);
    setShowPlayButton(true);
  };

  const getImageClassName = cn(
    "bg-cover bg-no-repeat bg-center rounded-md w-full",
    {
      "bg-primary": imageSetting.backgroundColor === "primary",
      "bg-muted": imageSetting.backgroundColor === "gray",
      "bg-none": imageSetting.backgroundColor === "none",
    }
  );

  const getTitleClassName = cn({
    "text-7xl": titleSize === "xl",
    "text-6xl": titleSize === "l",
    "text-5xl": titleSize === "m",
    "text-4xl": titleSize === "s",
    "text-primary-foreground": sectionBackground.color === "primary",
    "text-white":
      sectionBackground.textColor === "light" &&
      sectionBackground.media.imageUrl,
    "text-black":
      sectionBackground.textColor === "dark" &&
      sectionBackground.media.imageUrl,
  });

  const getTitleAndSubtitleClassName = cn(
    "w-full flex space-y-3",
    {
      "items-start text-start": align === "start",
      "items-center text-center": align === "center",
      "items-end text-end": align === "end",
    },
    leftTitlePosition
      ? "flex-row text-start items-start gap-4 lg:flex md:block block justify-between"
      : "flex-col"
  );

  const getSubAndButtonClassName = cn(
    "flex space-y-2 flex-col max-lg:!w-full",
    {
      "items-start": align === "start",
      "items-center": align === "center",
      "items-end": align === "end",
      "text-start items-start": leftTitlePosition,
    }
  );

  const getBtnClassName = cn({
    "justify-start": align === "start",
    "justify-center": align === "center",
    "justify-end": align === "end",
  });

  const placeholderClassName = cn(
    "w-full flex justify-center items-center rounded-md",
    bgMuted || bgPrimary ? "bg-background" : "bg-muted"
  );

  const getSubTitleClassName = cn("text-lg max-lg:!w-full", {
    "text-primary-foreground": sectionBackground.color === "primary",
    "text-muted-foreground": sectionBackground.color !== "primary",
    "text-white":
      sectionBackground.textColor === "light" &&
      sectionBackground.media.imageUrl,
    "text-black":
      sectionBackground.textColor === "dark" &&
      sectionBackground.media.imageUrl,
  });

  const playBtnClassName = cn(
    "absolute w-16 h-16 rounded-md bg-background flex items-center justify-center focus:outline-none transition-transform hover:scale-110",
    align === "start" || leftTitlePosition ? "bottom-4 left-4" : "",
    align === "end" ? "bottom-4 right-4" : "",
    align === "center" && !leftTitlePosition
      ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      : ""
  );

  const formBtnClassName = cn("whitespace-normal", {
    "border-primary-foreground border-solid border text-primary-foreground":
      sectionBackground.color === "primary",
  });

  const sectionInnerContainer = cn(
    "flex  flex-col w-full z-0 text-center justify-center items-center",
    {
      "max-lg:flex-col-reverse":
        bannerStyle.designSettings.mobile === "flex-col",
      "max-lg:flex-col":
        bannerStyle.designSettings.mobile === "flex-col-reverse",
      "container max-w-container": sectionBackground.width === "fill",
    }
  );
  const mainSectionClassName = cn("flex flex-col overflow-hidden", {
    "container max-w-container my-4": sectionBackground.width === "fit",
  });

  function calculateTopPadding(
    sectionIndex: number,
    headerStyle: HeaderStyle,
    headerContent: HeaderContent,
    sectionBackground: SectionBackground
  ) {
    const isFirstSection = sectionIndex === 0;
    const hasStickyHeader = headerStyle.designSettings.sticky;
    const hasGlassHeader = headerStyle.designSettings.glass;
    const hasAnnouncement = headerContent.announcement.text;
    const isFillWidth = sectionBackground.width === "fill";
    const isFitWidth = sectionBackground.width === "fit";

    if (isFirstSection) {
      if (hasStickyHeader) {
        return hasAnnouncement
          ? isFillWidth
            ? "pt-[108px]"
            : isFitWidth
            ? "mt-[108px]"
            : ""
          : isFillWidth
          ? "pt-[80px]"
          : isFitWidth
          ? "mt-[80px]"
          : "";
      }

      if (hasGlassHeader && !hasStickyHeader) {
        return hasAnnouncement
          ? isFillWidth
            ? "pt-[108px]"
            : isFitWidth
            ? "mt-[108px]"
            : ""
          : isFillWidth
          ? "pt-[80px]"
          : isFitWidth
          ? "mt-[80px]"
          : "";
      }
    }

    return "";
  }

  const sectionBgClassName = cn(
    "flex flex-col relative overflow-hidden",
    {
      "bg-primary": sectionBackground.color === "primary",
      "bg-muted": sectionBackground.color === "gray",
      "bg-background": sectionBackground.color === "none",
      "min-h-screen": sectionBackground.height === "fill",
      "h-auto": sectionBackground.height === "fit",
      "justify-start": sectionBackground.align === "start",
      "justify-center": sectionBackground.align === "center",
      "justify-end": sectionBackground.align === "end",
      "container max-w-container rounded-md": sectionBackground.width === "fit",
    },
    calculateTopPadding(
      sectionIndex,
      headerStyle,
      headerContent,
      sectionBackground
    )
  );

  // Handle click to select this section

  // Render form fields
  const renderFormFields = () => {
    if (!showForm) return null;
    const onlyEmail =
      bannerContent?.form.fields.filter((field) => field.active).length === 1;

    return (
      <div className="space-y-3 w-full">
        {bannerContent?.form.fields.map((field) => {
          if (!field.active) return null;

          if (
            field.type === "email" &&
            bannerContent?.form.button.text &&
            onlyEmail
          ) {
            return (
              <div className="relative w-full" key={field.id}>
                <Input
                  className={cn(
                    "w-full h-14 pr-[calc(theme(spacing.3)+theme(spacing.24))]",
                    bgMuted || bgPrimary
                      ? "bg-background focus:bg-background"
                      : "bg-muted"
                  )}
                  placeholder={field.value || field.placeholder}
                  type={field.type}
                />

                <Button
                  className={cn("absolute right-2 top-1/2 -translate-y-1/2")}
                >
                  {bannerContent?.form.button.text}
                </Button>
              </div>
            );
          }

          if (field.type === "textarea") {
            return (
              <div key={field.id} className="w-full">
                <Textarea
                  id={field.id}
                  className={cn(
                    "w-full !h-52 !max-h-52 !min-h-52 resize-none",
                    bgMuted || bgPrimary ? "bg-background focus:bg-background" : "bg-muted"
                  )}
                  placeholder={field.value || field.placeholder}
                />
              </div>
            );
          }
          return (
            <div key={field.id} className="w-full">
              <Input
                className={cn(
                  "w-full h-12",
                  bgMuted || bgPrimary ? "bg-background focus:bg-background" : "bg-muted"
                )}
                placeholder={field.value || field.placeholder}
                type={field.type}
              />
            </div>
          );
        })}
        {bannerContent?.form.button.text && !onlyEmail && (
          <Button className={formBtnClassName}>
            {bannerContent?.form.button.text}
          </Button>
        )}
      </div>
    );
  };

  // Render image or placeholder
  const renderImage = () => {
    if (!showImage) return null;

    if (bannerContent?.imageSetting?.imageUrl) {
      return (
        <div
          style={{
            height: isDesktop ? height.desktop : height.mobile,
            backgroundImage: `url(${bannerContent?.imageSetting.imageUrl})`,
            backgroundSize: imageSetting.objectFit,
          }}
          className={getImageClassName}
        />
      );
    }

    return (
      <div
        style={{
          height: isDesktop ? height.desktop : height.mobile,
        }}
        className={placeholderClassName}
      >
        <ImagePlaceHolder
          fillColor={bgMuted || bgPrimary ? "fill-muted" : "fill-background"}
        />
      </div>
    );
  };

  // Updated video renderer using ReactPlayer with custom play button
  const renderVideo = () => {
    if (!showVideo) return null;

    if (bannerContent?.videoSetting?.videoUrl) {
      return (
        <div
          className="relative rounded-md overflow-hidden w-full"
          style={{ maxWidth: "100%" }}
        >
          {/* Aspect ratio box (16:9) */}
          <div
            className={cn("relative", {
              "pointer-events-auto": showControls,
              "pointer-events-none": showPlayButton,
            })}
            style={{ paddingTop: "56.25%" }}
          >
            <ReactPlayer
              key={showControls ? "controls-on" : "controls-off"}
              ref={playerRef}
              url={bannerContent?.videoSetting.videoUrl}
              width="100%"
              height="100%"
              playing={playing}
              muted={muted}
              loop={false}
              controls={showControls}
              onEnded={handleVideoEnd}
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>

          {/* Play Button */}
          {showPlayButton && (
            <button
              className={playBtnClassName}
              onClick={handlePlayButtonClick}
              aria-label="Play video"
            >
              <svg
                className="w-6 h-6 text-primary fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          )}
        </div>
      );
    }

    return (
      <div
        style={{
          height: isDesktop ? height.desktop : height.mobile,
        }}
        className={placeholderClassName}
      >
        <VideoPlaceHolder
          fillColor={bgMuted || bgPrimary ? "fill-muted" : "fill-background"}
        />
      </div>
    );
  };

  // Render content with left title layout
  const renderLeftTitleLayout = () => (
    <div className={getTitleAndSubtitleClassName}>
      <div
        className="max-lg:!w-full"
        style={{
          width: leftTitlePosition ? `calc(${leftTitleWidth} - 50px)` : "",
        }}
      >
        <DesignLabel
          text={bannerContent.label}
          sectionBackground={sectionBackground.color}
        />
        <h1 className={getTitleClassName} style={{ whiteSpace: "pre-line" }}>
          {bannerContent?.title}
        </h1>
      </div>
      <div
        style={{
          width: leftTitlePosition ? `${100 - parseInt(leftTitleWidth)}%` : "",
        }}
        className={getSubAndButtonClassName}
      >
        {leftTitlePosition && (
          <p
            style={{
              width: leftTitlePosition ? "" : subtitleWidth,
              whiteSpace: "pre-line",
            }}
            className={getSubTitleClassName}
          >
            {bannerContent?.subtitle}
          </p>
        )}

        {showButtons && (
          <BannerButtons
            buttons={bannerContent.buttons}
            sectionBackground={sectionBackground.color}
          />
        )}
        {renderFormFields()}
      </div>
    </div>
  );

  // Render content with centered title layout
  const renderCenteredTitleLayout = () => (
    <div className="flex gap-3 w-full flex-col text-center justify-center items-center">
      <div className={getTitleAndSubtitleClassName}>
        <DesignLabel
          text={bannerContent.label}
          sectionBackground={sectionBackground.color}
        />
        <h1 className={getTitleClassName} style={{ whiteSpace: "pre-line" }}>
          {bannerContent?.title}
        </h1>
        <div
          className="space-y-3"
          style={{
            width: leftTitlePosition || !isDesktop ? "100%" : subtitleWidth,
          }}
        >
          <p
            style={{
              width: "100%",
              whiteSpace: "pre-line",
            }}
            className={getSubTitleClassName}
          >
            {bannerContent?.subtitle}
          </p>
          {renderFormFields()}
          {showButtons && (
            <BannerButtons
              buttons={bannerContent.buttons}
              btnClassNames={getBtnClassName}
              sectionBackground={sectionBackground.color}
            />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className={mainSectionClassName}>
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
            gap: isDesktop ? spacing.gap.desktop : spacing.gap.mobile,
            paddingTop: isDesktop ? spacing.top.desktop : spacing.top.mobile,
            paddingBottom: isDesktop
              ? spacing.bottom.desktop
              : spacing.bottom.mobile,
          }}
        >
          {leftTitlePosition
            ? renderLeftTitleLayout()
            : renderCenteredTitleLayout()}
          {renderImage()}
          {renderVideo()}
        </div>
      </div>
    </section>
  );
}

export default Design1;
