import React, { FC, useRef, useState, useMemo } from "react";
import {
  Grid,
  Text,
  Row,
  Card,
  Input,
  Spacer,
  Button,
  Container,
  Checkbox,
} from "@nextui-org/react";
import { validations } from "../../utils";
import CarsColorsPreventa from "../cars/CarsColorsPreventa";
import { ModelResponse, IPUser } from "../../interfaces";
import { currency } from "../../utils";
import { Formik, Field, useFormik } from "formik";
import * as Yup from "yup";
import MaskedInput from "react-text-mask";

import Image from "next/image";

import { phoneNumberMask } from "../../utils/validations";
import { validateRut } from "../../utils/rut";
import CardHeader from "./CardHeader";
import FormPersonal from "./FormPersonal";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// interface Props {
//   model: ModelResponse;
//   setStep: (arg: number) => void;
//   user: IPUser;
//   setUser: (arg: IPUser) => void;
// }
// type FormData = {
//   name: string;
//   email: string;
//   rut: string;
//   lastname: string;
//   phone: string;
// };

const PreventaStep2 = ({ model, setData, data }) => {
  const regex = /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g;
  const formik = useFormik({
    initialValues: {
      rut: "",
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      opt: false,
    },
    validationSchema: Yup.object().shape({
      rut: Yup.string()
        .min(8, "El RUT debe de tener al menos 8 caracteres")
        .required("El RUT es requerido")
        .test("rut", "El rut es inválido", (val) => validateRut(val)),
      first_name: Yup.string()
        .min(3, "El nombre debe de tener al menos 3 caracteres")
        .max(100, "Has superado la cantidad de caracteres")
        .matches(regex, "Ingrese un nombre válido")
        .required("El nombre es requerido"),
      last_name: Yup.string()
        .min(3, "El apellido debe de tener al menos 3 caracteres")
        .matches(regex, "Ingrese un apellido válido")
        .max(100, "Has superado la cantidad de caracteres")
        .required("El apellido es requerido"),
      email: Yup.string()
        .max(100, "Has superado la cantidad de caracteres")
        .email("Email inválido")
        .required("El email es requerido"),
      phone: Yup.string()
        .matches(
          /\+56 [0-9]{1} [0-9]{4} [0-9]{4}/g,
          "Ingrese un celular válido"
        )
        .required("El teléfono es requerido"),
      rut: Yup.string()
        .min(9, "El RUT debe de tener al menos 9 caracteres")
        .required("El RUT es requerido")
        .test((val) => validateRut(val)),
      opt: Yup.boolean()
        .required("Debe de aceptar los Términos y condiciones")
        .oneOf([true], "Debe de aceptar los Términos y condiciones"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [selected, setSelected] = useState(false);
  useMemo(() => {
    formik.setFieldValue("opt", selected);
  }, [selected]);

  return (
    <Card css={{ w: "100%", h: "100%", p: "32px", maxWidth: "503px" }}>
      <Card.Body css={{ p: 0 }}>
        <CardHeader model={model} title={"Reserva tu"} />
        <Card.Divider css={{ margin: "24px 0" }}></Card.Divider>
        <Text h2 className="payment-header-title">
          Ingresa tus datos personales
        </Text>
        <Text h3 className="payment-header-subtitle">
          Para inscribirte en la reserva necesitamos datos de contacto.
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <FormPersonal
            selected={selected}
            data={data}
            setData={setData}
            model={model}
            formik={formik}
          />
          <Card.Divider css={{ margin: "24px 0" }}></Card.Divider>

          <div className="opt-disclaimer">
            <Checkbox isSelected={selected} onChange={setSelected}></Checkbox>

            <Text h6>
              Acepto ser contactado por Derco SpA* Términos y condiciones de
              privacidad terminos y condiciones
            </Text>
          </div>
          {formik.errors.opt && (
            <Text className="MuiFormHelperText-root">{formik.errors.opt}</Text>
          )}
          <Text h3 className="reserva-title-disclaimer">
            Valor reserva $200.000
          </Text>
          <Button
            iconRight={<NavigateNextIcon fill="currentColor" />}
            type="submit"
            className="btn-primary big"
          >
            Paga online
          </Button>
          <Spacer y={1} />
          <Image
            src="/assets/img/cyber/tarjetas.svg"
            alt="tarjetas"
            width={"100%"}
            height={48}
            objectFit="contain"
          />
        </form>
      </Card.Body>
    </Card>
  );
};

export default PreventaStep2;
