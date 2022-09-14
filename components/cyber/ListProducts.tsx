import React, { useEffect, useMemo, FC, useContext } from "react";
import { NextPage, GetStaticProps } from "next";

import { Version, VersionResponse } from "../../interfaces";
import { PropsWithChildren, useState } from "react";

import { Grid, Card, Text, Row, styled, Button } from "@nextui-org/react";
import { cmsApi } from "../../apis";
import Filters from "../ui/Filters";
import VersionCard from "./../cars/VersionCard";
import { FilterContext } from "./../../context/filters/filterContext";
import { categorias, marcas } from "../../database/constants";

interface Props {
  versions: Version[];
}

const ListProducts: FC<Props> = ({ versions }) => {
  const {
    order,
    filterCarClass,
    filterBrand,
    isDiesel,
    indexOfCards,
    setIndex,
  } = useContext(FilterContext);
  const [versiones, setVersiones] = useState(versions.slice(0, 4));

  useEffect(() => {
    let auxResultados: Version[] = versions;
    console.log("filters", filterCarClass);

    if (filterCarClass.length > 0) {
      let categoriasFilter: string[] = [];
      categorias.forEach((element) => {
        filterCarClass.forEach((id) => {
          if (element.id === id) {
            categoriasFilter.push(element.name);
          }
        });
      });

      let aux: Version[] = [];

      auxResultados.forEach((auxV) => {
        categoriasFilter.forEach((filtro) => {
          if (auxV.model.carClass.filter((mcC) => mcC === filtro).length > 0) {
            aux.push(auxV);
          }
        });
      });
      auxResultados = aux;
    }
    if (filterBrand.length > 0) {
      let brandsFilter: string[] = [];
      marcas.forEach((element) => {
        filterBrand.forEach((id) => {
          if (element.id === id) {
            brandsFilter.push(element.name);
          }
        });
      });

      let aux: Version[] = [];

      auxResultados.forEach((auxV) => {
        brandsFilter.forEach((filtro) => {
          if (auxV.model.brandName === filtro) {
            aux.push(auxV);
          }
        });
      });
      console.log(
        "brandsFilter",
        brandsFilter,
        versions.map((v) => v.model.brandName)
      );
      auxResultados = aux;
    }
    if (filterBrand.length > 0) {
      let brandsFilter: string[] = [];
      marcas.forEach((element) => {
        filterBrand.forEach((id) => {
          if (element.id === id) {
            brandsFilter.push(element.name);
          }
        });
      });

      let aux: Version[] = [];

      auxResultados.forEach((auxV) => {
        brandsFilter.forEach((filtro) => {
          if (auxV.model.brandName === filtro) {
            aux.push(auxV);
          }
        });
      });

      auxResultados = aux;
    }

    if (isDiesel) {
      auxResultados = auxResultados.filter((auxV) => auxV.fuel == "diesel");
    } else {
      auxResultados = auxResultados.filter((auxV) => auxV.fuel != "diesel");
    }

    if (order === "dsc") {
      setVersiones(
        auxResultados
          .sort((a, b) => a.minPrice - b.minPrice)
          .slice(0, 4 * indexOfCards)
      );
    } else {
      setVersiones(
        auxResultados
          .sort((a, b) => b.minPrice - a.minPrice)
          .slice(0, 4 * indexOfCards)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, indexOfCards, filterCarClass, filterBrand, isDiesel]);

  const handleMore = () => {
    let indexData = indexOfCards + 1;
    setIndex(indexData);
  };
  return (
    <Grid.Container
      gap={2}
      justify="flex-start"
      css={{
        padding: 0,
        "@mdMin": {
          maxWidth: "1080px",
          margin: "0 auto",
        },
      }}
    >
      {versiones.map((version: Version) => (
        <Grid
          xs
          md={3}
          key={version.id}
          css={{
            display: "flex",
            justifyContent: "center",
            paddingLeft: 0,
            paddingRight: "8px",
          }}
        >
          <VersionCard version={version} />
        </Grid>
      ))}
      <Grid xs={12} justify="center" css={{ marginTop: "16px" }}>
        <Button onClick={handleMore} className="btn-secondary">
          Ver más
        </Button>
      </Grid>
    </Grid.Container>
  );
};

export default ListProducts;
