import { Card, Row, Text } from "@nextui-org/react";
import React from "react";

const CardStatus = ({ status, id }) => {
  return (
    <Card
      variant="bordered"
      css={{
        p: 0,
        m: 0,
        border: status === "0" ? "2px solid #1EDC48" : "2px solid #FF4242",
        background: status === "0" ? "#EDFDF0" : "#FFF0F0",
      }}
    >
      <Card.Body css={{ m: 0 }}>
        {status === "0" && (
          <>
            <Text css={{ textAlign: "center" }}>Tu código de reserva es</Text>
            <Text
              h5
              className="reserva-summary-code"
              css={{ textAlign: "center" }}
            >
              {id}
            </Text>
          </>
        )}
        {status != "0" && (
          <Row>
            <div>
              <Text css={{ textAlign: "center" }}>
                Su transación fue rechazada
              </Text>
              <Text
                h5
                className="reserva-summary-code"
                css={{ textAlign: "center" }}
              >
                Su tarjeta cuenta con un límite estrablecido, intente con otra
                tarjeta.
              </Text>
            </div>
            <div>icono</div>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default CardStatus;
