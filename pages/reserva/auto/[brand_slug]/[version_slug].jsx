import React, { useState, useMemo, useEffect, useRef } from "react";

import { Layout, PreventaLayout } from "../../../../components/Layouts";
import { getVersionInfo, currency } from "../../../../utils";
import { cesApi, cmsApi, storeApi } from "../../../../apis";
import {
  Grid,
  Text,
  Link,
  Row,
  Card,
  Container,
  Input,
  Spacer,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import PreventaStep2 from "../../../../components/preventa/PaymentStep";
import PreventaStep3 from "../../../../components/preventa/CreditStep";
import {
  getSubsStoreInfo,
  getVersionStoreInfo,
} from "../../../../utils/getVersionStoreInfo";
import { DownloadCar } from "./../../../../components/ui/DownloadCar";

// interface Props {
//   model: Auto;
// }

const CarPage = ({ models, regions }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    user: {
      rut: "",
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
    },
    ces: "",
    financial: "",
    model: "",
  });

  const [model, setModel] = useState({});
  const [colors, setColors] = useState([]);
  const [selectedColor, setColor] = useState("");
  const [scrollChange, setScrollChange] = useState(false);
  useEffect(() => {
    if (scrollChange) {
      window?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setScrollChange(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollChange]);

  useEffect(() => {
    if (models.length > 0) {
      setModel(models[0]);
      setData({ ...data, model: models[0] });
      setColors(
        models.map((model) => ({
          color_hex: model.color_hex,
          color_id: model.color_id,
          color_name: model.color_name,
          color_slug: model.color_slug,
          stock: model.stock_availabe,
          image: model.image_url,
        }))
      );
      setColor({
        color_hex: models[0].color_hex,
        color_id: models[0].color_id,
        color_name: models[0].color_name,
        color_slug: models[0].color_slug,
        stock: model.stock_availabe,
        image: models[0].image_url,
      });
    }
  }, [models]);

  useMemo(() => {
    setScrollChange(true);
  }, [step]);

  useMemo(() => {
    const setModel = models.filter(
      (model) => model.color_id === selectedColor.color_id
    )[0];
    setData({ ...data, model: setModel });
  }, [selectedColor]);

  useMemo(() => {
    console.log("data", data);
  }, [data]);

  return (
    <PreventaLayout
      title={`${model.model_name} | DercoCenter - ${model.brand_name}`}
      image={model.image_url}
    >
      {colors?.length > 0 ? (
        <>
          <Grid.Container
            gap={2}
            justify="center"
            css={{
              padding: "16px 24px",
              "@mdMin": {
                padding: "40px 0px",
                margin: "0 auto",
                maxWidth: "1240px",
                maxHeight: step == 2 ? "689px" : "",
              },
            }}
          >
            <Grid xs={12} md={7} css={{ padding: " 30px 12px 0px " }}>
              <Grid.Container css={{ maxHeight: "625px" }}>
                <Grid xs={4}>
                  <Image
                    src={`https://dercocenter-cl-static-prod.s3.amazonaws.com/assets/brands-logos/${model.brand_slug}/logo-vertical-colors.svg`}
                    alt={model.model_name}
                    height={65}
                    width={102}
                  />
                </Grid>
                <Grid xs={8}>
                  <Row className="preventa-prices">
                    <Text className="price-primary">
                      {currency.format(model.brand_price)}*
                    </Text>
                    <Text className="price-before">
                      Antes <span>{currency.format(model.list_price)}</span>
                    </Text>
                    <Text className="price-bonos">
                      Bono cyber: {currency.format(model.brand_price)}
                    </Text>
                    <Text className="price-bonos">
                      Bono financiamiento: {currency.format(model.brand_price)}
                    </Text>
                  </Row>
                </Grid>
                <Grid xs={12}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={selectedColor.image}
                      objectFit="contain"
                      objectPosition="center"
                      width={649}
                      height={360}
                      alt={selectedColor.name}
                    />
                  </div>
                </Grid>

                <Grid
                  xs={12}
                  justify="flex-end"
                  css={{ flexDirection: "column" }}
                >
                  <Text
                    className="preventa-disclaimer"
                    css={{ textAlign: "end" }}
                  >
                    *Modelo en imagen corresponde a {model.brand_name}{" "}
                    {model.model_name}
                  </Text>
                  {step == 1 && (
                    <div>
                      <Button
                        light
                        css={{ marginLeft: "auto" }}
                        iconRight={<DownloadCar />}
                        className="btn-primary-outline big wauto"
                      >
                        Descargar Ficha técnica
                      </Button>
                    </div>
                  )}
                </Grid>
              </Grid.Container>
            </Grid>

            <Grid xs={12} md={5}>
              {step == 1 && (
                <PreventaStep3
                  model={model}
                  setStep={setStep}
                  setData={setData}
                  setColor={setColor}
                  colors={colors}
                  data={data}
                  regions={regions}
                />
              )}
              {step == 2 && (
                <>
                  <PreventaStep2
                    model={model}
                    setStep={setStep}
                    setData={setData}
                    data={data}
                    style={{ position: "absolute", top: 0, rigth: 0 }}
                  />
                </>
              )}
              {step == 3 && (
                <Row css={{ justifyContent: "center", display: "flex" }}>
                  <Text>No stock</Text>
                  <Button onPress={() => setStep(1)}>
                    Volver a seleccionar Color
                  </Button>
                </Row>
              )}
            </Grid>
          </Grid.Container>
          {step == 2 && (
            <Container
              css={{
                backgroundColor: "#EBEBEB",
                width: "100%",
                minHeight: "311px",
                padding: 0,
                margin: 0,
                maxWidth: "100%",
              }}
            >
              <Grid.Container
                css={{
                  padding: "16px 24px",
                  "@mdMin": {
                    padding: "40px 0px",
                    margin: "0 auto",
                    maxWidth: "1240px",
                  },
                }}
              >
                <Grid
                  xs={12}
                  md={7}
                  css={{ display: "flex", flexDirection: "column" }}
                  className="disclaimer-form"
                >
                  <Text h4 className="title">
                    Al llenar el formulario precedente, usted:
                  </Text>
                  <Text h6 className="subtitle">
                    1. Acepta ser contactado por Derco Chile S.A. y/o sus
                    sociedades relacionadas,red de concesionarios y/o Sociedad
                    de Créditos Automotrices S.A, para recibir información
                    relacionada a esta a través de medios electrónicos y/o de
                    forma telefónica, entre otros, conforme a la política de
                    privacidad de este sitio web.
                  </Text>
                  <Text h6 className="subtitle">
                    2. Autoriza expresamente a Derco Chile S.A. y/o sus
                    sociedades relacionadas,red de concesionarios y/o Sociedad
                    de Créditos Automotrices S.A y a las terceras entidades
                    financieras a las que ésta información les sea enviada, para
                    utilizar, almacenar y tratar la misma y verificar sus datos
                    personales y comportamiento financiero, cuando corresponda,
                    sea en DICOM u otra base de datos necesarios para lograr
                    una.
                  </Text>

                  <Text h6 className="subtitle">
                    3. Los datos proporcionados por el usuario serán utilizados
                    por Derco Chile S.A. y/o sus sociedades relacionadas,red de
                    concesionarios y/o Sociedad de Créditos Automotrices S.A
                    únicamente con la finalidad de que pueda comunicar éstos a
                    las distintas entidades financieras que podrían otorgar un
                    crédito automotriz al usuario.
                  </Text>
                </Grid>
              </Grid.Container>
            </Container>
          )}
        </>
      ) : (
        <Grid.Container>
          <Grid
            xs={12}
            md={5}
            justify={"flex-start"}
            css={{ flexDirection: "column" }}
          >
            <Text h1>Este Auto no tiene stock</Text>
            <NextLink href="/" passHref>
              <Link>Volver al Inicio</Link>
            </NextLink>
          </Grid>
        </Grid.Container>
      )}
    </PreventaLayout>
  );
};

export async function getStaticPaths() {
  const {
    data: { autos },
  } = await storeApi.get(
    `/pre-order/cyber-dc/${process.env.NEXT_PUBLIC_PREVENTA}/cars`
  );

  const patchUrls = autos.map((version) => ({
    version_slug: version.version_slug,
    brand_slug: version.brand_slug,
  }));

  console.log(patchUrls);

  return {
    paths: patchUrls.map((path) => ({
      params: { ...path },
    })),
    // { fallback: false } means other routes should 404
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps = async ({ params }) => {
  const { version_slug, brand_slug } = params;

  const models = await getVersionStoreInfo(version_slug);

  const { status, data } = await getSubsStoreInfo(
    `subsidiaries?brand_slug=${brand_slug}&services=venta`
  );
  let regions = [];
  if (status == 200) {
    regions = data;
  }

  if (!models) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    // Passed to the page component as props
    props: { models, regions },
    revalidate: 1,
  };
};

export default CarPage;
