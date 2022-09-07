import { useEffect, useMemo } from "react";
import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { cmsApi } from "../components/apis";
import { Layout } from "../components/Layouts";
import { Version, VersionResponse } from "../interfaces";
import { PropsWithChildren, useState } from "react";

import { Grid, Card, Text, Row } from "@nextui-org/react";
import VersionCard from "../components/cars/VersionCard";
import Filters from "../components/ui/Filters";

interface Props {
  versions: Version[];
}

const HomePage: NextPage<PropsWithChildren<Props>> = ({ versions }) => {
  const [resultados, setResultados] = useState<Version[]>([]);
  const [filters, setFilter] = useState<string[]>([]);
  useMemo(() => {
    console.log("filters", filters);
    if (filters.filter((f) => f == "asc").length > 0) {
      setResultados(versions.sort((a, b) => a.minPrice - b.minPrice));
    }
    if (filters.filter((f) => f == "dsc").length > 0) {
      setResultados(versions.sort((a, b) => b.minPrice - a.minPrice));
    }
  }, [filters, versions]);

  return (
    <Layout title="CiberMonday | DercoCenter">
      <Grid.Container>
        <Grid xs={12} css={{ marginTop: "20px" }}>
          <Filters setFilter={setFilter} filters={filters} />
        </Grid>
        <Grid xs={12} className="content-result">
          {resultados.length > 0 ? (
            <Grid.Container gap={2} justify="flex-start">
              {resultados.map((version) => (
                <VersionCard key={version.id} version={version} />
              ))}
            </Grid.Container>
          ) : (
            <Grid.Container gap={2} justify="flex-start">
              {versions.map((version) => (
                <VersionCard key={version.id} version={version} />
              ))}
            </Grid.Container>
          )}
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
