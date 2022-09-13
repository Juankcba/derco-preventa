import { Card, Container, Text, Button, Row } from "@nextui-org/react";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

const BannerDream = () => {
  const [slides, setSlides] = useState([
    {
      image: "adventure",
      title: "¿Sos Aventurero?",
      description:
        "Los mejores todo terreno estan con descuento en Derco Center.",
      id: 1,
    },
    {
      image: "mantenciones",
      title: "Pack Mantenciones",
      description:
        "Compra todas tus mantenciones para Citycar a un precio especial.",
      id: 2,
    },
    {
      image: "family",
      title: "El auto Familiar",
      description:
        "Quieres comodidad, potencia y estilo, estas buscando un SUV.",
      id: 3,
    },
    {
      image: "suv",
      title: "Mantenciones SUV",
      description:
        "Cubre todas las mantenciones de tu vehículo con esta promoción,",
      id: 4,
    },
  ]);
  return (
    <Container css={{ padding: "20px" }} className="dreams-section">
      <Text h1 className="title">
        ¡Movemos tus sueños!
      </Text>
      <Text h4 className="subtitle">
        Beneficios pensados exclusivamente para ti
      </Text>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
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
            <Card>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  src={`/assets/img/post/${slide.image}.png`}
                  alt={slide.title}
                  objectFit="cover"
                  width="100%"
                  height={172}
                />
              </Card.Body>

              <Card.Footer
                css={{ justifyContent: "flex-start", flexDirection: "column" }}
              >
                <Text b className="title" css={{ width: "100%" }}>
                  {slide.title}
                </Text>
                <Text className="description" css={{ width: "100%" }}>
                  {slide.description}
                </Text>

                <Button css={{ marginTop: "24px" }}>Ver</Button>
              </Card.Footer>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default BannerDream;
