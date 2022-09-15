import React, { FC, useState, useEffect, useContext } from "react";
import { Text, Button, Row, Container } from "@nextui-org/react";
import { currency } from "../../utils";
import { Box } from "../ui/Box";
import { FilterContext } from "../../context/filters/filterContext";

const SelectedFilterGeneral: FC = () => {
  const { isMantenciones, setMantencionesState } = useContext(FilterContext);

  const handleClick = (state: boolean) => {
    setMantencionesState(state);
  };

  return (
    <Container css={{ padding: 0 }}>
      {!isMantenciones ? (
        <Text
          className="text-reserva"
          css={{ color: "white", textAlign: "center" }}
        >
          Todas las reservas son <span className="span-solo">SOLO</span> por{" "}
          {currency.format(200000)}
        </Text>
      ) : (
        <Text
          className="text-reserva"
          css={{ color: "white", textAlign: "center" }}
        >
          Consigue <strong> mantención</strong> para tu auto
        </Text>
      )}
      <Container
        css={{
          paddingTop: "20px",
          "@mdMin": {
            display: "none",
          },
        }}
      >
        <Row className="btn-group">
          <Button
            type="button"
            className={
              !isMantenciones ? "btn-active group" : "btn-deactive group"
            }
            onClick={() => handleClick(false)}
          >
            Vehículos
          </Button>
          <Button
            type="button"
            className={
              isMantenciones ? "btn-active group" : "btn-deactive group"
            }
            onClick={() => handleClick(true)}
          >
            Mantenciones
          </Button>
        </Row>
      </Container>
    </Container>
  );
};

export default SelectedFilterGeneral;
