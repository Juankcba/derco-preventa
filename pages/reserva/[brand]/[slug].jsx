import React, { useState, useMemo, useEffect } from "react";

import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import {
  Model,
  Version,
  VersionResponse,
  ModelResponse,
  ModelFull,
} from "../../../interfaces";

import { Layout } from "../../../components/Layouts";
import { getVersionInfo, currency } from "../../../utils";
import { cmsApi } from "../../../apis";
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
import CarsColors from "../../../components/cars/CarsColors";
import Image from "next/image";
import CarsColorsPreventa from "../../../components/cars/CarsColorsPreventa";
import NextLink from "next/link";
import { IPUser } from "../../../interfaces/user";

import PreventaStep1 from "../../../components/preventa/step1";
import PreventaStep2 from "../../../components/preventa/step2";
import PreventaStep3 from "../../../components/preventa/step3";

// interface Props {
//   model: ModelResponse;
// }

const CarPage = ({ model }) => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState({
    rut: "",
    name: "",
    lastname: "",
    phone: "",
    email: "",
  });

  const [selectedColor, setColor] = useState("");

  return (
    <Layout
      title={`${model.name} | DercoCenter - ${model.brand.name}`}
      pageDescription={model.description}
      image={model.defaultVersion.imageUrl}
    >
      <Grid.Container gap={2} justify="center" css={{ marginTop: "20px" }}>
        {model.colors.length > 0 && (
          <Grid xs={12}>
            <Card css={{ w: "100%", h: "100%" }}>
              <Card.Header>
                <Row gap={2} css={{ maxHeight: "120px" }}>
                  <Image
                    src={`https://dercocenter-cl-static-prod.s3.amazonaws.com/assets/brands-logos/${model.brand.slug}/logo-vertical-colors.svg`}
                    alt={model.name}
                    height={65}
                    width={102}
                  />
                  <Text h1 css={{ paddingLeft: "16px" }}>
                    {model.name}
                  </Text>
                </Row>
              </Card.Header>
              <Card.Body>
                <Grid.Container css={{ w: "100%", h: "100%" }}>
                  <Grid xs={12} sm={6}>
                    <CarsColorsPreventa
                      colors={model.colors}
                      setColor={setColor}
                    />
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
        )}
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
    </Layout>
  );
};

export async function getStaticPaths() {
  const { data } = await cmsApi.get("/versions");

  const patchUrls = data.map((version) => ({
    slug: version.model.slug,
    brand: version.model.brandName.toLowerCase().replace(" ", "-"),
  }));

  return {
    paths: patchUrls.map((path) => ({
      params: { ...path },
    })),
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps = async ({ params }) => {
  const { slug, brand } = params;

  const model = await getVersionInfo(`/models/brand/${brand}/slug/${slug}`);

  if (!model) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    // Passed to the page component as props
    props: { model },
    revalidate: 86400,
  };
};

export default CarPage;
