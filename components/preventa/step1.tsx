import React, { FC, useState } from "react";
import {
  Grid,
  Text,
  Row,
  Card,
  Input,
  Spacer,
  Button,
} from "@nextui-org/react";
import CarsColorsPreventa from "../cars/CarsColorsPreventa";
import { IPUser, ModelResponse } from "../../interfaces";
import { currency } from "../../utils";

interface Props {
  model: ModelResponse;
  setStep: (arg: number) => void;
  user: IPUser;
  setUser: (arg: IPUser) => void;
}
const PreventaStep1: FC<Props> = ({ model, setStep, user, setUser }) => {
  const [rut, setRut] = useState("");
  const handleStep = () => {
    setUser({ ...user, rut: rut });
    setStep(2);
  };
  return (
    <Card>
      <Card.Body>
        <Text h1>{model.name}</Text>
        <Text h4>
          Para que reserver tu <strong>{model.name}</strong> por{" "}
          {currency.format(50000)} necesitamos tu RUT
        </Text>
        <Spacer y={1.2} />
        <Grid.Container>
          <Grid xs={8}>
            <Input
              bordered
              labelPlaceholder="INGRESA TU RUT"
              color="default"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
            />
          </Grid>
          <Grid xs={8} css={{ marginTop: "16px" }}>
            <Button type="button" onClick={handleStep}>
              Continuar
            </Button>
          </Grid>
        </Grid.Container>
      </Card.Body>
    </Card>
  );
};

export default PreventaStep1;
