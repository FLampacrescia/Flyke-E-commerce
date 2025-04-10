import "./HomeBanner.css";
import HeroImg1 from '../../../assets/Banner 2.jpg';
import HeroImg2 from '../../../assets/bannerMob.png';

export default function HomeBanner() {
    return (
        <section className="section-banner">
            <img className="hero-img img-lg" src={HeroImg1} alt="" />
            <img className="hero-img img-sm" src={HeroImg2} alt="" />
            <div className="hero-text-container">
                <p className="hero-description">Air Jordan 4 Retro</p>
                <h2 className="hero-title">Conseguí las nuevas zapatillas.</h2>
                <a className="hero-btn" href="#gallery">
                    Comprar
                </a>
            </div>
        </section>

    )
}
