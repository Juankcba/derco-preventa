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
          maxW: "264px",
          margin: "0 auto",
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
            "@mdMin": {
              flexDirection: "column",
              alignContent: "center",
            },
          }}
        >
          <Row
            css={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
              w: "33%",
              "@mdMin": { w: "100%" },
            }}
          >
            <Text
              className="box-title mobile"
              css={{
                "@mdMin": { display: "none" },
              }}
            >
              1
            </Text>
            <Image
              src="/assets/img/cyber/step-1.svg"
              alt="step-1"
              width={64}
              height={64}
              objectPosition="center"
            />
          </Row>
          <Row
            css={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "64px",
              w: "66%",
              "@mdMin": { w: "100%", justifyContent: "center" },
            }}
          >
            <Text className="box-title" css={{ "@mdMax": { display: "none" } }}>
              1
            </Text>
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
            "@mdMin": {
              flexDirection: "column",
              alignContent: "center",
            },
          }}
        >
          <Row
            css={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
              w: "33%",
              "@mdMin": { w: "100%" },
            }}
          >
            <Text
              className="box-title mobile"
              css={{
                "@mdMin": { display: "none" },
              }}
            >
              2
            </Text>
            <Image
              src="/assets/img/cyber/step-2.svg"
              alt="step-1"
              width={64}
              height={64}
              objectPosition="center"
            />
          </Row>
          <Row
            css={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "64px",
              w: "66%",
              "@mdMin": { w: "100%", justifyContent: "center" },
            }}
          >
            <Text className="box-title" css={{ "@mdMax": { display: "none" } }}>
              2
            </Text>
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
            "@mdMin": {
              flexDirection: "column",
              alignContent: "center",
            },
          }}
        >
          <Row
            css={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
              w: "33%",
              "@mdMin": { w: "100%" },
            }}
          >
            <Text
              className="box-title mobile"
              css={{
                "@mdMin": { display: "none" },
              }}
            >
              3
            </Text>
            <Image
              src="/assets/img/cyber/step-3.svg"
              alt="step-1"
              width={64}
              height={64}
              objectPosition="center"
            />
          </Row>
          <Row
            css={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "64px",
              w: "66%",
              "@mdMin": { w: "100%", justifyContent: "center" },
            }}
          >
            <Text className="box-title" css={{ "@mdMax": { display: "none" } }}>
              3
            </Text>
            <Text className="box-subtitle">Ingresa tus datos de contacto.</Text>
          </Row>
        </Grid>
        <Grid
          xs={12}
          md={3}
          css={{
            display: "flex",
            justifyContent: "center",
            "@mdMin": {
              flexDirection: "column",
              alignContent: "center",
            },
          }}
        >
          <Row
            css={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
              w: "33%",
              "@mdMin": { w: "100%" },
            }}
          >
            <Text
              className="box-title mobile"
              css={{
                "@mdMin": { display: "none" },
              }}
            >
              4
            </Text>
            <Image
              src="/assets/img/cyber/step-4.svg"
              alt="step-1"
              width={64}
              height={64}
              objectPosition="center"
            />
          </Row>
          <Row
            css={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "64px",
              w: "66%",
              "@mdMin": { w: "100%", justifyContent: "center" },
            }}
          >
            <Text className="box-title" css={{ "@mdMax": { display: "none" } }}>
              4
            </Text>
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

            <NextLink
              passHref
              href="https://s3.amazonaws.com/dercocenter.cl/cyber/legals/pregunta-frecuentes-promocion-cyber-dercocenter-220926.pdf"
            >
              <Link
                target="_blank"
                css={{
                  minWidth: "312px",
                  maxWidth: "312px",
                  margin: "16px auto",
                }}
              >
                <Button
                  color="secondary"
                  css={{
                    margin: "0 auto",

                    minHeight: "48px",
                    display: "flex",
                    justifyContent: "space-between",
                    color: "$primary",
                    "@mdMax": { minWidth: "100%", justifyContent: "center" },
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
