import React, { FC } from "react";
import { Text, Button } from "@nextui-org/react";
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
    <Box>
      {selectedFilter ? (
        <Text css={{ color: "white", textAlign: "center" }}>
          Todas las reservas son <span className="span-solo">SOLO</span> por{" "}
          {currency.format(200000)}
        </Text>
      ) : (
        <Text css={{ color: "white", textAlign: "center" }}>
          Consigue la mantención para tu auto
        </Text>
      )}
      <div className="btn-group">
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
      </div>
    </Box>
  );
};

export default SelectedFilterGeneral;
