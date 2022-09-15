import React, { useEffect, useState, useMemo, FC, useContext } from "react";
import { Mantencion } from "../../interfaces";
import { Grid, Card, Text, Row, styled, Button } from "@nextui-org/react";

import MantencionCard from "./../mantencions/MantencionCard";

import { FilterContext } from "../../context/filters/filterContext";
interface Props {
  manteciones: Mantencion[];
}

const ListMantenciones: FC<Props> = ({ manteciones }) => {
  const {
    scrollChange,
    order,
    indexOfMantenciones,
    resultadosMantenciones,
    setScrollChange,
    setIndexMant,
  } = useContext(FilterContext);
  const [matencions, setMantencions] = useState(manteciones.slice(0, 4));

  useEffect(() => {
    if (order === "dsc") {
      setMantencions(
        matencions
          .sort((a, b) => a.minPrice - b.minPrice)
          .slice(0, 4 * indexOfMantenciones)
      );
    } else {
      setMantencions(
        matencions
          .sort((a, b) => b.minPrice - a.minPrice)
          .slice(0, 4 * indexOfMantenciones)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, indexOfMantenciones]);

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
      {matencions.map((mantencion: Mantencion) => (
        <Grid
          xs
          md={3}
          key={mantencion.id}
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
        <Button
          onClick={handleMore}
          color="secondary"
          className="btn-secondary"
        >
          Ver más
        </Button>
      </Grid>
    </Grid.Container>
  );
};

export default ListMantenciones;
