import { Button, Card, Row, Text } from "@nextui-org/react";
import { FC, useState } from "react";
import React from "react";
import { StoreColor } from "../../interfaces";
interface Props {
  colors: StoreColor[];
  setColor: (arg: String) => void;
}
const CarsColorsPreventa: FC<Props> = ({ colors, setColor }) => {
  const [selectedColor, setSelectedColor] = useState<any>(colors[0] || null);

  const handleChange = (color: StoreColor) => {
    setSelectedColor(color);
    setColor(color.color_name);
  };

  function invertHex(hex: string) {
    console.log("hex", hex);
    return (Number(`0x1${hex}`) ^ 0xffffff)
      .toString(16)
      .substr(1)
      .toUpperCase();
  }
  return (
    <Row justify={"center"} css={{ flexDirection: "column", p: 0, w: "100%" }}>
      {selectedColor && (
        <Card.Image
          src={selectedColor.image}
          objectFit="contain"
          width="100%"
          height={350}
          alt={selectedColor.name}
        />
      )}
      <Button.Group
        size="md"
        css={{ width: "100%", flexWrap: "wrap", justifyContent: "center" }}
      >
        {colors.map((color, index) => (
          <Button
            onPress={() => {
              handleChange(color);
            }}
            key={index}
            css={{
              backgroundColor: color.color_hex
                ? color.color_hex
                : Math.floor(Math.random() * 16777215).toString(16),
            }}
          >
            <Text
              css={{
                "@xsMax": { display: "none" },
                color: color.color_hex
                  ? `#${invertHex(color.color_hex.split("#")[1])}`
                  : "#000",
              }}
            >
              {color.color_name}
            </Text>
          </Button>
        ))}
      </Button.Group>
    </Row>
  );
};

export default CarsColorsPreventa;
