import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';

const Carousel = () => {
const settings = {
dots: true,
infinite: true,
speed: 500,
autoplay: true, 
autoplaySpeed: 3000, 
slidesToShow: 1,
slidesToScroll: 1

};

return (
<div className='carousel-container' style={{ marginTop: '20px'}}>
    <Slider {...settings}>
    <div>
        <img src="/062b3d81-fac3-4cec-843b-3e6f3f06a139.jpg" alt="Gratte-ciel en construction dans une grande ville." />
    </div>
    <div>
        <img src="/20130904_101304_20130826_123026_tour6ok.jpg" alt="Maison en briques avec charpente en bois en construction" />
    </div>
    <div>
        <img src="/ben-allan-BIeC4YK2MTA-unsplash.jpg" alt="Haut d’un immeuble en chantier avec plusieurs grues" />
    </div>
    <div>
        <img src="/building-768815_1920.webp" alt=" Immeubles en construction avec grues, vue en contre-plongée en noir et blanc" />
    </div>
    </Slider>
</div>
);
};

export default Carousel;
