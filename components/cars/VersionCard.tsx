import { FC } from "react";
import { useRouter } from "next/router";

import { Button, Card, Grid, Row, Text } from "@nextui-org/react";
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
    <Grid xs={12} sm={6} md={3} xl={3} key={version.id}>
      <Card isHoverable isPressable>
        <Card.Header onClick={onClick}>
          <Row justify="flex-start" css={{ gap: "16px", height: "70px" }}>
            <Image
              src={`https://dercocenter-cl-static-prod.s3.amazonaws.com/assets/brands-logos/${version.model.brandName
                .toLowerCase()
                .replace(" ", "-")}/logo-vertical-colors.svg`}
              alt={version.model.name}
              height={65}
              width={102}
            />
            <Row justify="flex-start" css={{ flexDirection: "column" }}>
              <Text h2 size={16} css={{ marginBottom: 0 }}>
                {version.name}
              </Text>
              <Text h3 size={14}>
                {version.model.name}
              </Text>
            </Row>
          </Row>
        </Card.Header>
        <Card.Body css={{ p: 1 }}>
          <Card.Image src={version.image.url} width="100%" height={200} />
        </Card.Body>
        <Card.Footer>
          <Row justify="flex-start" css={{ flexDirection: "column" }}>
            <Text h2 size={16} css={{ marginBottom: 0 }}>
              Desde
            </Text>
            <Text h3 size={20} color="#e0102c">
              {currency.format(version.minPrice)}
            </Text>
          </Row>
          <Button
            type="button"
            light
            css={{ backgroundColor: "#e0102c", color: "white" }}
            onClick={onClickReserva}
          >
            Reservar
          </Button>
        </Card.Footer>
      </Card>
    </Grid>
  );
};

export default VersionCard;
