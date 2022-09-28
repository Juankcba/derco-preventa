import { Grid, Text } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { validateRut } from "../../utils/rut";
import { IMaskInput } from 'react-imask';
import { Box, MenuItem, TextField } from "@mui/material";
import { cesApi } from "../../apis";
import PropTypes from 'prop-types';

const TextMaskRut = React.forwardRef(function TextMaskRut(props, ref) {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask="##.###.###-#"
      definitions={{
        '#': /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskRut.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const TextMaskPhone = React.forwardRef(function TextMaskPhone(props, ref) {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask="+56 # #### ####"
      definitions={{
        '#': /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskPhone.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const FormPersonal = ({ formik, selected, data, setData }) => {

  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    const rutAux = formik.values.rut
    formik.setFieldValue("opt", selected);
    if (validateRut(rutAux) && rutAux.length > 1) {
      setLoading(true);
      try {
        await cesApi
          .get("pre-order/customers", {
            params: {
              rut: rutAux,
            },
          })
          .then((response) => {
            if (response.status == 200) {
              const { email, phone, first_name, last_name, rut } = response.data;
              if ( email && phone && first_name && last_name && rut ) {
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
                formik.values.rut = rut;
                formik.values.email = email;
                formik.values.first_name = first_name;
                formik.values.last_name = last_name;
                formik.values.phone = phone;
              } else {
                formik.values.rut = rutAux;
                formik.values.email = '';
                formik.values.first_name = '';
                formik.values.last_name = '';
                formik.values.phone = '';
              }
            } else {
              formik.setFieldValue("rut", rutAux);
            }
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };
  
  const handlerRut = () => {
    if ( !formik.values.rut ) {
      formik.resetForm();
    } else {
      getUserInfo();
    }
  }

  return (
    <div>
      <Text h2 className="reserva-mantenciones-title">
        Datos de contacto:
      </Text>
      <Grid.Container gap={2} css={{ p: 0, width: "100%" }}>
        <Grid xs={12}>
          <TextField
            fullWidth
            label="Rut"
            value={formik.values.rut}
            onChange={formik.handleChange}
            onBlur={ handlerRut }
            name="rut"
            id="formatted-rut-input"
            InputProps={{
              inputComponent: TextMaskRut,
            }}
            helperColor={"error"}
            helperText={ formik.errors.rut && formik.values.rut ? formik.errors.rut : "" }
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
            helperText={ formik.errors.first_name && formik.values.first_name ? formik.errors.first_name : "" }
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
            helperText={ formik.errors.last_name && formik.values.last_name ? formik.errors.last_name : "" }
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            id="preventa-cars-phone"
            label="Ingresa tu número de celular"
            value={formik.values.phone}
            onChange={formik.handleChange}
            name="phone"
            InputProps={{
              inputComponent: TextMaskPhone,
            }}
            helperColor={"error"}
            helperText={ formik.errors.phone && formik.values.phone ? formik.errors.phone : "" }
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
            helperText={ formik.errors.email && formik.values.email ? formik.errors.email : "" }
          />
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default FormPersonal;
