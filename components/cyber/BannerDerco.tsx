import { Container, Text, Link, Button } from "@nextui-org/react";
import React from "react";
import NextLink from "next/link";
import Image from "next/image";
import DividerComponent from "./../ui/DividerComponent";

const BannerDerco = () => {
  return (
    <Container css={{ padding: "20px" }} className="banner-derco-section">
      <Image
        src="/assets/img/derco-big.svg"
        alt="derco-logo"
        height={70}
        width={368}
      />
      <Text h3 className="title">
        ¿No encontraste lo que buscabas?
      </Text>
      <Text h3 className="subtitle">
        Probá en
      </Text>
      <NextLink href="https://www.dercocenter.cl/" passHref>
        <Link css={{ width: "100%", margin: "16px auto" }}>
          <Button className="btn-primary big ">Dercocenter.cl</Button>
        </Link>
      </NextLink>
      <DividerComponent />
    </Container>
  );
};

export default BannerDerco;
