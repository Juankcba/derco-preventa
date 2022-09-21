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
  const [currency, setCurrency] = React.useState("EUR");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

  return (
    <Card css={{ w: "100%", h: "100%" }}>
      <Card.Body>
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

        <Text>¿Deseas evaluar un crédito en línea?</Text>
        <Text>Tipo de crédito</Text>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "34ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="preventa-cars-pie"
              label="Pie"
              defaultValue="Pie"
            />
            <TextField
              required
              id="preventa-cars-plazo"
              label="Plazo"
              defaultValue="Plazo"
            />
            <TextField
              required
              id="preventa-cars-nacionalidad"
              label="Nacionalidad"
              defaultValue="Nacionalidad"
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Tipo de trabajo"
              value={currency}
              onChange={handleChange}
              helperText="Please select your currency"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              id="outlined-disabled"
              label="Ingreso mensual"
              defaultValue="Hello World"
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Tipo de trabajo"
              value={currency}
              onChange={handleChange}
              helperText="Please select your currency"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Box>
      </Card.Body>
    </Card>
  );
};

export default PreventaStep3;
