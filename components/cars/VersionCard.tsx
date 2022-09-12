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
    <Grid xs={12} sm={6} md={3} xl={3} key={version.id}>
      <Card isHoverable isPressable className="cyber-card">
        <Card.Header onClick={onClick} className="cyber-card-header">
          <div className="cyber-badge">35%</div>
          <Card.Image src={version.image.url} width="100%" height={200} />

          {/* <Image
              src={`https://dercocenter-cl-static-prod.s3.amazonaws.com/assets/brands-logos/${version.model.brandName
                .toLowerCase()
                .replace(" ", "-")}/logo-vertical-colors.svg`}
              alt={version.model.name}
              height={65}
              width={102}
            /> */}
          <Row justify={"flex-start"} css={{ flexDirection: "column" }}>
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
        </Card.Header>
        <Card.Body className="cyber-card-body">
          <Spacer y={1} className="spacer-grey" />
          <Row justify="flex-start" css={{ flexDirection: "column" }}>
            <Text h2 size={16} css={{ marginBottom: 0 }}>
              Desde
            </Text>
            <Text h3 size={20} color="#e0102c">
              {currency.format(version.minPrice)}
            </Text>
            <Button
              type="button"
              light
              css={{ backgroundColor: "#e0102c", color: "white" }}
              onClick={onClickReserva}
            >
              Reservar
            </Button>
          </Row>
        </Card.Body>
        <Card.Footer className="cyber-card-footer">
          <Text h3 size={14} className="text-content">
            {version.model.name}
          </Text>
        </Card.Footer>
      </Card>
    </Grid>
  );
};

export default VersionCard;
