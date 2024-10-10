import { FaBookBookmark as DictionaryIcon } from "react-icons/fa6";
import { IoIosInformationCircleOutline} from "react-icons/io";
import { AILogoDark } from "../../assets/index.jsx";
import { AILogoLight } from "../../assets/index.jsx";
import { DictionaryLogo } from "../../assets/index.jsx";
import { DictionaryLogoLight } from "../../assets/index.jsx";
import { AboutIconLight } from "../../assets/index.jsx";
import { AboutIcon } from "../../assets/index.jsx";
export const sideBarItems = () => [
    {
      iconLight: DictionaryLogoLight,
      iconDark: DictionaryLogo ,
      text: "Sözlük",
      link: "dictionary",
      colorDark: "#FFD700"
    },
    {
      iconLight: AboutIconLight,
      iconDark: AboutIcon,
      text: "Contact",
      link: "Contact",
      colorDark: "#FFD700",

    },
    {
      iconLight: AILogoLight,
      iconDark: AILogoDark,
      text: "Translate",
      link: "ai-translate",
    }
  ];
