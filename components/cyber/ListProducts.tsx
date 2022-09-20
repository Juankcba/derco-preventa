import React, { useEffect, useMemo, FC, useContext } from "react";
import { NextPage, GetStaticProps } from "next";

import { Auto, Version, VersionResponse } from "../../interfaces";
import { PropsWithChildren, useState } from "react";

import { Grid, Card, Text, Row, styled, Button } from "@nextui-org/react";
import { cmsApi } from "../../apis";
import Filters from "../ui/Filters";
import VersionCard from "./../cars/VersionCard";
import { FilterContext } from "./../../context/filters/filterContext";
import { categorias, marcas } from "../../database/constants";

interface Props {
  versions: Auto[];
}

const ListProducts: FC<Props> = ({ versions }) => {
  const {
    order,
    filterCarClass,
    filterBrand,
    isDiesel,
    indexOfCards,
    resultadosVersiones,
    scrollChange,
    setScrollChange,
    setResultadosVersiones,
    setIndex,
  } = useContext(FilterContext);
  const [versiones, setVersiones] = useState(versions.slice(0, 4));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => setResultadosVersiones(versions), [versions]);

  useEffect(() => {
    let auxResultados: Auto[] = versions;

    if (filterCarClass.length > 0) {
      let categoriasFilter: string[] = [];
      categorias.forEach((element) => {
        filterCarClass.forEach((id) => {
          if (element.id === id) {
            categoriasFilter.push(element.name);
          }
        });
      });

      let aux: Auto[] = [];

      auxResultados.forEach((auxV) => {
        categoriasFilter.forEach((filtro) => {
          if (auxV.class_name === filtro) {
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
            brandsFilter.push(element.slug);
          }
        });
      });

      let aux: Auto[] = [];

      auxResultados.forEach((auxV) => {
        brandsFilter.forEach((filtro) => {
          if (auxV.brand_name == filtro) {
            console.log("este");
            aux.push(auxV);
          }
        });
      });

      auxResultados = aux;
    }

    if (isDiesel) {
      auxResultados = auxResultados.filter(
        (auxV) => auxV.fuel_name == "diesel"
      );
    } else {
      auxResultados = auxResultados.filter(
        (auxV) => auxV.fuel_name != "diesel"
      );
    }

    if (order === "dsc") {
      setVersiones(
        auxResultados
          .sort((a, b) => a.brand_price - b.brand_price)
          .slice(0, 4 * indexOfCards)
      );
    } else {
      setVersiones(
        auxResultados
          .sort((a, b) => b.brand_price - a.brand_price)
          .slice(0, 4 * indexOfCards)
      );
    }
    setResultadosVersiones(auxResultados);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, indexOfCards, filterCarClass, filterBrand, isDiesel]);

  useEffect(() => {
    if (scrollChange) {
      window?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setScrollChange(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollChange]);

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
        "@mdMax": { maxWidth: "340px", margin: "0 auto" },
        "@mdMin": {
          maxWidth: "1080px",
          margin: "0 auto",
        },
      }}
    >
      {versiones.map((version: Auto) => (
        <Grid
          xs
          md={3}
          key={version.sap}
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
      <Grid
        xs={12}
        justify="center"
        css={{
          marginTop: "16px",
        }}
      >
        {versiones.length > 0 && (
          <Button
            onClick={handleMore}
            color="secondary"
            className="btn-secondary"
          >
            Ver más
          </Button>
        )}
      </Grid>
    </Grid.Container>
  );
};

export default ListProducts;
