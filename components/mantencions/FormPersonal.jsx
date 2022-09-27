import { Grid, Text } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { validateRut } from "../../utils/rut";
import createRutMask from "text-mask-rut";
import InputMask from "react-input-mask";
import { Box, MenuItem, TextField } from "@mui/material";
import { cesApi } from "../../apis";

const FormPersonal = ({ formik, selected, data, setData }) => {
  const rutMask = createRutMask();

  const [loading, setLoading] = useState(true);
  const [rut, setRut] = useState("");
  const [errors, setErrors] = useState({});
  const getUserInfo = async () => {
    formik.setFieldValue("opt", selected);
    if (validateRut(rut) && rut.length > 1) {
      setLoading(true);
      try {
        await cesApi
          .get("pre-order/customers", {
            params: {
              rut: rut,
            },
          })
          .then((response) => {
            if (response.status == 200) {
              const { email, phone, first_name, last_name, rut } =
                response.data;
              setData({
                ...data,
                user: {
                  email: email,
                  phone: phone,
                  first_name: first_name,
                  last_name: last_name,
                  rut: rut,
                },
              });
              formik.setFieldValue("rut", rut);
              formik.setFieldValue("email", email);
              formik.setFieldValue("first_name", first_name);
              formik.setFieldValue("last_name", last_name);
              formik.setFieldValue("phone", phone);
            } else {
              formik.setFieldValue("rut", rut);
            }
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  const formatRut = (e) => {
    console.log("format", e);
    const regex = /[`~,.<>;':"\/\[\]\|{}()=_+-]/;
    if (!regex.test(e.target.value)) {
      return;
    } else {
      const last_value = e.target.value.slice(-1);
      if (last_value === "_" || last_value === "-") {
        setRut((v) =>
          e.target.validity.valid
            ? { ...formData, rut: e.target.value.slice(0, -1) }
            : v
        );
      } else {
        setRut((v) =>
          e.target.validity.valid ? { ...formData, rut: e.target.value } : v
        );
      }
    }
  };

  useEffect(() => {
    console.log("rut", rut);
    const incluye_guion_alto = rut.includes("-");
    const incluye_guion_bajo = rut.includes("_");

    if (rut.length === 0) {
      formik.resetForm();
    }

    if (!incluye_guion_alto && !incluye_guion_bajo && rut.length === 10) {
      const first_9_digits = rut.slice(0, -1);
      const last_digit = rut.slice(-1);
      setRut(first_9_digits + "-" + last_digit);
    }
    const two_values_rut = rut.split("-");
    const first_value_check =
      two_values_rut[0]?.length > 0 &&
      two_values_rut[0] !== "_" &&
      two_values_rut[0] !== undefined
        ? true
        : false;
    const second_value_check =
      two_values_rut[1]?.length > 0 &&
      two_values_rut[1] !== "_" &&
      two_values_rut[1] !== undefined
        ? true
        : false;
    if ((rut?.length > 1 && !validateRut(rut)) || incluye_guion_bajo) {
      setErrors({ ...errors, rut: "Ingrese un rut válido" });
    } else if (validateRut(rut) && first_value_check && second_value_check) {
      setErrors((e) => {
        const object = { ...e };
        delete object["rut"];
        console.log("valido");
        getUserInfo();
        return object;
      });
    }
  }, [rut]);

  const handleChangeRut = (e) => {
    formik.resetForm();
    setRut(e.target.value);
  };
  return (
    <div>
      <Text h2 className="reserva-mantenciones-title">
        Datos de contacto:
      </Text>
      <Grid.Container gap={2} css={{ p: 0, width: "100%" }}>
        <Grid xs={12}>
          <InputMask
            id="preventa-cars-rut"
            name="rut"
            mask={rutMask}
            value={rut}
            fullWidth
            required
            label="RUT"
            onChange={(e) => handleChangeRut(e)}
            onBlur={(e) => handleChangeRut(e)}
          >
            {(inputProps) => <TextField {...inputProps} />}
          </InputMask>
          {/* <TextField
            id="preventa-cars-rut"
            name="rut"
            mask={RutTextMask}
            onChange={(e) => formatRut(e)}
            value={rut}
            fullWidth
            required
            label="RUT"
          /> */}
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            required
            id="preventa-cars-first-name"
            name="first_name"
            label="Ingresa tu Nombre"
            onChange={formik.handleChange}
            value={formik.values.first_name}
            disabled={loading}
            helperColor={"error"}
            helperText={
              formik.errors.first_name && formik.touched.first_name
                ? formik.errors.first_name
                : ""
            }
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            required
            id="preventa-cars-last-name"
            name="last_name"
            label="Ingresa tu Apellido"
            onChange={formik.handleChange}
            value={formik.values.last_name}
            disabled={loading}
            helperColor={"error"}
            helperText={
              formik.errors.last_name && formik.touched.last_name
                ? formik.errors.last_name
                : ""
            }
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
            disabled={loading}
            helperColor={"error"}
            helperText={
              formik.errors.phone && formik.touched.phone
                ? formik.errors.phone
                : ""
            }
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
            disabled={loading}
            helperColor={"error"}
            helperText={
              formik.errors.email && formik.touched.email
                ? formik.errors.email
                : ""
            }
          />
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default FormPersonal;
