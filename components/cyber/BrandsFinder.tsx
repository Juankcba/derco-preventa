import { Button, Container, Grid, Text } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { DownloadIcon } from "./../ui/DownloadIcon";

const BrandsFinder = () => {
  return (
    <Container css={{ padding: "20px" }} className="banner-finder">
      <Text h1 className="title">
        ¿No encontraste lo que buscabas en el CyberDercoCenter?
      </Text>

      <Text h4 className="subtitle">
        Visita nuestras marcas para mas vehículo
      </Text>
      <Button css={{ margin: "0 auto" }}>¿Como comprar en CyberDerco?</Button>
      <Grid.Container gap={2}>
        <Grid xs={6} justify="center">
          <Image
            src={"/assets/img/brands/suzuki-white.svg"}
            alt="suzuki-logo"
            width={77}
            height={55}
            objectFit="contain"
          />
        </Grid>
        <Grid xs={6} justify="center">
          <Image
            src={"/assets/img/brands/mazda-white.svg"}
            alt="mazda-logo"
            width={77}
            height={55}
            objectFit="contain"
          />
        </Grid>
        <Grid xs={6} justify="center">
          <Image
            src={"/assets/img/brands/renault-white.svg"}
            alt="renault-logo"
            width={77}
            height={55}
            objectFit="contain"
          />
        </Grid>
        <Grid xs={6} justify="center">
          <Image
            src={"/assets/img/brands/haval-white.svg"}
            alt="haval-logo"
            width={77}
            height={55}
            objectFit="contain"
          />
        </Grid>
        <Grid xs={6} justify="center">
          <Image
            src={"/assets/img/brands/changan-white.svg"}
            alt="changan-logo"
            width={77}
            height={55}
            objectFit="contain"
          />
        </Grid>
        <Grid xs={6} justify="center">
          <Image
            src={"/assets/img/brands/gwm-white.svg"}
            alt="gwm-logo"
            width={77}
            height={55}
            objectFit="contain"
          />
        </Grid>
        <Grid xs={12} justify="center">
          <Image
            src={"/assets/img/brands/jac-white.svg"}
            alt="jac-logo"
            width={77}
            height={55}
            objectFit="contain"
          />
        </Grid>
      </Grid.Container>
      <Text h3 className="subtitle">
        ¿Quieres toda la informacion de como comprar en CyberDerco?
      </Text>
      <Button
        color="secondary"
        css={{
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          color: "$primary",
        }}
        iconRight={<DownloadIcon />}
      >
        Descargá el Instructivo
      </Button>
    </Container>
  );
};

export default BrandsFinder;
