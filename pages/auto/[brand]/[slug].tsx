import React from "react";

import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import {
  Model,
  Version,
  VersionResponse,
  ModelFull,
} from "../../../interfaces";

import { Layout } from "../../../components/Layouts";
import { getVersionInfo } from "../../../utils";
import { cmsApi } from "../../../components/apis";

interface Props {
  model: Model;
}

const CarPage: NextPage<Props> = ({ model }) => {
  return (
    <Layout title="Ficha">
      <h1>Ficha {model.name}</h1>
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
