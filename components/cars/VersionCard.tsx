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

  return (
    <Card isHoverable isPressable className="cyber-card">
      <Card.Header onClick={onClick} className="cyber-card-header">
        <div className="cyber-badge">35%</div>
        <Spacer css={{ marginTop: "20px" }} />

        <Card.Image
          src={version.image.url}
          width="100%"
          height={200}
          alt={version.image.url}
          objectFit="contain"
          css={{
            "@mdMax": {
              height: "76px",
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
        <Spacer y={1} className="spacer-grey" />
        <Row
          justify="flex-start"
          css={{ flexDirection: "column" }}
          className="prices-card"
        >
          <Text h3 size={20} color="#e0102c">
            {currency.format(version.minPrice * (1 - 0.35))}*
          </Text>
          <Text>
            Antes{" "}
            <span style={{ textDecoration: "line-through" }}>
              {currency.format(version.prices[0].value)}
            </span>
          </Text>
          {version.prices[1].diff > 0 && (
            <Text color="#e0102c">
              Bono marca: <span>{currency.format(version.prices[1].diff)}</span>
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
            light
            css={{
              width: "100%",
              backgroundColor: "#e0102c",
              color: "white",
              marginTop: "16px",
            }}
            onClick={onClickReserva}
          >
            Reservar
          </Button>
          <Text className="disclaimer">*Incluye IVA y Bono marca.</Text>
        </Row>
      </Card.Body>
      <Card.Footer className="cyber-card-footer">
        <Text h3 size={14} className="text-content">
          {version.model.name}
        </Text>
      </Card.Footer>
    </Card>
  );
};

export default VersionCard;
