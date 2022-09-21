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
import SelectColor from "./SelectColor";
import FormCredito from "./FormCredito";
import HelperSwipper from "./HelperSwipper";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
} from "@mui/material";
// interface Props {
//   model: ModelResponse;
//   setStep: (arg: number) => void;
//   user: IPUser;
//   setUser: (arg: IPUser) => void;
//   selectedColor: String;
// }

const PreventaStep3 = ({
  model,
  setStep,
  user,
  selectedColor,
  setColor,
  colors,
}) => {
  const handleStep = (data) => {
    setStep(3);
  };
  const [consecionario, setConsecionario] = useState(null);

  return (
    <Card css={{ w: "100%", h: "100%", p: "32px" }}>
      <Card.Body css={{ p: 0 }}>
        <Text>Por $200.000 reserva tu</Text>
        <Text>
          {model.brand_name} | {model.model_name}
        </Text>
        <Text>{model.version_name}</Text>
        <Card.Divider css={{ margin: "24px 0" }}></Card.Divider>
        <SelectColor setColor={setColor} colors={colors} />
        <Card.Divider css={{ margin: "24px 0" }}></Card.Divider>
        <Text>Selecciona tu concesionario</Text>
        <FormControl fullWidth>
          <InputLabel id="concesionario-select">Concesionario*</InputLabel>
          <Select
            labelId="concesionario-select"
            id="concesionario-simple-select"
            value={consecionario}
            label="Concesionario*"
            onChange={setConsecionario}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <FormCredito />
        <Card.Divider css={{ margin: "24px 0" }}></Card.Divider>
        <Button>Siguiente</Button>
        <Button>Volver</Button>
        <Card.Divider css={{ margin: "24px 0" }}></Card.Divider>
        <HelperSwipper />
      </Card.Body>
    </Card>
  );
};

export default PreventaStep3;
