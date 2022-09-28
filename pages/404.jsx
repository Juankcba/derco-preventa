import { Grid, Link, Text, Row, Button } from "@nextui-org/react";
import React, { useContext } from "react";
import { Layout, LayoutWhite } from "../components/Layouts";
import NextLink from "next/link";
import { UiContext } from "../context";
import Image from "next/image";
export default function Custom404() {
  return (
    <LayoutWhite title="404 - Página no encontrada | DercoCenter">
      <Grid.Container>
        <Grid
          xs={12}
          md={6}
          justify="center"
          css={{
            width: "100%",
            height: "100%",
            margin: "auto",
          }}
        >
          <Row
            className="error-ups"
            css={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              margin: "auto",
              maxWidth: "500px",
            }}
          >
            <Text h1>Uups!</Text>
            <Text h5>
              Lo sentimos la pagina a la que intentas acceder no se encuentra.
            </Text>
            <Text h6>
              Código de error: <span>404</span>
            </Text>
            <NextLink href="/" passHref>
              <Link>
                <Button
                  auto
                  css={{ width: "100%" }}
                  className="btn-primary big"
                >
                  Volver al inicio
                </Button>
              </Link>
            </NextLink>
          </Row>
        </Grid>
        <Grid xs={12} md={6}>
          <Image
            src={"/assets/img/file-error.svg"}
            alt="file-error"
            width={819}
            height={546}
          />
        </Grid>
      </Grid.Container>
    </LayoutWhite>
  );
}
