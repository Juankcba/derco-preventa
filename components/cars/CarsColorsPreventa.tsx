import { Button, Card, Row, Text } from "@nextui-org/react";
import { FC, useState } from "react";
import React from "react";
import { Color } from "../../interfaces";
interface Props {
  colors: Color[];
  setColor: (arg: String) => void;
}
const CarsColorsPreventa: FC<Props> = ({ colors, setColor }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0] || null);

  const handleChange = (color: React.SetStateAction<Color>) => {
    setSelectedColor(color);
    setColor(color.name);
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
          src={selectedColor.imageSrc}
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
            onClick={() => {
              handleChange(color);
            }}
            key={index}
            css={{
              backgroundColor: color.hexadecimal1
                ? color.hexadecimal1
                : Math.floor(Math.random() * 16777215).toString(16),
            }}
          >
            <Text
              css={{
                "@xsMax": { display: "none" },
                color: color.hexadecimal1
                  ? `#${invertHex(color.hexadecimal1.split("#")[1])}`
                  : "#000",
              }}
            >
              {color.name}
            </Text>
          </Button>
        ))}
      </Button.Group>
    </Row>
  );
};

export default CarsColorsPreventa;
