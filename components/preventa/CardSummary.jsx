import { Button, Card, Row, Text, Link } from "@nextui-org/react";
import React from "react";
import { currency } from "../../utils";
import CardStatus from "./CardStatus";
import NextLink from "next/link";

const CardSummary = ({ order }) => {
  const { status } = order;
  const { first_name, last_name, rut, phone, email } = order.customer;

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
      <Card.Body>
        <Text h1 className="reserva-summary-title">
          ¡Felicitaciones por tu reserva!
        </Text>
        <Text h2 className="reserva-summary-subtitle">
          {first_name} {last_name}
        </Text>
        <CardStatus status={status} id={order.purchase_order} />
        <Card.Divider css={{ margin: "24px 0" }}></Card.Divider>
        <Row
          css={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
          className="reserva-summary-detail"
        >
          <Text>
            Nombre:{" "}
            <span>
              {first_name} {last_name}
            </span>
          </Text>
          <Text>
            Rut: <span>{rut}</span>
          </Text>
          <Text>
            Celular: <span>{phone}</span>
          </Text>
          <Text>
            Email: <span>{email}</span>
          </Text>
          <Text>Concesionario seleccionado:</Text>
          <Text>
            <span>{order.subsidiary.name}</span>
          </Text>
        </Row>
        <Card.Divider css={{ margin: "24px 0" }}></Card.Divider>
        <Row
          css={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
          className="reserva-summary-detail"
        >
          <Text>
            Fecha transacción: <span>{order.transaction_date}</span>
          </Text>
          <Text>
            Tarjeta: <span>XXXX XXXX {order.card_digits}</span>
          </Text>
          <Text>
            Código de autorización: <span>{order.authorization_code}</span>
          </Text>
          <Text>
            Tipo de venta: <span>{email}</span>
          </Text>
          <Text>
            Valor: <span>{currency.format(order.amount)}</span>
          </Text>
        </Row>
        <Card.Divider css={{ margin: "24px 0" }}></Card.Divider>
        <Text h1 className="reserva-summary-title">
          ¿Tienes dudas?
        </Text>
        <Text h2 className="reserva-summary-substitle">
          No te preocupes, llámanos o escríbenos y te ayudamos.
        </Text>
        <NextLink href="tel:6006000080" passHref>
          <Link
            target="_blank"
            css={{ maxWidth: "100%", display: "inline-block" }}
          >
            <Button
              className="btn-secondary grey big "
              css={{ minWidth: "100%" }}
            >
              Llámanos al 600 600 800
            </Button>
          </Link>
        </NextLink>
      </Card.Body>
    </Card>
  );
};

export default CardSummary;
