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
          image: model.image_url,
        }))
      );
    }
  }, [models]);

  console.log("colors", colors);

  return (
    <PreventaLayout
      title={`${model.model_name} | DercoCenter - ${model.brand_name}`}
      image={model.image_url}
    >
      <Grid.Container gap={2} justify="center" css={{ marginTop: "20px" }}>
        {colors?.length > 0 ? (
          <Grid xs={12}>
            <Card css={{ w: "100%", h: "100%" }}>
              <Card.Header>
                <Row gap={2} css={{ maxHeight: "120px" }}>
                  <Image
                    src={`https://dercocenter-cl-static-prod.s3.amazonaws.com/assets/brands-logos/${model.brand_slug}/logo-vertical-colors.svg`}
                    alt={model.model_name}
                    height={65}
                    width={102}
                  />
                  <Text h1 css={{ paddingLeft: "16px" }}>
                    {model.model_name}
                  </Text>
                </Row>
              </Card.Header>
              <Card.Body>
                <Grid.Container css={{ w: "100%", h: "100%" }}>
                  <Grid xs={12} sm={6}>
                    <CarsColorsPreventa colors={colors} setColor={setColor} />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    {step == 1 && (
                      <PreventaStep1
                        model={model}
                        setStep={setStep}
                        setUser={setUser}
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
                    {step == 3 && (
                      <PreventaStep3
                        model={model}
                        setStep={setStep}
                        setUser={setUser}
                        user={user}
                        selectedColor={selectedColor}
                      />
                    )}
                  </Grid>
                </Grid.Container>
              </Card.Body>
              <Card.Footer>Footer</Card.Footer>
            </Card>
          </Grid>
        ) : (
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
        )}
      </Grid.Container>
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

  const models = await getVersionStoreInfo(`A2L412FSH`);

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
    revalidate: 60,
  };
};

export default CarPage;
