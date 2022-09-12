import { useEffect, useMemo } from "react";
import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { cmsApi } from "../apis";
import { Layout } from "../components/Layouts";
import { Version, VersionResponse } from "../interfaces";
import { PropsWithChildren, useState } from "react";

import { Grid, Card, Text, Row } from "@nextui-org/react";
import VersionCard from "../components/cars/VersionCard";
import Filters from "../components/ui/Filters";
import BannerHome from "../components/cyber/bannerHome";
import ListProducts from "../components/cyber/ListProducts";

interface Props {
  versions: Version[];
}

const HomePage: NextPage<PropsWithChildren<Props>> = ({ versions }) => {
  const [selectedFilter, setSelectedFilter] = useState<boolean>(false);

  return (
    <Layout title="CiberMonday | DercoCenter">
      <Grid.Container>
        <Grid xs={12} justify={"center"} css={{ marginTop: "20px" }}>
          <BannerHome
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </Grid>
      </Grid.Container>
      <ListProducts versions={versions} />
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
