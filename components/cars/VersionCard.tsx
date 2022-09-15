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
import { Version } from "../../interfaces";
import Image from "next/image";
import { currency } from "../../utils";

interface Props {
  version: Version;
}
const VersionCard: FC<Props> = ({ version }) => {
  const router = useRouter();
  const onClick = () => {
    router.push(
      `/auto/${version.model.brandName.toLowerCase()}/${version.model.slug}`
    );
  };
  const onClickReserva = () => {
    router.push(
      `/reserva/${version.model.brandName.toLowerCase()}/${version.model.slug}`
    );
  };

  const stock = Math.floor(Math.random() * 2);

  return (
    <Card isHoverable isPressable className="cyber-card">
      <Card.Header className="cyber-card-header">
        <div className="cyber-badge">35%</div>

        <Card.Image
          src={version.image.url}
          width="100%"
          height={126}
          alt={version.image.url}
          objectFit="contain"
          id={version.image.url}
          css={{
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
              {version.model.brandName}
            </span>{" "}
            | {version.name}
          </Text>
          <Text h3 className="subtitle">
            {version.model.name}
          </Text>
        </Row>
        <div className="card-spacer-1"></div>
        <Row
          justify="flex-start"
          css={{ flexDirection: "column" }}
          className="prices-card"
        >
          <Text className="price-primary" color="#e0102c">
            {currency.format(version.minPrice * (1 - 0.35))}*
          </Text>
          <Text className="price-before">
            Antes{" "}
            <span
              style={{ textDecoration: "line-through", paddingLeft: "0.25rem" }}
            >
              {currency.format(version.prices[0].value)}
            </span>
          </Text>
          {version.prices[1].diff > 0 && (
            <Text className="price-bonus" color="#e0102c">
              Bono cyber:
              <span style={{ paddingLeft: "0.25rem" }}>
                {currency.format(version.prices[1].diff)}
              </span>
            </Text>
          )}
          {version.prices[2].diff > 0 && (
            <Text className="price-bonus" color="#e0102c">
              Bono financiamiento:
              <span style={{ paddingLeft: "0.25rem" }}>
                {currency.format(version.prices[2].diff)}
              </span>
            </Text>
          )}
        </Row>
        <Row
          justify="flex-start"
          css={{ flexDirection: "column", width: "100%" }}
        >
          <Button
            auto
            type="button"
            color="primary"
            disabled={stock == 0 ? true : false}
            css={{
              width: "100%",
              backgroundColor: "#e0102c",
              color: "white",
            }}
            onClick={onClickReserva}
          >
            Reservar
          </Button>
          <Text className="disclaimer">*Incluye IVA y Bono marca.</Text>
        </Row>
      </Card.Body>
      <Card.Footer
        className="cyber-card-footer"
        css={{ bgColor: stock == 0 ? "#57585C" : "#E0102C" }}
      >
        {stock == 0 ? (
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
            Quedan 20u en stock.
          </Text>
        )}
      </Card.Footer>
    </Card>
  );
};

export default VersionCard;
