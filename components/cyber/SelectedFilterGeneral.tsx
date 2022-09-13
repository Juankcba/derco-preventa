import React, { FC } from "react";
import { Text, Button, Row, Container } from "@nextui-org/react";
import { currency } from "../../utils";
import { Box } from "../ui/Box";
interface Props {
  selectedFilter: Boolean;
  setSelectedFilter: (arg: boolean) => void;
}

const SelectedFilterGeneral: FC<Props> = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  const handleClick = (state: boolean) => {
    setSelectedFilter(state);
  };
  return (
    <Container css={{ padding: 0 }}>
      {selectedFilter ? (
        <Text
          className="text-reserva"
          css={{ color: "white", textAlign: "center" }}
        >
          Todas las reservas son <span className="span-solo">SOLO</span> por{" "}
          {currency.format(200000)}
        </Text>
      ) : (
        <Text css={{ color: "white", textAlign: "center" }}>
          Consigue <strong> mantención</strong> para tu auto
        </Text>
      )}
      <Container css={{ paddingTop: "20px" }}>
        <Row className="btn-group">
          <Button
            type="button"
            className={selectedFilter ? "btn-active" : "btn-deactive"}
            onClick={() => handleClick(true)}
          >
            Vehículos
          </Button>
          <Button
            type="button"
            className={!selectedFilter ? "btn-active" : "btn-deactive"}
            onClick={() => handleClick(false)}
          >
            Mantenciones
          </Button>
        </Row>
      </Container>
    </Container>
  );
};

export default SelectedFilterGeneral;
