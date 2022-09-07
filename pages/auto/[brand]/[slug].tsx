import React from "react";

import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import {
  Model,
  Version,
  VersionResponse,
  ModelResponse,
  ModelFull,
} from "../../../interfaces";

import { Layout } from "../../../components/Layouts";
import { getVersionInfo } from "../../../utils";
import { cmsApi } from "../../../components/apis";
import { Grid, Text, Row } from "@nextui-org/react";
import CarsColors from "../../../components/cars/CarsColors";
import Image from "next/image";

interface Props {
  model: ModelResponse;
}

const CarPage: NextPage<Props> = ({ model }) => {
  console.log(model);
  return (
    <Layout
      title={`${model.name} | DercoCenter - ${model.brand.name}`}
      pageDescription={model.description}
      image={model.defaultVersion.image.url}
    >
      <Grid.Container gap={2} justify="center" css={{ marginTop: "20px" }}>
        {model.colors.length > 0 && (
          <Grid xs={12} md={7}>
            <CarsColors colors={model.colors} />
          </Grid>
        )}
        <Grid xs={12} md={5}>
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
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export async function getStaticPaths() {
  const { data } = await cmsApi.get<Version[]>("/versions");

  const patchUrls = data.map((version) => ({
    slug: version.model.slug,
    brand: version.model.brandName.toLowerCase().replace(" ", "-"),
  }));

  return {
    paths: patchUrls.map((path: any) => ({
      params: { ...path },
    })),
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug, brand } = params as { slug: string; brand: string };
  console.log(params);

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
