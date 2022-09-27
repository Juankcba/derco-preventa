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
        maxH: "200px",
        "@mdMin": {
          maxWidth: "503px",
        },
      }}
    >
      <Card.Body css={{ p: 0, overflow: "hidden" }}>
        <Text h1 className="preventa-error-title">
          ¡Vaya! Tuvimos un inconveniente
        </Text>
        <Text h2 className="preventa-error-subtitle">
          Por favor selecciona el auto nuevamente.
        </Text>
        <div>
          <Button
            className="btn-primary big"
            css={{ width: "100%" }}
            onPress={() => setStep(1)}
          >
            Volver a seleccionar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ErrorStep;
