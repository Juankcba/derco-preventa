import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Container, Text } from "@nextui-org/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

const HelperSwipper = () => {
  return (
    <Container css={{ padding: "0px", width: "100%", height: "120px" }}>
      <Text>Recomendaciones para reservar tu auto</Text>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper-helper-Reserva"
      >
        <SwiperSlide>
          <div className="helper-card">
            <div className="helper-circle">1</div>
            <Text>
              Te enviaremos un correo de respaldo al finalizar el proceso de
              reserva o compra de un producto, recuerda no eliminarlo.
            </Text>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="helper-card">
            <div className="helper-circle">2</div>
            <Text>
              Si tienes dudas del proceso sobre la compra o adquisición de un
              productos no dudes en contactarte o dirigirte a la sucursarl Derco
              más cercana.
            </Text>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="helper-card">
            <div className="helper-circle">3</div>
            <Text>
              Verifica los datos para confirmar que tu reserva o compra cumplen
              con los requisitos.
            </Text>
          </div>
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

export default HelperSwipper;
