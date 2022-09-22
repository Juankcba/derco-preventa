import { Box, MenuItem, TextField } from "@mui/material";
import { Row, Text, Button, Grid } from "@nextui-org/react";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { validateRut } from "../../utils/rut";
const FormPersonal = () => {
  let regex = /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g;
  const formik = useFormik({
    initialValues: {
      rut: "",
      name: "",
      lastname: "",
      phone: "",
      email: "",
      opt: false,
    },
    validationSchema: Yup.object().shape({
      rut: Yup.string()
        .min(8, "El RUT debe de tener al menos 8 caracteres")
        .required("El RUT es requerido")
        .test("rut", "El rut es inválido", (val) => validateRut(val)),
      name: Yup.string()
        .min(3, "El nombre debe de tener al menos 3 caracteres")
        .max(100, "Has superado la cantidad de caracteres")
        .matches(regex, "Ingrese un nombre válido")
        .required("El nombre es requerido"),
      lastname: Yup.string()
        .min(3, "El apellido debe de tener al menos 3 caracteres")
        .matches(regex, "Ingrese un apellido válido")
        .max(100, "Has superado la cantidad de caracteres")
        .required("El apellido es requerido"),
      email: Yup.string()
        .max(100, "Has superado la cantidad de caracteres")
        .email("Email inválido")
        .required("El email es requerido"),
      phone: Yup.string().required("El teléfono es requerido"),
      rut: Yup.string()
        .min(9, "El RUT debe de tener al menos 9 caracteres")
        .required("El RUT es requerido")
        .test((val) => validateRut(val)),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid.Container gap={2} css={{ p: 0, width: "100%" }}>
        <Grid xs={12}>
          <TextField
            fullWidth
            required
            id="preventa-cars-rut"
            name="rut"
            label="RUT"
            onChange={formik.handleChange}
            value={formik.values.rut}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            required
            id="preventa-cars-name"
            name="name"
            label="Ingresa tu Nombre"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            required
            id="preventa-cars-lastname"
            name="lastname"
            label="Ingresa tu Apellido"
            onChange={formik.handleChange}
            value={formik.values.lastname}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            required
            id="preventa-cars-phone"
            name="phone"
            label="Ingresa tu número de celular"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            required
            id="preventa-cars-email"
            name="email"
            label="Ingresa tu correo"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </Grid>
      </Grid.Container>
    </form>
  );
};

export default FormPersonal;
