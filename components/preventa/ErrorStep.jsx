import { Button, Card, Text } from "@nextui-org/react";
import React from "react";

const ErrorStep = ({ setStep }) => {
  return (
    <Card
      css={{
        w: "100%",
        h: "100%",
        p: "32px",
        overflow: "hidden",
        maxWidth: "100%",
        "@mdMin": {
          maxWidth: "503px",
        },
      }}
    >
      <Card.Body css={{ p: 0, overflow: "hidden" }}>
        <Text h2>No stock</Text>
        <div>
          <Button className="btn-primary big" onPress={() => setStep(1)}>
            Volver a seleccionar Color
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ErrorStep;
