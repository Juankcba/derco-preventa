import { Button, Row, Text } from "@nextui-org/react";
import React, { useContext } from "react";
import { UiContext } from "../../context";
import { FilterIcon } from "./FilterIcon";

const UpsError = () => {
  const { isModalOpen, setVisible } = useContext(UiContext);
  const handler = () => {
    setVisible(!isModalOpen);
  };
  return (
    <Row
      className="error-ups"
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        maxW: "502px",
        margin: "0 auto 0 0 ",
      }}
    >
      <Text h2 color="white">
        Uups!
      </Text>
      <Text h3>
        Lo sentimos los filtros que aplicaste no dieron ningun resultado.
      </Text>
      <Text h4>
        Puede que tu vehículo o mantención no se encuentre disponible dentro de
        este Cyber DercoCenter.
      </Text>
      <Button
        auto
        onPress={handler}
        css={{ width: "100%" }}
        className="btn-primary big"
        iconRight={<FilterIcon />}
      >
        Ver Filtros
      </Button>
    </Row>
  );
};

export default UpsError;
