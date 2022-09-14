import React, { FC, useState } from "react";
import {
  Grid,
  Text,
  Row,
  Card,
  Input,
  Spacer,
  Button,
  Dropdown,
} from "@nextui-org/react";
import { validations } from "../../utils";
import CarsColorsPreventa from "../cars/CarsColorsPreventa";
import { ModelResponse, IPUser } from "../../interfaces";
import { currency } from "../../utils";
import { useForm } from "react-hook-form";
// interface Props {
//   model: ModelResponse;
//   setStep: (arg: number) => void;
//   user: IPUser;
//   setUser: (arg: IPUser) => void;
//   selectedColor: String;
// }

const PreventaStep3 = ({ model, setStep, user, selectedColor }) => {
  const handleStep = (data) => {
    setStep(3);
  };
  const [versionSelected, setVersionSelected] = useState("");

  return (
    <Card css={{ w: "100%", h: "100%" }}>
      <Card.Body css={{ overflowY: "hidden" }}>
        <Text h1>{user.name}</Text>
        <Text h4>
          Ahora elige la versión de tu <strong>{model.name}</strong>, el color y
          el lugar donde queires ser atendido.
        </Text>
        <Spacer y={1.2} />
        <Grid.Container gap={1}>
          <Grid xs={12}>
            <Text>Seleccione una Versión</Text>
          </Grid>
          <Grid>
            <Dropdown>
              <Dropdown.Button flat css={{ textTransform: "capitalize" }}>
                {versionSelected
                  ? model.versions.filter(
                      (v) => v.id == parseInt(versionSelected, 10)
                    )[0].name
                  : "  Seleccione la Versión"}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Categories Actions"
                selectionMode="single"
                selectedKeys={[versionSelected]}
                onAction={(actionKey) => setVersionSelected(actionKey)}
                items={model.versions}
              >
                {model.versions.map((version) => (
                  <Dropdown.Item key={version.id}>{version.name}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Grid>
          <Grid xs={12} css={{ flexDirection: "column" }}>
            <Text>El color seleccionado </Text>
            <Text>{selectedColor}</Text>
          </Grid>
        </Grid.Container>
      </Card.Body>
    </Card>
  );
};

export default PreventaStep3;
