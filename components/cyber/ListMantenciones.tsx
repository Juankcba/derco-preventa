import React, { useEffect, useState, useMemo, FC } from "react";
import { Mantencion } from "../../interfaces";
import { Grid, Card, Text, Row, styled, Button } from "@nextui-org/react";
import MantencionCard from "./../mantencions/MantencionCard";
interface Props {
  manteciones: Mantencion[];
}

const ListMantenciones: FC<Props> = ({ manteciones }) => {
  const [matencions, setMantencions] = useState(manteciones.slice(0, 4));
  const [index, setIndex] = useState(1);
  const handleMore = () => {
    let indexData = index + 1;
    setMantencions(manteciones.slice(0, 4 * indexData));
    setIndex(indexData);
  };
  return (
    <Grid.Container gap={2} justify="flex-start" css={{ padding: 0 }}>
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
        <Button onClick={handleMore} className="btn-secondary">
          Ver más
        </Button>
      </Grid>
    </Grid.Container>
  );
};

export default ListMantenciones;
