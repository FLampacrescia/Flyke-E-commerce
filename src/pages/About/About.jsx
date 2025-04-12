import "./About.css";
import SmallTextGroup from "../../components/About/SmallTextGroup/SmallTextGroup";
import SocialIcons from "../../components/Common/SocialIcons/SocialIcons";
import MainTitle from "../../components/Common/MainTitle/MainTitle";
import AboutImg from "../../assets/about1.jpg";
import { useTranslation } from '../../hooks/useTranslations';


export default function About() {

    const { t } = useTranslation();

    return (
        <>
        <section className="about-container">
            <div className="about-text-main-container">
                <MainTitle classAddContainer="about-title-container" classAdd="about-title" text={t('about_page_main_title')} spanText={t('about_page_main_title_gray')}/>
                <div className="about-description-column-container">
                    <SmallTextGroup />
                    <SocialIcons type="social-container" type2="social-logo-container" type3="social-logo"/>
                </div>
            </div>
            <div className="about-img-container">
                <img className="about-img" src={AboutImg} alt="Nike About Photo" />
            </div>
        </section>
        </>
    )
}