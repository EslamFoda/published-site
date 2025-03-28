import {
  BehanceLogo,
  DiscordLogo,
  Envelope,
  FacebookLogo,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  MediumLogo,
  PinterestLogo,
  RedditLogo,
  SoundcloudLogo,
  TelegramLogo,
  TiktokLogo,
  TwitterLogo,
  WhatsappLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { SocialLinkIcons } from "@/types/common";
import { JSX } from "react";

export const iconMap: Record<SocialLinkIcons, JSX.Element> = {
  [SocialLinkIcons.Twitter]: <TwitterLogo size={19} />,
  [SocialLinkIcons.Facebook]: <FacebookLogo size={19} />,
  [SocialLinkIcons.Instagram]: <InstagramLogo size={19} />,
  [SocialLinkIcons.Tiktok]: <TiktokLogo size={19} />,
  [SocialLinkIcons.Email]: <Envelope size={19} />,
  [SocialLinkIcons.Medium]: <MediumLogo size={19} />,
  [SocialLinkIcons.LinkedIn]: <LinkedinLogo size={19} />,
  [SocialLinkIcons.WhatsApp]: <WhatsappLogo size={19} />,
  [SocialLinkIcons.Github]: <GithubLogo size={19} />,
  [SocialLinkIcons.Youtube]: <YoutubeLogo size={19} />,
  [SocialLinkIcons.Behance]: <BehanceLogo size={19} />,
  [SocialLinkIcons.Telegram]: <TelegramLogo size={19} />,
  [SocialLinkIcons.Discord]: <DiscordLogo size={19} />,
  [SocialLinkIcons.Reddit]: <RedditLogo size={19} />,
  [SocialLinkIcons.SoundCloud]: <SoundcloudLogo size={19} />,
  [SocialLinkIcons.Pinterest]: <PinterestLogo size={19} />,
};
