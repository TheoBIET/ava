import { IoLogoGithub, IoLogoTwitter, IoSettings } from "react-icons/io5";
import { BiSolidUserVoice } from "react-icons/bi";
import { IconType } from "react-icons";

export enum LinkCategories {
  Settings = 'Application Settings',
  Customization = 'Customization',
  Data = 'Data Analytics',
  Misc = 'Miscellaneous',
}

export type Link = {
  path: string;
  title: string;
  icon: IconType;
  isExternal?: boolean;
  category: string;
};

const Links: Link[] = [
  {
    path: '/settings/configuration',
    title: 'Configuration',
    icon: IoSettings,
    category: LinkCategories.Settings,
  },
  {
    path: '/settings/audio',
    title: 'Voice & Audio',
    icon: BiSolidUserVoice,
    category: LinkCategories.Settings,
  },
  {
    path: '/settings/connected_applications',
    title: 'Applications',
    icon: BiSolidUserVoice,
    category: LinkCategories.Settings,
  },
  {
    path: 'https://github.com/TheoBIET/ava',
    title: 'GitHub',
    icon: IoLogoGithub,
    isExternal: true,
    category: LinkCategories.Misc,
  },
  {
    path: 'https://twitter.com/DavDav_js',
    title: 'Twitter',
    icon: IoLogoTwitter,
    isExternal: true,
    category: LinkCategories.Misc,
  }
]

export default Links;
