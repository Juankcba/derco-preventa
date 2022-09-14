import { Button, Card, Row, Text } from "@nextui-org/react";
import { FC, useState } from "react";
import React from "react";
import { Color } from "../../interfaces";
interface Props {
  colors: Color[];
}
const CarsColors: FC<Props> = ({ colors }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0] || null);
  function invertHex(hex: string) {
    console.log("hex", hex)
    return (Number(`0x1${hex}`) ^ 0xffffff)
      .toString(16)
      .substr(1)
      .toUpperCase();
  }
  return (
    <Card>
      <Card.Body css={{ p: 0 }}>
        {selectedColor && (
          <Card.Image
            src={selectedColor.imageSrc}
            objectFit="contain"
            width="100%"
            height={350}
            alt={selectedColor.name}
          />
        )}
      </Card.Body>
      <Card.Footer>
        <Button.Group
          size="md"
          css={{ width: "100%", flexWrap: "wrap", justifyContent: "center" }}
        >
          {colors.map((color, index) => (
            <Button
              onClick={() => setSelectedColor(color)}
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
      </Card.Footer>
    </Card>
  );
};

export default CarsColors;
