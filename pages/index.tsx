import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { cmsApi } from "../components/apis";
import { Layout } from "../components/Layouts";
import { Version, VersionResponse } from "../interfaces";
import { PropsWithChildren } from "react";

import { Grid, Card, Text, Row } from "@nextui-org/react";
import VersionCard from "../components/cars/VersionCard";

interface Props {
  versions: Version[];
}

const HomePage: NextPage<PropsWithChildren<Props>> = ({ versions }) => {
  console.log("data", versions);

  return (
    <Layout title="CiberMonday | DercoCenter">
      <Grid.Container>
        <Grid xs={12} className="content-result">
          <Grid.Container gap={2} justify="flex-start">
            {versions.map((version) => (
              <VersionCard key={version.id} version={version} />
            ))}
          </Grid.Container>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const { data } = await cmsApi.get<VersionResponse>("/versions");

  const versions: VersionResponse = data;

  return {
    props: { versions },
    revalidate: 60 * 60,
  };
}

export default HomePage;
