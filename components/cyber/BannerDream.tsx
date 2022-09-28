import { Card, Container, Text, Button, Row } from "@nextui-org/react";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import { useRouter } from "next/router";

const BannerDream = () => {
  const router = useRouter();
  const [slides, setSlides] = useState([
    {
      image: "adventure",
      title: "¿Sos Aventurero?",
      description:
        "Los mejores todo terreno estan con descuento en Derco Center.",
      id: 1,
      buttonId: "cyber22-cta-home-todoterreno",
      filter: [{ card: false, categories: "Camioneta" }],
    },
    {
      image: "0km",
      title: "¡Cuida tu 0km!",
      description:
        "Has tu primer mantención en el mejor lugar, en Derco Center.",
      id: 2,
      buttonId: "cyber22-cta-home-mantenciones",
      filter: [{ card: true, mantencion: "10000" }],
    },
    {
      image: "family",
      title: "Ideal para familias",
      description:
        "Te mostramos los autos perfectos para llevar a tus seres queridos.",
      id: 3,
      buttonId: "cyber22-cta-home-familiar",
      filter: [{ card: false, categories: ["Camioneta", "SUV"] }],
    },
    {
      image: "travel",
      title: "¿Viajar mas lejos y...",
      description:
        "Consumir menos combustible? Estos autos son perfectos para ti.",
      id: 4,
      buttonId: "cyber22-cta-home-economico",
      filter: [{ card: false, brands: "Haval" }],
    },
  ]);
  const handleFilter = (filter: any) => {
    console.log(filter);
    router.push({
      pathname: "/",
      query: {
        ...filter[0],
      },
    });
  };
  return (
    <Container css={{ padding: "20px" }} className="dreams-section">
      <Text h2 className="title">
        ¡Movemos tus sueños!
      </Text>
      <Text h4 className="subtitle">
        Beneficios pensados exclusivamente para ti
      </Text>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination]}
        className="mySwiper-home-dreams"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="card-post">
            <Card css={{ minHeight: "100%" }}>
              <Card.Body css={{ p: 0, maxHeight: "223px" }}>
                <Card.Image
                  src={`/assets/img/post/${slide.image}.png`}
                  alt={slide.title}
                  objectFit="cover"
                  width="100%"
                  height={223}
                />
              </Card.Body>

              <Card.Footer
                css={{
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Text b className="title" css={{ width: "100%" }}>
                  {slide.title}
                </Text>
                <Text className="description" css={{ width: "100%" }}>
                  {slide.description}
                </Text>

                <Button
                  onPress={() => handleFilter(slide.filter)}
                  css={{ marginTop: "24px", width: "100%" }}
                  id={slide.buttonId}
                >
                  Ver
                </Button>
              </Card.Footer>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default BannerDream;
