import { Button, Card, Row, Text } from "@nextui-org/react";
import { FC, useState } from "react";
import React from "react";
import { Color } from "../../interfaces";
interface Props {
  colors: Color[];
}
const CarsColors: FC<Props> = ({ colors }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0] || null);
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
        <Button.Group css={{ margin: "0 auto" }}>
          {colors.map((color, index) => (
            <Button
              onClick={() => setSelectedColor(color)}
              key={index}
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
