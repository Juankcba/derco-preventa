import { Grid } from "@nextui-org/react";
import React, { FC } from "react";
import { Mantencion } from "../../interfaces";
import MantencionCard from "../mantencions/MantencionCard";

interface Props {
  manteciones: Mantencion[];
}

const ListMantenciones: FC<Props> = ({ manteciones }) => {
  return (
    <Grid.Container>
      <Grid xs={12}>
        <Grid.Container gap={2} justify="flex-start">
          {manteciones.map((mantencion: Mantencion) => (
            <MantencionCard mantencion={mantencion} key={mantencion.id} />
          ))}
        </Grid.Container>
      </Grid>
    </Grid.Container>
  );
};

export default ListMantenciones;
