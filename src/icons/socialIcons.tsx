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
  WhatsappLogo,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { SocialLinkIcons } from "@/types/common";
import { JSX } from "react";

export const iconMap: Record<SocialLinkIcons, JSX.Element> = {
  [SocialLinkIcons.Twitter]: <XLogo size={19} weight="fill" />,
  [SocialLinkIcons.Facebook]: <FacebookLogo size={19} weight="fill" />,
  [SocialLinkIcons.Instagram]: <InstagramLogo size={19} weight="fill" />,
  [SocialLinkIcons.Tiktok]: <TiktokLogo size={19} weight="fill" />,
  [SocialLinkIcons.Email]: <Envelope size={19} weight="fill" />,
  [SocialLinkIcons.Medium]: <MediumLogo size={19} weight="fill" />,
  [SocialLinkIcons.LinkedIn]: <LinkedinLogo size={19} weight="fill" />,
  [SocialLinkIcons.WhatsApp]: <WhatsappLogo size={19} weight="fill" />,
  [SocialLinkIcons.Github]: <GithubLogo size={19} weight="fill" />,
  [SocialLinkIcons.Youtube]: <YoutubeLogo size={19} weight="fill" />,
  [SocialLinkIcons.Behance]: <BehanceLogo size={19} weight="fill" />,
  [SocialLinkIcons.Telegram]: <TelegramLogo size={19} weight="fill" />,
  [SocialLinkIcons.Discord]: <DiscordLogo size={19} weight="fill" />,
  [SocialLinkIcons.Reddit]: <RedditLogo size={19} weight="fill" />,
  [SocialLinkIcons.SoundCloud]: <SoundcloudLogo size={19} weight="fill" />,
  [SocialLinkIcons.Pinterest]: <PinterestLogo size={19} weight="fill" />,
};
