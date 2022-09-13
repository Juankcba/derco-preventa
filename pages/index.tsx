import { useEffect, useMemo, useContext } from "react";
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

import ListProducts from "../components/cyber/ListProducts";
import ListMantenciones from "../components/cyber/ListMantenciones";
import { Mantencion, MantencionResponse } from "../interfaces/mantencion-full";

import ModalFilters from "../components/cyber/ModalFilters";
import SelectedFilterGeneral from "../components/cyber/SelectedFilterGeneral";
import { FilterContext } from "../context/filters/filterContext";

import BannerDream from "../components/cyber/BannerDream";
import BrandsFinder from "../components/cyber/BrandsFinder";
import BannerHome from "../components/cyber/BannerHome";
interface Props {
  versions: Version[];
}

const HomePage: NextPage<PropsWithChildren<Props>> = ({ versions }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { isMantenciones } = useContext(FilterContext);

  const mantenciones: Mantencion[] = [
    {
      id: 1,
      name: "Mantencion",
      kms: 30000,
      category: "Citycar",
      price: 270000,
    },
    { id: 2, name: "Mantencion", kms: 10000, category: "Suv", price: 270000 },
    { id: 3, name: "Mantencion", kms: 20000, category: "Sedán", price: 270000 },
    {
      id: 4,
      name: "Mantencion",
      kms: 40000,
      category: "Camioneta",
      price: 270000,
    },
    {
      id: 5,
      name: "Mantencion",
      kms: 20000,
      category: "Citycar",
      price: 270000,
    },
    { id: 6, name: "Mantencion", kms: 30000, category: "Suv", price: 270000 },
    { id: 7, name: "Mantencion", kms: 40000, category: "Sedán", price: 270000 },
    {
      id: 8,
      name: "Mantencion",
      kms: 10000,
      category: "Camioneta",
      price: 270000,
    },
  ];

  return (
    <Layout title="CiberMonday | DercoCenter">
      <BannerHome />
      <Grid.Container css={{ margin: "0" }}>
        <Grid xs={12} justify={"center"} css={{ paddingTop: "20px" }}>
          <SelectedFilterGeneral />
        </Grid>
      </Grid.Container>
      <Container justify={"center"} css={{ marginTop: "20px" }}>
        {isMantenciones ? (
          <ListMantenciones manteciones={mantenciones} />
        ) : (
          <ListProducts versions={versions} />
        )}
      </Container>
      <BannerDream />
      <BrandsFinder />

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
