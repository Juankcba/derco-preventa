import { TextField } from "@mui/material";
import { Grid } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { IMaskInput } from 'react-imask';
import { validateRut } from "../../utils/rut";
import PropTypes from 'prop-types';

import { cesApi } from "../../apis";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask="##.###.###-#"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const FormPersonal = ({ setData, data, formik, selected }) => {

  const [loading, setLoading] = useState(true);
  const [rut, setRut] = useState("");
  const [errors, setErrors] = useState({});

  const getUserInfo = async () => {
    formik.resetForm();
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
    } else {
      formik.resetForm();
    }
  };

  useEffect(() => {
    if (rut.length === 0) {
      formik.resetForm();
    }

    if ((rut?.length > 1 && !validateRut(rut)) ) {
      setErrors({ ...errors, rut: "Ingrese un rut válido" });
    } else if (validateRut(rut) ) {
      setErrors((e) => {
        const object = { ...e };
        delete object["rut"];
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
    <Grid.Container gap={2} css={{ p: 0, width: "100%" }}>
      <Grid xs={12}>
        <TextField
          fullWidth
          label="Rut:"
          value={rut}
          onChange={handleChangeRut}
          name="rut"
          id="formatted-rut-input"
          InputProps={{
            inputComponent: TextMaskCustom,
          }}
          helperColor={"error"}
          helperText={ rut && errors?.rut ? errors.rut : "" }
        />
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
  );
};

export default FormPersonal;
