import { Button, Text } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import {
  isBrowser,
  isMobile,
  isIOS,
  isTablet,
  isAndroid,
  osName,
} from "react-device-detect";

import { modelos } from "../../database/constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MenuItem, Select, TextField } from "@mui/material";

const VerifyMaintenance = ({ model, setStep, setMsg, setData, data }) => {
  const [marcasOptions, setMarcasOptions] = useState([]);

  useEffect(() => {
    let marcasAux = modelos.map((m) => m.brand);

    const dataArr = new Set(marcasAux);
    setMarcasOptions([...dataArr]);
  }, [modelos]);

  // useMemo(() => {
  //   if (selectMarca != "") {
  //     setModelosOptions(modelos.filter((m) => m.brand == selectMarca));
  //     formik.resetForm();
  //   }
  // }, [selectMarca]);

  const formik = useFormik({
    initialValues: {
      marca: "",
      modelo: "",
    },
    validationSchema: Yup.object().shape({
      marca: Yup.string().required("La marca es requerido"),
      modelo: Yup.object().required("El modelo es requerido"),
    }),
    onSubmit: (values) => {
      console.log("submit", values);
      console.log(
        "verificar",
        model.version_name,
        values.modelo.category,
        model.version_name.includes(values.modelo.category)
      );
      setData({ ...data, verify: { modelo: { ...values.modelo } } });

      if (model.version_name.includes(values.modelo.category)) {
        setStep(3);
        setMsg(true);
      } else {
        setStep(2);
        setMsg(true);
      }
    },
  });

  const handleStep = (state) => {
    setStep(state);
    setMsg(false);
  };

  return (
    <div className="verify_maintenance">
      <Button
        className="card__header__button btn-primary big"
        onPress={() => handleStep(3)}
      >
        Pagar mantención
      </Button>
      <hr></hr>
      <div className="card__body">
        <Text h3 className="card__body__title">
          Si no estas seguro de que la mantención sea compatible con tu vehículo
        </Text>
        <Text className="card__body__text">Ingresa los siguientes datos:</Text>
        <form onSubmit={formik.handleSubmit} className="card__body__form">
          <TextField
            style={{ marginBottom: "16px" }}
            fullWidth
            select
            value={formik.values.marca}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helpercolor={"error"}
            name="marca"
            label="Selecciona la Marca"
            helperText={
              formik.errors.marca && formik.touched.marca
                ? formik.errors.marca
                : ""
            }
          >
            {marcasOptions.map((marca) => (
              <MenuItem key={marca} value={marca}>
                {marca}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            style={{ marginBottom: "16px" }}
            select
            value={formik.values.modelo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helpercolor={"error"}
            label="Selecciona el modelo"
            name="modelo"
            disabled={
              modelos.filter((m) => m.brand == formik.values.marca).length == 0
            }
            SelectProps={{
              MenuProps: {
                sx: { maxHeight: "50%" },
              },
            }}
            helperText={
              formik.errors.modelo && formik.touched.modelo
                ? formik.errors.modelo
                : ""
            }
          >
            {modelos
              .filter((m) => m.brand == formik.values.marca)
              .map((modelo) => (
                <MenuItem key={modelo.id} value={modelo}>
                  {modelo.model}
                </MenuItem>
              ))}
          </TextField>

          <Button type="submit" className="button_verify btn-primary big">
            Verificar mantención
          </Button>
        </form>
      </div>
      {/* <div className="card_footer">
        <div className="card_footer__text">
          <span className="card_footer__text__title">Bases legales</span>
          <br />
          <span className="card_footer__text__subtitle">
            Hacer referencia a si mentiste o te equivocaste{" "}
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default VerifyMaintenance;
