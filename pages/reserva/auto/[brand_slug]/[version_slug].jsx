import React, { useState, useMemo, useEffect } from "react";

import { Layout, PreventaLayout } from "../../../../components/Layouts";
import { getVersionInfo, currency } from "../../../../utils";
import { cmsApi, storeApi } from "../../../../apis";
import {
  Grid,
  Text,
  Link,
  Row,
  Card,
  Input,
  Spacer,
  Button,
} from "@nextui-org/react";
import CarsColors from "../../../../components/cars/CarsColors";
import Image from "next/image";
import CarsColorsPreventa from "../../../../components/cars/CarsColorsPreventa";
import NextLink from "next/link";

import PreventaStep1 from "../../../../components/preventa/step1";
import PreventaStep2 from "../../../../components/preventa/step2";
import PreventaStep3 from "../../../../components/preventa/step3";
import { getVersionStoreInfo } from "../../../../utils/getVersionStoreInfo";

// interface Props {
//   model: Auto;
// }

const CarPage = ({ models }) => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState({
    rut: "",
    name: "",
    lastname: "",
    phone: "",
    email: "",
  });

  const [model, setModel] = useState({});
  const [colors, setColors] = useState([]);
  const [selectedColor, setColor] = useState("");

  useEffect(() => {
    if (models.length > 0) {
      setModel(models[0]);
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

  console.log("colors", selectedColor);

  return (
    <PreventaLayout
      title={`${model.model_name} | DercoCenter - ${model.brand_name}`}
      image={model.image_url}
    >
      {colors?.length > 0 ? (
        <Grid.Container
          gap={2}
          justify="center"
          css={{
            padding: "16px 24px",
            "@mdMin": {
              padding: "40px 0px",
              margin: "0 auto",
              maxWidth: "1240px",
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
                <div>
                  <Button css={{ marginLeft: "auto" }}>
                    Descargar Ficha técnica
                  </Button>
                </div>
              </Grid>
            </Grid.Container>
          </Grid>

          <Grid xs={12} md={5}>
            {step == 1 && (
              <PreventaStep3
                model={model}
                setStep={setStep}
                setUser={setUser}
                setColor={setColor}
                colors={colors}
                user={user}
              />
            )}

            {step == 2 && (
              <PreventaStep2
                model={model}
                setStep={setStep}
                setUser={setUser}
                user={user}
              />
            )}
          </Grid>
        </Grid.Container>
      ) : (
        <Grid.Container>
          <Grid
            xs={12}
            md={5}
            justify={"flex-start"}
            css={{ flexDirection: "column" }}
          >
            <Text h1>Este Auto no tiene Colores activados</Text>
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
    props: { models },
    revalidate: 1,
  };
};

export default CarPage;
