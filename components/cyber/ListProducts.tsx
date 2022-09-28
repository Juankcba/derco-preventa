import React, { useEffect, useMemo, FC, useContext } from "react";
import { NextPage, GetStaticProps } from "next";

import { Auto, Version, VersionResponse } from "../../interfaces";
import { PropsWithChildren, useState } from "react";

import {
  Grid,
  Card,
  Text,
  Row,
  styled,
  Button,
  StyledLoadingContainer,
  Loading,
} from "@nextui-org/react";
import { cmsApi } from "../../apis";
import Filters from "../ui/Filters";
import VersionCard from "./../cars/VersionCard";
import { FilterContext } from "./../../context/filters/filterContext";
import { categorias, marcas } from "../../database/constants";
import { useRouter } from "next/router";
import { FilterIcon } from "../ui/FilterIcon";
import { UiContext } from "../../context";
import UpsError from "./../ui/UpsError";

interface Props {
  versions: Auto[];
}

const ListProducts: FC<Props> = ({ versions }) => {
  const {
    order,
    filterCarClass,
    filterBrand,
    filterCombustible,
    indexOfCards,
    resultadosVersiones,
    scrollChange,
    setScrollChange,
    setResultadosVersiones,
    setFilterBrand,
    setFilterCombustible,
    setFilterCarClass,
    setIndex,
  } = useContext(FilterContext);
  const { isModalOpen, setVisible } = useContext(UiContext);
  const [versiones, setVersiones] = useState<Auto[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => setResultadosVersiones(versions), [versions]);
  const router = useRouter();

  useEffect(() => {
    const { card, categories, brands, combustible, matenciones } = router.query;
    console.log(typeof brands);
    if (brands && typeof brands === "string") {
      setFilterBrand([brands]);
    }
    if (brands && typeof brands === "object") {
      setFilterBrand(brands);
    }
    if (!brands) {
      setFilterBrand([]);
    }
    if (categories && typeof categories === "string") {
      setFilterCarClass([categories]);
    }
    if (categories && typeof categories === "object") {
      setFilterCarClass(categories);
    }
    if (!categories) {
      setFilterCarClass([]);
    }

    if (combustible && typeof combustible === "string") {
      setFilterCombustible([combustible]);
    }
    if (combustible && typeof combustible === "object") {
      setFilterCombustible(combustible);
    }
    if (!combustible) {
      setFilterCombustible([]);
    }

    //if (brands) setFilterBrand(brands);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    setLoading(true);
    let auxResultados: Auto[] = versions;

    if (filterCarClass.length > 0) {
      let categoriasFilter: string[] = filterCarClass;
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
      let brandsFilter: string[] = filterBrand;

      let aux: Auto[] = [];

      auxResultados.forEach((auxV) => {
        brandsFilter.forEach((filtro) => {
          if (auxV.brand_name == filtro) {
            aux.push(auxV);
          }
        });
      });

      auxResultados = aux;
    }

    if (filterCombustible.length > 0) {
      let combustibleFilter: string[] = filterCombustible;
      console.log(
        "fuel",
        auxResultados.map((v) => v.fuel_slug)
      );
      let aux: Auto[] = [];
      auxResultados.forEach((auxV) => {
        combustibleFilter.forEach((filtro) => {
          if (auxV.fuel_slug == filtro) {
            aux.push(auxV);
          }
        });
      });

      auxResultados = aux;
    }

    let finalResultados: Auto[] = [];
    if (order === "dsc") {
      finalResultados = auxResultados
        .sort(
          (a, b) =>
            a.list_price -
            (a.list_price -
              a.brand_price +
              (a.list_price - a.financial_price)) -
            (b.list_price -
              (b.list_price -
                b.brand_price +
                (b.list_price - b.financial_price)))
        )
        .slice(0, 4 * indexOfCards);
    } else {
      finalResultados = auxResultados
        .sort(
          (a, b) =>
            b.list_price -
            (b.list_price -
              b.brand_price +
              (b.list_price - b.financial_price)) -
            (a.list_price -
              (a.list_price -
                a.brand_price +
                (a.list_price - a.financial_price)))
        )
        .slice(0, 4 * indexOfCards);
    }
    setResultadosVersiones(auxResultados);
    setVersiones(finalResultados);
    setTimeout(() => {
      setLoading(false);
    }, 300);

    console.log("despues del filtro", finalResultados);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, indexOfCards, filterCarClass, filterBrand, filterCombustible]);

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
  const handler = () => {
    setVisible(!isModalOpen);
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
      {loading && (
        <Grid xs={12} css={{ display: "flex", justifyContent: "center" }}>
          <Loading />
        </Grid>
      )}
      {!loading &&
        versiones.length > 0 &&
        versiones.map((version: Auto) => (
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
            onPress={handleMore}
            color="secondary"
            className="btn-secondary"
          >
            Ver más
          </Button>
        )}
        {!loading && versiones.length == 0 && <UpsError />}
      </Grid>
    </Grid.Container>
  );
};

export default ListProducts;
