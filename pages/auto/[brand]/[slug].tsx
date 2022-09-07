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
import { Grid, Text } from "@nextui-org/react";
import CarsColors from "../../../components/cars/CarsColors";

interface Props {
  model: ModelResponse;
}

const CarPage: NextPage<Props> = ({ model }) => {
  console.log(model);
  return (
    <Layout
      title={`${model.name} | DercoCenter - ${model.brand.name}`}
      pageDescription={model.description}
    >
      <Grid.Container css={{ marginTop: "20px" }}>
        <Grid xs={12} sm={6} css={{ gap: "16px" }}>
          {model.colors.length > 0 && <CarsColors colors={model.colors} />}
          <Text h1>{model.name}</Text>
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
