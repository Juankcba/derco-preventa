import { Button, Container, Grid, Text, Link } from "@nextui-org/react";
import NextLink from "next/link";
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
      <Grid.Container
        gap={2}
        css={{ "@mdMin": { maxWidth: "800px", margin: "0 auto" } }}
      >
        <Grid xs={6} md={4} justify="center">
          <NextLink href="https://www.suzuki.cl" passHref>
            <Link target="_blank">
              <Image
                src={"/assets/img/brands/suzuki-white.svg"}
                alt="suzuki-logo"
                width={77}
                height={55}
                objectFit="contain"
              />
            </Link>
          </NextLink>
        </Grid>
        <Grid xs={6} md={4} justify="center">
          <NextLink href="https://www.mazda.cl" passHref>
            <Link target="_blank">
              <Image
                src={"/assets/img/brands/mazda-white.svg"}
                alt="mazda-logo"
                width={77}
                height={55}
                objectFit="contain"
              />
            </Link>
          </NextLink>
        </Grid>
        <Grid xs={6} md={4} justify="center">
          <NextLink href="https://www.renault.cl" passHref>
            <Link target="_blank">
              <Image
                src={"/assets/img/brands/renault-white.svg"}
                alt="renault-logo"
                width={77}
                height={55}
                objectFit="contain"
              />
            </Link>
          </NextLink>
        </Grid>
        <Grid xs={6} md={4} justify="center">
          <NextLink href="https://www.haval.cl" passHref>
            <Link target="_blank">
              <Image
                src={"/assets/img/brands/haval-white.svg"}
                alt="haval-logo"
                width={77}
                height={55}
                objectFit="contain"
              />
            </Link>
          </NextLink>
        </Grid>
        <Grid xs={6} md={4} justify="center">
          <NextLink href="https://www.changan.cl" passHref>
            <Link target="_blank">
              <Image
                src={"/assets/img/brands/changan-white.svg"}
                alt="changan-logo"
                width={77}
                height={55}
                objectFit="contain"
              />
            </Link>
          </NextLink>
        </Grid>
        <Grid xs={6} md={4} justify="center">
          <NextLink href="https://www.greatwall.cl" passHref>
            <Link target="_blank">
              <Image
                src={"/assets/img/brands/gwm-white.svg"}
                alt="gwm-logo"
                width={77}
                height={55}
                objectFit="contain"
              />
            </Link>
          </NextLink>
        </Grid>
        <Grid xs={12} md={12} justify="center">
          <NextLink href="https://www.jacautos.cl" passHref>
            <Link target="_blank">
              <Image
                src={"/assets/img/brands/jac-white.svg"}
                alt="jac-logo"
                width={77}
                height={55}
                objectFit="contain"
              />
            </Link>
          </NextLink>
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
