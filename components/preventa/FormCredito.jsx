import { Box, MenuItem, TextField } from "@mui/material";
import { Row, Text, Button } from "@nextui-org/react";
import React, { useState } from "react";
import { useFormik } from "formik";
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

const nacionalidad = [
  { value: "Chilena", label: "Chilena" },
  { value: "Extranjera", label: "Extranjera" },
];
const trabajo = [
  { value: "Dependiente", label: "Dependiente" },
  { value: "Independiente", label: "Independiente" },
];
const years = [
  { value: 1, label: "1 Año" },
  { value: 2, label: "2 Años" },
  { value: 3, label: "3 Años" },
  { value: 4, label: "4 Años" },
  { value: 5, label: "5 Años" },
  { value: 6, label: "6 Años" },
  { value: 7, label: "7 Años" },
  { value: 8, label: "8 Años" },
  { value: 9, label: "9 Años" },
  { value: 10, label: "10 Años" },
];

const FormCredito = () => {
  const [creditState, setCreditState] = useState(true);
  const [currency, setCurrency] = React.useState("EUR");
  const formik = useFormik({
    initialValues: {
      pie: "",
      terms: "",
      nacionality: "Chilena",
      income: 0,
      workType: "Dependiente",
      workYears: 2,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Text>¿Deseas evaluar un crédito en línea?</Text>
      <Row className="btn-group flex-start">
        <Button
          type="button"
          className={creditState ? "btn-active group" : "btn-deactive group"}
          onPress={() => setCreditState(true)}
        >
          Si
        </Button>
        <Button
          type="button"
          className={!creditState ? "btn-active group" : "btn-deactive group"}
          onPress={() => setCreditState(false)}
        >
          No
        </Button>
      </Row>
      {creditState && (
        <>
          <Text>Tipo de crédito</Text>
          <Row className="btn-group flex-start">
            <Button
              type="button"
              className={
                creditState ? "btn-active group" : "btn-deactive group"
              }
              onPress={() => setCreditState(true)}
            >
              Convencional
            </Button>
            <Button
              type="button"
              className={
                !creditState ? "btn-active group" : "btn-deactive group"
              }
              onPress={() => setCreditState(false)}
            >
              Inteligente
            </Button>
          </Row>

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "47%" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="preventa-cars-pie"
                name="pie"
                label="Pie"
                onChange={formik.handleChange}
                value={formik.values.pie}
              />
              <TextField
                required
                id="preventa-cars-terms"
                label="Plazo"
                name="terms"
                onChange={formik.handleChange}
                value={formik.values.terms}
              />
              <TextField
                id="outlined-select-nacionality"
                select
                label="Nacionalidad"
                name="nacionality"
                onChange={formik.handleChange}
                value={formik.values.nacionality}
                helperText="Please select your currency"
              >
                <MenuItem value={""} disabled>
                  Seleccione una opción
                </MenuItem>
                {nacionalidad.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-select-work-type"
                select
                label="Tipo de trabajo"
                name="workType"
                onChange={formik.handleChange}
                value={formik.values.workType}
              >
                <MenuItem value={""} disabled>
                  Seleccione una opción
                </MenuItem>
                {trabajo.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                id="outlined-disabled"
                label="Ingreso mensual"
                name="income"
                onChange={formik.handleChange}
                value={formik.values.income}
              />
              <TextField
                id="outlined-select-work-type"
                select
                label="Años trabajados"
                helperText="Please select your currency"
                name="income"
                onChange={formik.handleChange}
                value={formik.values.income}
              >
                <MenuItem value={""} disabled>
                  Seleccione una opción
                </MenuItem>
                {years.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Box>
        </>
      )}
    </form>
  );
};

export default FormCredito;
