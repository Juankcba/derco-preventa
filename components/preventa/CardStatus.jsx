import { Card, Row, Text } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

const CardStatus = ({ status, id, matencion }) => {
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
            <Text css={{ textAlign: "center" }}>
              Tu código de {matencion ? "mantención " : "reserva"} es
            </Text>
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
            <div style={{ minWidth: "340px" }}>
              <Text
                h3
                className="trans-rec-title"
                css={{ textAlign: "center" }}
              >
                Su transación fue rechazada
              </Text>
              <Text
                h5
                className="trans-rec-subtitle"
                css={{ textAlign: "center" }}
              >
                Su tarjeta cuenta con un límite estrablecido, intente con otra
                tarjeta.
              </Text>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <Image
                src="/assets/img/warning-error.svg"
                alt="error-warning"
                width={64}
                height={64}
              />
            </div>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default CardStatus;
