import { FC } from "react";
import { useRouter } from "next/router";

import { Card, Grid, Row, Text } from "@nextui-org/react";
import { Version } from "../../interfaces";

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

  return (
    <Grid xs={6} sm={3} md={3} xl={2} key={version.id}>
      <Card isHoverable isPressable onClick={onClick}>
        <Card.Body css={{ p: 1 }}>
          <Card.Image src={version.image.url} width="100%" height={140} />
        </Card.Body>
        <Card.Footer>
          <Row justify="flex-start" css={{ flexDirection: "column" }}>
            <Text h2 size={16}>
              {version.name}
            </Text>
            <Text h3 size={14}>
              {version.model.name}
            </Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};

export default VersionCard;
