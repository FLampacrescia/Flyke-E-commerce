import "./About.css";
import SmallTextGroup from "../../components/About/SmallTextGroup/SmallTextGroup";
import SocialIcons from "../../components/Common/SocialIcons/SocialIcons";
import MainTitle from "../../components/Common/Titles/MainTitle/MainTitle";
import AboutImg from "../../assets/about1.jpg";
import { useTranslation } from '../../hooks/useTranslations';
import { motion } from "framer-motion";

export default function About() {

    const { t } = useTranslation();

    return (
        <>
        <section className="about-container">
            <motion.div
                className="about-text-main-container"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <MainTitle
                    classAddContainer="about-title-container"
                    classAdd="about-title"
                    text={t('about_page_main_title')}
                    spanText={t('about_page_main_title_gray')}
                />
                    <div className="about-description-column-container">
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                        >
                            <SmallTextGroup />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                        >
                            <SocialIcons
                                type="social-container"
                                type2="social-logo-container"
                                type3="social-logo"
                            />
                        </motion.div>
                </div>
                </motion.div>
                <motion.div
                    className="about-img-container"
                    initial={{
                        clipPath: "inset(50% 0% 50% 0%)",
                        opacity: 0,
                        scale: 1.04,
                    }}
                    animate={{
                        clipPath: "inset(0% 0% 0% 0%)",
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{
                        duration: 1,
                        ease: [.6,.05,.55,1],
                        delay: 0.1,
                    }}
                >
                    <img className="about-img" src={AboutImg} alt="Nike About Photo" />
                </motion.div>
        </section>
        </>
    )
}