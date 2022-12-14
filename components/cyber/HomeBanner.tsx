import { Text, Button, Grid, Image } from "@nextui-org/react";
import React, { FC } from "react";
import { Box } from "../ui/Box";
import { currency } from "../../utils";

import NextImage from "next/image";

const HomeBanner = () => {
  return (
    <Grid.Container className="banner-cyber">
      <Grid
        xs={12}
        css={{
          width: "100%",
          justifyContent: "center",
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

export default HomeBanner;
