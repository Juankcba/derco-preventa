import { useEffect, useMemo, useContext } from "react";
import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { cmsApi, storeApi } from "../apis";
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
import HomeBanner from "../components/cyber/HomeBanner";
import { Typography } from "@mui/material";
import { Auto, StoreResponse } from "../interfaces/store-full";
import { useRouter } from "next/router";
import BannerDerco from "../components/cyber/BannerDerco";
import StepsToBuy from "./../components/ui/StepsToBuy";

interface Props {
  cars: Auto[];
  mantencions: Auto[];
}

const HomePage: NextPage<PropsWithChildren<Props>> = ({
  cars,
  mantencions,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { isMantenciones, filterCarClass, isDiesel, filterBrand } =
    useContext(FilterContext);

  return (
    <Layout
      title="CyberMonday | DercoCenter"
      titleNavbar="Preguntas Frecuentes"
    >
      <HomeBanner />
      <Grid.Container css={{ margin: "0" }}>
        <Grid xs={12} justify={"center"} css={{ paddingTop: "20px" }}>
          <SelectedFilterGeneral />
        </Grid>
      </Grid.Container>
      <Container justify={"center"} css={{ marginTop: "20px" }}>
        {isMantenciones ? (
          <ListMantenciones mantenciones={mantencions} />
        ) : (
          <ListProducts versions={cars} />
        )}
      </Container>
      {/* 
      <BrandsFinder /> */}
      <BannerDream />
      <BannerDerco />
      <StepsToBuy />
    </Layout>
  );
};

export async function getStaticProps() {
  //const { data } = await cmsApi.get<VersionResponse>("/versions");
  const {
    data: { autos, mantenciones },
  } = await storeApi.get<StoreResponse>(
    `/pre-order/cyber-dc/${process.env.NEXT_PUBLIC_PREVENTA}/cars`
  );

  //const versions: VersionResponse = data;
  const mantencions: Auto[] = mantenciones;
  const cars: Auto[] = autos;

  return {
    props: { cars, mantencions },
    revalidate: 60,
  };
}

export default HomePage;
