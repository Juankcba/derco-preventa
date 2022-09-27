import React, { useEffect, useState, useMemo, FC, useContext } from "react";
import { Auto, Mantencion } from "../../interfaces";
import {
  Grid,
  Card,
  Text,
  Row,
  styled,
  Button,
  Loading,
} from "@nextui-org/react";

import MantencionCard from "./../mantencions/MantencionCard";

import { FilterContext } from "../../context/filters/filterContext";
import { useRouter } from "next/router";
import UpsError from "../ui/UpsError";
interface Props {
  mantenciones: Auto[];
}

const ListMantenciones: FC<Props> = ({ mantenciones }) => {
  const {
    scrollChange,
    order,
    indexOfMantenciones,
    filterMantencionesCarClass,
    resultadosMantenciones,
    setFilterMatencionesCarClass,
    setResultadosMantenciones,
    setScrollChange,
    setIndexMant,
  } = useContext(FilterContext);
  const [matencions, setMantencions] = useState<Auto[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => setResultadosMantenciones(mantenciones), [mantenciones]);
  const router = useRouter();
  useEffect(() => {
    const { card, categoriesMantenciones, matenciones } = router.query;

    if (categoriesMantenciones && typeof categoriesMantenciones === "string") {
      setFilterMatencionesCarClass([categoriesMantenciones]);
    }
    if (categoriesMantenciones && typeof categoriesMantenciones === "object") {
      setFilterMatencionesCarClass(categoriesMantenciones);
    }
    if (!categoriesMantenciones) {
      setFilterMatencionesCarClass([]);
    }
    //if (brands) setFilterBrand(brands);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    setLoading(true);
    let auxResultados: Auto[] = mantenciones;

    if (filterMantencionesCarClass.length > 0) {
      let categoriasFilter: string[] = filterMantencionesCarClass;
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
        .slice(0, 4 * indexOfMantenciones);
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
        .slice(0, 4 * indexOfMantenciones);
    }
    setResultadosMantenciones(auxResultados);
    setMantencions(finalResultados);
    setTimeout(() => {
      setLoading(false);
    }, 300);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, indexOfMantenciones, filterMantencionesCarClass, mantenciones]);

  useEffect(() => {
    if (scrollChange) {
      window?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setScrollChange(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollChange]);

  const handleMore = () => {
    let indexData = indexOfMantenciones + 1;

    setIndexMant(indexData);
  };
  if (mantenciones.length === 0) return null;
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
        matencions.length > 0 &&
        matencions.map((mantencion: Auto) => (
          <Grid
            xs
            md={3}
            key={mantencion.sap}
            css={{
              display: "flex",
              justifyContent: "center",
              paddingLeft: 0,
              paddingRight: "8px",
            }}
          >
            <MantencionCard mantencion={mantencion} />
          </Grid>
        ))}
      <Grid xs={12} justify="center" css={{ marginTop: "16px" }}>
        {matencions.length > 0 && (
          <Button
            onPress={handleMore}
            color="secondary"
            className="btn-secondary"
          >
            Ver más
          </Button>
        )}
        {!loading && matencions.length == 0 && <UpsError />}
      </Grid>
    </Grid.Container>
  );
};

export default ListMantenciones;
