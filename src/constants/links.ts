import { IoLogoGithub } from "react-icons/io5";
import { BiSolidUserVoice } from "react-icons/bi";
import { IconType } from "react-icons";

type Link = {
  path: string;
  title: string;
  icon: IconType;
  isExternal?: boolean;
};

const Links: Link[] = [
  {
    path: '/settings/audio',
    title: 'Audio',
    icon: BiSolidUserVoice,
  },
  {
    path: 'https://github.com/TheoBIET/ava',
    title: 'GitHub',
    icon: IoLogoGithub,
    isExternal: true,
  }
]

export default Links;
