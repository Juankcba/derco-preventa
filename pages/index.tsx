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

interface Props {
  versions: Version[];
}

const HomePage: NextPage<PropsWithChildren<Props>> = ({ versions }) => {
  const [resultados, setResultados] = useState<Version[]>([]);
  const [filters, setFilter] = useState<string[]>([]);
  const filtrosCategory = [
    { key: "todos-carClass", name: "Todos" },
    { key: "Citycar", name: "Citicar" },
    { key: "Hatchback", name: "Hatchback" },
    { key: "Sedán", name: "Sedán" },
    { key: "SUV", name: "SUV" },
    { key: "Van", name: "VAN" },
    { key: "Camioneta", name: "Camioneta" },
    { key: "Comercial", name: "Comercial" },
    { key: "Eléctrico", name: "Híbrido y Eléctrico" },
  ];
  const filtrosBrand = [
    { key: "todos-brand", name: "Todos" },
    { key: "Changan", name: "Changan" },
    { key: "GreatWall", name: "Great Wall" },
    { key: "Haval", name: "Haval" },
    { key: "Jac", name: "JAC" },
    { key: "Mazda", name: "Mazda" },
    { key: "Renault", name: "Renault" },
    { key: "Suzuki", name: "Suzuki" },
  ];
  const filtrosTransmision = [
    { key: "todos-transmision", name: "Todos" },
    { key: "automatica", name: "Automatica" },
    { key: "manual", name: "Manual" },
  ];
  useMemo(() => {
    let auxResultados: Version[] = versions;

    filters.forEach((filtro) => {
      if (filtrosCategory.find((fc) => fc.key === filtro)) {
        if (filtro != "todos-carClass") {
          if (filtro != "Eléctrico") {
            let aux = auxResultados.filter((auxV) => {
              if (auxV.model.carClass.filter((mcC) => mcC == filtro).length > 0)
                return auxV;
              else return null;
            });
            auxResultados = aux;
          }
          if (filtro == "Eléctrico") {
            let aux = auxResultados.filter((auxV) => {
              if (
                auxV.model.carClass.filter((mcC) => mcC === "Eléctrico")
                  .length > 0 ||
                auxV.model.carClass.filter((mcC) => mcC === "Híbrido").length >
                  0
              )
                return auxV;
              else return null;
            });
            auxResultados = aux;
          }
        }
      }
      if (filtrosBrand.find((fb) => fb.key === filtro)) {
        if (filtro != "todos-brand") {
          let aux = auxResultados.filter((auxV) => {
            console.log(auxV.model.brandName);
            if (auxV.model.brandName === filtro) return auxV;
            else return null;
          });
          auxResultados = aux;
        }
      }
      if (filtrosTransmision.find((fb) => fb.key === filtro)) {
        if (filtro != "todos-transmision") {
          let aux = auxResultados.filter((auxV) => {
            console.log(auxV.transmission);
            if (auxV.transmission === filtro) return auxV;
            else return null;
          });
          auxResultados = aux;
        }
      }
    });

    if (filters.filter((f) => f === "asc").length > 0) {
      setResultados(auxResultados.sort((a, b) => a.minPrice - b.minPrice));
    }
    if (filters.filter((f) => f === "dsc").length > 0) {
      setResultados(auxResultados.sort((a, b) => b.minPrice - a.minPrice));
    }

    //setResultados(auxResultados);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, versions]);

  return (
    <Layout title="CiberMonday | DercoCenter">
      <Grid.Container>
        <Grid xs={12} css={{ marginTop: "20px", flexDirection: "column" }}>
          <Filters setFilter={setFilter} filters={filters} />
          <Text h4>Resultados: {resultados.length}</Text>
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
