import React from "react";
import { Container, Grid, Row, Text, Link, Button } from "@nextui-org/react";
import Image from "next/image";
import DividerComponent from "./DividerComponent";
import { Box } from "./Box";
import NextLink from "next/link";
import { DownloadIcon } from "./DownloadIcon";
const StepsToBuy = () => {
  return (
    <Container css={{ padding: "20px" }} className="banner-steps-section">
      <Text h3 className="title">
        Pasos para comprar
      </Text>
      <Grid.Container
        css={{
          "@mdMin": {
            maxW: "900px",
            margin: "0 auto",
          },
        }}
      >
        <Grid
          xs={12}
          md={3}
          css={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <Row
            css={{
              w: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <Image
              src="/assets/img/cyber/step-1.svg"
              alt="step-1"
              width={64}
              height={64}
              objectPosition="center"
            />
          </Row>
          <Row css={{ w: "100%", display: "flex", justifyContent: "center" }}>
            <Text className="box-title">1</Text>
            <Text className="box-subtitle">
              Selecciona un vehículo o mantención.
            </Text>
          </Row>
        </Grid>
        <Grid
          xs={12}
          md={3}
          css={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <Row
            css={{
              w: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <Image
              src="/assets/img/cyber/step-2.svg"
              alt="step-1"
              width={64}
              height={64}
              objectPosition="center"
            />
          </Row>
          <Row css={{ w: "100%", display: "flex", justifyContent: "center" }}>
            <Text className="box-title">2</Text>
            <Text className="box-subtitle">
              Verifica los datos seleccionados.
            </Text>
          </Row>
        </Grid>
        <Grid
          xs={12}
          md={3}
          css={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <Row
            css={{
              w: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <Image
              src="/assets/img/cyber/step-3.svg"
              alt="step-1"
              width={64}
              height={64}
              objectPosition="center"
            />
          </Row>
          <Row css={{ w: "100%", display: "flex", justifyContent: "center" }}>
            <Text className="box-title">3</Text>
            <Text className="box-subtitle">Ingresa tus datos de contacto.</Text>
          </Row>
        </Grid>
        <Grid
          xs={12}
          md={3}
          css={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <Row
            css={{
              w: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <Image
              src="/assets/img/cyber/step-4.svg"
              alt="step-1"
              width={64}
              height={64}
              objectPosition="center"
            />
          </Row>
          <Row css={{ w: "100%", display: "flex", justifyContent: "center" }}>
            <Text className="box-title">4</Text>
            <Text className="box-subtitle">Realiza el pago en Transbank.</Text>
          </Row>
        </Grid>
        <Grid xs={12}>
          <Text h4 className="footer-title">
            <span>¡Todo listo!</span> Te enviaremos un correo con toda la
            información.
          </Text>
        </Grid>
      </Grid.Container>
      <DividerComponent />
      <Grid.Container
        css={{
          "@mdMin": {
            maxW: "900px",
            margin: "0 auto",
          },
        }}
      >
        <Grid xs={12}>
          <Row
            css={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignContent: "center",
            }}
          >
            <Text h3 className="footer-info">
              ¿Quieres toda la informacion de como comprar en CyberDerco?
            </Text>

            <NextLink href="#">
              <Link css={{ width: "100%", margin: "16px auto" }}>
                <Button
                  color="secondary"
                  css={{
                    margin: "0 auto",

                    minHeight: "48px",
                    display: "flex",
                    justifyContent: "space-between",
                    color: "$primary",
                  }}
                  iconRight={<DownloadIcon />}
                >
                  Descargá el Instructivo
                </Button>
              </Link>
            </NextLink>
          </Row>
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default StepsToBuy;
