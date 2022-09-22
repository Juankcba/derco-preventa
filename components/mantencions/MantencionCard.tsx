import { FC } from "react";
import { useRouter } from "next/router";

import {
  Badge,
  Button,
  Card,
  Grid,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import Image from "next/image";
import { currency } from "../../utils";
import { Auto, Mantencion } from "../../interfaces";

interface Props {
  mantencion: Auto;
}

const MantencionCard: FC<Props> = ({ mantencion }) => {
  const router = useRouter();
  const onClickReserva = () => {
    router.push(
      `/reserva/mantencion/${mantencion.brand_slug.toLowerCase()}/${
        mantencion.version_slug
      }`
    );
  };
  return (
    <Card isHoverable isPressable className="cyber-card mantencion">
      <Card.Header className="cyber-card-header mantencion">
        <div className="cyber-badge">
          {((mantencion.brand_price - mantencion.list_price) /
            mantencion.list_price) *
            -100}
          %
        </div>

        <Card.Image
          src={`/assets/img/mantenciones/${mantencion.class_name}.svg`}
          width="100%"
          height={73}
          alt={mantencion.class_name}
          objectFit="contain"
          css={{
            "@mdMax": {
              marginTop: "7px",
              height: "44px",
              objectFit: "scale-down",
            },
          }}
        />

        {/* <Image
              src={`https://dercocenter-cl-static-prod.s3.amazonaws.com/assets/brands-logos/${version.model.brandName
                .toLowerCase()
                .replace(" ", "-")}/logo-vertical-colors.svg`}
              alt={version.model.name}
              height={65}
              width={102}
            /> */}
      </Card.Header>
      <Card.Body className="cyber-card-body mantencion">
        <Row
          justify={"flex-start"}
          css={{
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Text h2 className="title-matencion">
            Mantención {mantencion.class_name}
          </Text>
          <Text h3 className="subtitle">
            {mantencion.version_name} km
          </Text>
        </Row>
        <div className="card-spacer-1"></div>
        <Row
          justify="flex-start"
          css={{ flexDirection: "column" }}
          className="prices-card mantencion"
        >
          <Text className="price-primary" color="#e0102c">
            {currency.format(mantencion.brand_price)}
          </Text>
          <Text className="price-before">
            Antes{" "}
            <span
              style={{ textDecoration: "line-through", paddingLeft: "0.25rem" }}
            >
              {currency.format(mantencion.list_price)}
            </span>
          </Text>
        </Row>
        <Row
          justify="flex-start"
          css={{ flexDirection: "column", width: "100%" }}
        >
          <Button
            id={`cyber22-cta-home-mantenimiento-${mantencion.brand_name}-${mantencion.class_name}-${mantencion.version_name}`}
            auto
            type="button"
            light
            css={{
              width: "100%",
              backgroundColor: "#e0102c",
              color: "white",
            }}
            onPress={onClickReserva}
          >
            Reservar
          </Button>
          {/* <Text className="disclaimer">*Incluye IVA y Bono marca.</Text> */}
        </Row>
      </Card.Body>
      <Card.Footer
        className="cyber-card-footer"
        css={{
          bgColor:
            parseInt(mantencion.stock_availabe, 10) == 0
              ? "#57585C"
              : "#E0102C",
        }}
      >
        {parseInt(mantencion.stock_availabe, 10) == 0 ? (
          <Text
            h3
            size={14}
            className="text-content"
            css={{ color: "#A4A4A6" }}
          >
            (Stock agotado)
          </Text>
        ) : (
          <Text h3 size={14} className="text-content" css={{ color: "#fff" }}>
            Quedan {mantencion.stock_availabe} en stock.
          </Text>
        )}
      </Card.Footer>
    </Card>
  );
};

export default MantencionCard;
