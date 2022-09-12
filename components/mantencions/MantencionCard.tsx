import { Card, Grid, Row, Text } from "@nextui-org/react";
import React, { FC } from "react";
import { Mantencion } from "../../interfaces";

interface Props {
  mantencion: Mantencion;
}

const MantencionCard: FC<Props> = ({ mantencion }) => {
  return (
    <Grid xs={6} sm={6} md={3} xl={4} key={mantencion.id}>
      <Card isHoverable isPressable className="cyber-card">
        <Card.Header className="cyber-card-header">
          <div className="cyber-badge">35%</div>
          <Card.Image
            src="/assets/img/cyber/mantention.svg"
            width="100%"
            height={200}
          />
          <Row justify={"flex-start"} css={{ flexDirection: "column" }}>
            <Text h2 className="title">
              {mantencion.name}
            </Text>
            <Text h3 className="subtitle">
              {mantencion.kms} km
            </Text>
            <Text h3 className="subtitle">
              Categoria {mantencion.category}
            </Text>
          </Row>
        </Card.Header>
        <Card.Body className="cyber-card-body"></Card.Body>
        <Card.Footer className="cyber-card-footer">
          <Text h3 size={14} className="text-content">
            Quedan 20u en stock
          </Text>
        </Card.Footer>
      </Card>
    </Grid>
  );
};

export default MantencionCard;
