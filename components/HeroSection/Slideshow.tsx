import Image from "next/image";

import TextButton from "../Buttons/TextButton";
import styles from "./Hero.module.css";

// swiperjs
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

const sliders = [
  {
    id: 1,
    image: "/bg-img/curly_hair_girl-1.jpg",
    imageTablet: "/bg-img/curly_hair_girl-1-tablet.png",
    imageMobile: "/bg-img/curly_hair_girl-1_mobile.jpg",
    subtitle: "Até 50% de desconto",
    titleUp: "Novos Vestidos",
    titleDown: "de Festa",
    rightText: false,
  },
  {
    id: 2,
    image: "/bg-img/curly_hair_white-1.jpg",
    imageTablet: "/bg-img/curly_hair_white-1-tablet.png",
    imageMobile: "/bg-img/curly_hair_white-1_mobile.jpg",
    subtitle: "Coleção Primavera",
    titleUp: "Noites de Verão",
    titleDown: "Elegantes",
    rightText: true,
  },
  {
    id: 3,
    image: "/bg-img/monigote.jpg",
    imageTablet: "/bg-img/monigote-tablet.png",
    imageMobile: "/bg-img/monigote_mobile.jpg",
    subtitle: "Promoções Especiais",
    titleUp: "Fins de Semana",
    titleDown: "Imperdíveis",
    rightText: false,
  },
];

const Slideshow = () => {
  return (
    <>
      <div className="relative -top-20 slide-container w-full z-20">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={true}
          pagination={{
            clickable: true,
            type: "fraction",
            dynamicBullets: true,
          }}
          className="mySwiper"
        >
          {sliders.map((slider) => (
            <SwiperSlide key={slider.id}>
              {/* Desktop */}
              <div className="hidden lg:block">
                <Image
                  layout="responsive"
                  src={slider.image}
                  width={1144}
                  height={572}
                  alt="Imagem promocional BFashion"
                />
              </div>

              {/* Tablet */}
              <div className="hidden sm:block lg:hidden">
                <Image
                  layout="responsive"
                  src={slider.imageTablet}
                  width={820}
                  height={720}
                  alt="Imagem promocional BFashion"
                />
              </div>

              {/* Mobile */}
              <div className="sm:hidden">
                <Image
                  layout="responsive"
                  src={slider.imageMobile}
                  width={428}
                  height={800}
                  alt="Imagem promocional BFashion"
                />
              </div>

              <div
                className={
                  slider.rightText
                    ? styles.rightTextSection
                    : styles.leftTextSection
                }
              >
                <span className={styles.subtitle}>
                  {slider.subtitle}
                </span>

                <span
                  className={`${styles.title} text-center ${
                    slider.rightText ? "sm:text-right" : "sm:text-left"
                  }`}
                >
                  {slider.titleUp}
                  <br />
                  {slider.titleDown}
                </span>

                <TextButton value="Comprar agora" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Slideshow;
