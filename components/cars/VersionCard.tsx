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
import { Auto, Version } from "../../interfaces";
import Image from "next/image";
import { currency } from "../../utils";

interface Props {
  version: Auto;
}
const VersionCard: FC<Props> = ({ version }) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/auto/${version.brand_slug.toLowerCase()}/${version.sap}`);
  };
  const onClickReserva = () => {
    router.push(
      `/reserva/auto/${version.brand_slug.toLowerCase()}/${
        version.model_slug
      }/${version.version_slug}`
    );
  };

  const stock = Math.floor(Math.random() * 2);

  return (
    <Card isHoverable className="cyber-card">
      <Card.Header
        className="cyber-card-header"
        onClick={() => onClickReserva()}
      >
        {/* <div className="cyber-badge">35%</div> */}

        <Card.Image
          src={version.image_url}
          width="100%"
          height={126}
          alt={version.image_url}
          objectFit="contain"
          id={version.image_url}
          css={{
            cursor: "pointer",
            "@mdMax": {
              height: "78px",
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
      <Card.Body className="cyber-card-body">
        <Row
          justify={"flex-start"}
          css={{
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Text h2 className="title">
            <span style={{ textTransform: "uppercase" }}>
              {version.brand_name}
            </span>{" "}
            | {version.version_name}
          </Text>
          <Text h3 className="subtitle">
            {version.model_name}
          </Text>
        </Row>
        <div className="card-spacer-1"></div>
        <Row
          justify="flex-start"
          css={{ flexDirection: "column" }}
          className="prices-card"
        >
          <Text className="price-primary" color="#e0102c">
            {currency.format(
              version.list_price -
                (version.list_price -
                  version.brand_price +
                  (version.list_price - version.financial_price))
            )}
            *
          </Text>
          <Text className="price-before">
            Antes{" "}
            <span
              style={{ textDecoration: "line-through", paddingLeft: "0.25rem" }}
            >
              {currency.format(version.list_price)}
            </span>
          </Text>
          {version.brand_price > 0 && (
            <Text className="price-bonus" color="#e0102c">
              Bono cyber:
              <span style={{ paddingLeft: "0.25rem" }}>
                {currency.format(version.list_price - version.brand_price)}
              </span>
            </Text>
          )}
          {version.financial_price > 0 && (
            <Text className="price-bonus" color="#e0102c">
              Bono financiamiento:
              <span style={{ paddingLeft: "0.25rem" }}>
                {currency.format(version.list_price - version.financial_price)}
              </span>
            </Text>
          )}
        </Row>
        <Row
          justify="flex-start"
          css={{ flexDirection: "column", width: "100%" }}
        >
          <Button
            id={`cyber22-cta-home-reservacion-${version.brand_slug}-${version.model_slug}-${version.version_slug}`}
            auto
            type="button"
            color="primary"
            disabled={parseInt(version.stock_availabe, 10) == 0 ? true : false}
            css={{
              width: "100%",
              backgroundColor: "#e0102c",
              color: "white",
            }}
            onPress={onClickReserva}
          >
            Reservar
          </Button>
          <Text className="disclaimer">
            *Incluye IVA, Bono cyber{" "}
            {version.financial_price > 0 && "y Bono financiamiento."}
          </Text>
        </Row>
      </Card.Body>
      <Card.Footer
        className="cyber-card-footer"
        css={{
          bgColor:
            parseInt(version.stock_availabe, 10) == 0 ? "#57585C" : "#E0102C",
        }}
      >
        {parseInt(version.stock_availabe, 10) == 0 ? (
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
            Quedan {version.stock_availabe}u en stock.
          </Text>
        )}
      </Card.Footer>
    </Card>
  );
};

export default VersionCard;
