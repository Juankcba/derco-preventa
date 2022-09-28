import { Button, Card, Row, Text, Link, Image } from "@nextui-org/react";
import React, { useState, useEffect, useRef } from "react";
import { currency, numberMil } from "../../utils";
import CardStatusReserva from "./CardStatusReserva";
import NextLink from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import storeApi from "./../../apis/storeApi";

const CardSummaryReserva = ({ order, mantencion }) => {
  const { status } = order;
  const { first_name, last_name, rut, phone, email } = order.customer;
  const [newOrden, setNewOrden] = useState(null);
  const transbankForm = useRef();
  const handleButton = async () => {
    await storeApi
      .get(
        `/pre-order/cyber-dc/${process.env.NEXT_PUBLIC_PREVENTA}/transaction/${order.token_ws}/retry`
      )
      .then((response) => {
        setNewOrden(response.data);
      });
  };

  useEffect(() => {
    if (newOrden != null) {
      transbankForm.current.submit();
    }
  }, [newOrden]);

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
        {status === "0" && (
          <>
            <Text h1 className="reserva-summary-title">
              ¡Compraste una mantencion de{" "}
              {numberMil.format(parseInt(order.car.model_name, 10))} km!
            </Text>
            <Text h2 className="reserva-summary-subtitle">
              {first_name} {last_name}
            </Text>
            <CardStatusReserva status={status} id={order.purchase_order} />
            <Text h3 className="reserva-mantencion-summary-subtitle">
              Te enviaremos los detalles a tu correo junto con la factura de tu
              compra, en las siguientes 48hs.
            </Text>
          </>
        )}
        {status === "403" && (
          <div className="reserva-summary-error-title">
            <Text h1>
              {first_name} {last_name}{" "}
            </Text>
            <Text h2>Quizas se agotó el tiempo de espera</Text>
            <Text h3>
              Tu reserva no se ha realizado, por favor selecciona una mantención
              nuevamente.
            </Text>
            <NextLink
              href={`/reserva/mantencion/${order.car.brand.slug}/${order.car.model_slug}/${order.car.version_slug}`}
              passHref
              css={{ width: "100%" }}
            >
              <Link css={{ maxWidth: "100%" }}>
                <Button
                  type="buton"
                  className="btn-primary big"
                  css={{ width: "100%" }}
                >
                  Ir a selección
                </Button>
              </Link>
            </NextLink>
          </div>
        )}
        {status != "0" && status != "403" && (
          <div className="reserva-summary-error-title">
            <Text h1>
              {first_name} {last_name}{" "}
            </Text>
            <Text h2>Hemos tenido problemas al procesar el pago</Text>
            <CardStatusReserva status={status} id={order.purchase_order} />
            <Text h3 css={{ marginTop: "24px" }}>
              Tu reserva no se ha realizado
            </Text>
            <Text h4 css={{ marginTop: "8px" }}>
              Valor reserva {currency.format(order.amount)}
            </Text>
            <div>
              <Button
                type="button"
                className="btn-primary big"
                css={{ width: "100%" }}
                onPress={() => handleButton()}
                iconRight={<NavigateNextIcon fill="currentColor" />}
              >
                Reintentar pago
              </Button>
              <div>
                <Image
                  src="/assets/img/cyber/tarjetas.svg"
                  alt="tarjetas"
                  width={300}
                  height={48}
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        )}

        <Card.Divider css={{ margin: "24px 0" }}></Card.Divider>
        <Row
          css={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            marginBottom: "16px",
          }}
          className="reserva-summary-detail"
        >
          <Text>
            Patente: <span>{order.patente}</span>
          </Text>
          <Text>
            Kilometraje actual: <span>{order.km} km</span>
          </Text>
          <Text>Concesionario seleccionado:</Text>
          <Text>
            <span>{order.subsidiary.name}</span>
          </Text>
        </Row>

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
        <div className="hidden">
          <form
            ref={transbankForm}
            method="post"
            action={newOrden?.form_action}
          >
            <input type="hidden" name="token_ws" value={newOrden?.token_ws} />
            <input
              className="button-next next hidden"
              type="submit"
              value="Paga Online"
            />
          </form>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardSummaryReserva;
