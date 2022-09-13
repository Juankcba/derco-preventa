import { Text, Button, Grid, Image } from "@nextui-org/react";
import React, { FC } from "react";
import { Box } from "../ui/Box";
import { currency } from "../../utils";

import NextImage from "next/image";

const BannerHome = () => {
  return (
    <Grid.Container className="banner-cyber">
      <Grid
        md={6}
        css={{
          flexDirection: "column",
          "@mdMax": {
            display: "none",
          },
        }}
      >
        <Text h1 css={{ color: "white", textAlign: "left" }}>
          CyberDerco
        </Text>
        <Text h3 css={{ color: "white", textAlign: "left" }}>
          Nuestro sueño es que vos encuentres el tuyo
        </Text>
      </Grid>
      <Grid
        xs={12}
        md={6}
        css={{
          "@mdMax": {
            width: "100%",
            justifyContent: "flex-end",
          },
        }}
      >
        <div className="cyber-logos">
          <NextImage
            src="/assets/img/cyber/coin.svg"
            height={64}
            width={64}
            alt="cyber-coin"
          />
          <NextImage
            src="/assets/img/cyber/cyber.svg"
            height={70}
            width={205}
            alt="cyber-url"
            style={{ marginLeft: "16px" }}
          />
        </div>
      </Grid>
    </Grid.Container>
  );
};

export default BannerHome;
