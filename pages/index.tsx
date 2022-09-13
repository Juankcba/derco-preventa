import { useEffect, useMemo } from "react";
import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { cmsApi } from "../apis";
import { Layout } from "../components/Layouts";
import { Version, VersionResponse } from "../interfaces";
import { PropsWithChildren, useState } from "react";

import {
  Grid,
  Card,
  Text,
  Row,
  Button,
  Navbar,
  Container,
} from "@nextui-org/react";
import VersionCard from "../components/cars/VersionCard";
import Filters from "../components/ui/Filters";
import BannerHome from "../components/cyber/bannerHome";
import ListProducts from "../components/cyber/ListProducts";
import ListMantenciones from "../components/cyber/ListMantenciones";
import { Mantencion, MantencionResponse } from "../interfaces/mantencion-full";

import ModalFilters from "../components/cyber/ModalFilters";
import SelectedFilterGeneral from "../components/cyber/SelectedFilterGeneral";

interface Props {
  versions: Version[];
}

const HomePage: NextPage<PropsWithChildren<Props>> = ({ versions }) => {
  const [selectedFilter, setSelectedFilter] = useState<boolean>(true);

  const [visible, setVisible] = useState<boolean>(false);
  const mantenciones: Mantencion[] = [
    { id: 1, name: "Mantencion", kms: 10000, category: "Citycar" },
    { id: 2, name: "Mantencion", kms: 10000, category: "Citycar" },
    { id: 3, name: "Mantencion", kms: 10000, category: "Citycar" },
    { id: 4, name: "Mantencion", kms: 10000, category: "Citycar" },
    { id: 5, name: "Mantencion", kms: 10000, category: "Citycar" },
    { id: 6, name: "Mantencion", kms: 10000, category: "Citycar" },
    { id: 7, name: "Mantencion", kms: 10000, category: "Citycar" },
  ];

  return (
    <Layout title="CiberMonday | DercoCenter">
      <BannerHome />
      <Grid.Container css={{ margin: "0" }}>
        <Grid xs={12} justify={"center"} css={{ paddingTop: "20px" }}>
          <SelectedFilterGeneral
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </Grid>
      </Grid.Container>
      <Container justify={"center"} css={{ marginTop: "20px" }}>
        {selectedFilter ? (
          <ListProducts versions={versions} />
        ) : (
          <ListMantenciones manteciones={mantenciones} />
        )}
      </Container>

      <ModalFilters />
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
