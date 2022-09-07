import { Button, Card, Row, Text } from "@nextui-org/react";
import { FC, useState } from "react";
import React from "react";
import { Color } from "../../interfaces";
interface Props {
  colors: Color[];
}
const CarsColors: FC<Props> = ({ colors }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0].name);
  return (
    <Card>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={colors.filter((c) => c.name === selectedColor)[0].imageSrc}
          objectFit="contain"
          width="100%"
          height={350}
          alt={selectedColor}
        />
      </Card.Body>
      <Card.Footer>
        <Button.Group css={{ margin: "0 auto" }}>
          {colors.map((color) => (
            <Button
              onClick={() => setSelectedColor(color.name)}
              key={color.name}
              css={{
                backgroundColor: color.hexadecimal1,
              }}
            >
              <Text css={{ mixBlendMode: "difference" }}>{color.name}</Text>
            </Button>
          ))}
        </Button.Group>
      </Card.Footer>
    </Card>
  );
};

export default CarsColors;
