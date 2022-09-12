import { Text, Button } from "@nextui-org/react";
import React from "react";
import { Box } from "../ui/Box";
import { currency } from "../../utils";
import { FC } from "react";
import Image from "next/image";

interface Props {
  selectedFilter: Boolean;
  setSelectedFilter: (arg: boolean) => void;
}

const BannerHome: FC<Props> = ({ selectedFilter, setSelectedFilter }) => {
  const handleClick = (state: boolean) => {
    setSelectedFilter(state);
  };
  return (
    <Box>
      <div className="cyber-logos">
        <Image
          src="/assets/img/cyber/coin.svg"
          height={64}
          width={64}
          alt="cyber-coin"
        />
        <Image
          src="/assets/img/cyber/cyber.svg"
          height={70}
          width={205}
          alt="cyber-url"
          style={{ marginLeft: "16px" }}
        />
      </div>
      <Text css={{ color: "white", textAlign: "center" }}>
        ¡Del 3 al 5 de Octubre!
      </Text>
      {selectedFilter ? (
        <Text css={{ color: "white", textAlign: "center" }}>
          Todas las reservas son por {currency.format(200000)}
        </Text>
      ) : (
        <Text css={{ color: "white", textAlign: "center" }}>
          Consigue la mantención para tu auto
        </Text>
      )}
      <div className="btn-group">
        <Button
          className={selectedFilter ? "btn-active" : "btn-deactive"}
          onClick={() => handleClick(true)}
        >
          Vehículos
        </Button>
        <Button
          className={!selectedFilter ? "btn-active" : "btn-deactive"}
          onClick={() => handleClick(false)}
        >
          Mantenciones
        </Button>
      </div>
    </Box>
  );
};

export default BannerHome;
