import "./About.css";
import SmallTextGroup from "../../components/Common/SmallTextGroup/SmallTextGroup";
import SocialIcons from "../../components/Common/SocialIcons/SocialIcons";
import MainTitle from "../../components/Common/MainTitle/MainTitle";
import AboutImg from "../../assets/about1.jpg";


export default function About() {
    return (
        <>
        <section className="about-container">
            <div className="about-text-main-container">
                <MainTitle classAddContainer="about-title-container" classAdd="about-title" text="HACELO POSIBLE." spanText=" NOSOTROS PONEMOS LAS ZAPATILLAS."/>
                <div className="description-column-container">
                    <SmallTextGroup />
                    <SocialIcons type="social-container" type2="social-logo-container" type3="social-logo"/>
                </div>
            </div>
            <div className="img-container">
                <img className="about-img" src={AboutImg} alt="Nike About Photo" />
            </div>
        </section>
        </>
    )
}