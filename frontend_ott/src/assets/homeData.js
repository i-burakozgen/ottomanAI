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
        buttonTextAi:"Try Transliteration",
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
        aiText: "Use our state-of-the-art AI model to parse images and transliterate Ottoman text into modern Turkish and English preserving its rich linguistic heritage."

        },
        dictionaryData:{
            imageDark:bookDark,
            imageLight:bookLight,
            dictTextAlt:"dictonary page image",
            dictHeading:"Ottoman Dictionary",
            dictText:"Search for thousands of Ottoman words and their meanings in modern from trusted resources.",

        },
        

    }
]
export const galleryData = [
    DictScreenShot,
    ocrPic,
    mobilePic,        
]
export const aboutData = [

    {
        text:"I'am passionate full stack developer dedicated to preserving and making accessible AI and modern web technologies.",

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
