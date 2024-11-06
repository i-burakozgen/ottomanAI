import aiDarkFeatures from "./ai-underconstruction-dark.webp"
import aiLightFeatures from "./ai-underconstruction-light.webp"
import bookDark from "./bookDictDarkFeatures.jpeg"
import bookLight from "./bookDictLightFeatures.jpeg"
import linkedinProfilePic from "./linkdinProfile.jpg"
import DictScreenShot from "./dictt.png"
import ocrPic from "./ocrAIPic.webp"
import mobilePic from "./mobileAppINTRO.webp"
export const heroData = [
    {
        heading:"AI Transliteration & Ottoman Dictionary",
        text:"Import images with help of the ai and ocr Transform Ottoman text into modern Turkish and English. Search for word from rich and truested database and transliterate Ottoman scripts.",
        buttonTextAi:"Get Started With AI",
        buttonTextDict:"Go To Dictionary",
    }
]
export const featuersData = 
[
    {
        aiData :{
        imageDark: aiDarkFeatures,
        imageLight:aiLightFeatures,
        aiTextAlt: "under construction image",
        aiHeading: "AI Transliteration",
        aiText: "Our innovative AI transliteration feature is currently under development while we seek funding for advanced features. In the meantime, you can explore our Ottoman dictionary and feel free to contact me for any inquiries or collaboration opportunities.",

        },
        dictionaryData:{
            imageDark:bookDark,
            imageLight:bookLight,
            dictTextAlt:"dictonary page image",
            dictHeading:"Ottoman Dictionary",
            dictText:"Search for thousands of Ottoman words and their meanings in written both latin and ottoman from trusted resources.",

        },
        

    }
]
export const galleryData = [
    DictScreenShot,
    ocrPic,
]
export const aboutData = [

    {
        text:"I'am passionate full stack developer this is a startup project open for future developments and investments if you are interested to involve",

        linkdinData:{
            image:linkedinProfilePic,/*LinkdingProfileImg,*/
            imageAlt:"profile picture",

        },


    }
]

export const footerData = [
    {
        text:"You can checkout my work via github",
        iconSvgLinkedin:null,   /*LinkdinIcon,*/
        iconSvgGithub:null,    /*githubIcon,*/
        githubLink:"https://www.linkedin.com/in/ismail-burak-ozgen-0a0294241/",
        linkdinLink:"https://github.com/i-burakozgen",
    }
]
