import { Text, Button, Grid } from "@nextui-org/react";
import React from "react";
import { Box } from "../ui/Box";
import { currency } from "../../utils";
import { FC } from "react";
import Image from "next/image";

const BannerHome: FC = () => {
  return (
    <Grid.Container>
      <Grid
        md={6}
        css={{
          flexDirection: "column",
          "@mdMax": {
            display: "none",
          },
        }}
      >
        <Text h1 css={{ color: "white", textAlign: "left" }}>CyberDerco</Text>
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
          <Image
            src="/assets/img/cyber/coin.svg"
            height={64}
            width={64}
            alt="cyber-coin"
          />
          <Image
            src="/assets/img/cyber/cyber.svg"
            height={70}
            width={205}
            alt="cyber-url"
            style={{ marginLeft: "16px" }}
          />
        </div>
      </Grid>
      <Grid
        css={{
          "@mdMin": {
            display: "none",
          },
        }}
      >
        <Text css={{ color: "white", textAlign: "center" }}>
          ¡Del 3 al 5 de Octubre!
        </Text>
      </Grid>
    </Grid.Container>
  );
};

export default BannerHome;
