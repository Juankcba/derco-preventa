import React, { FC } from "react";
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
import { Formik, Field } from "formik";
import * as Yup from "yup";
import MaskedInput from "react-text-mask";
import createRutMask from "text-mask-rut";
import Image from "next/image";
const rutMask = createRutMask();

import { phoneNumberMask } from "../../utils/validations";
import { validateRut } from "../../utils/rut";
import CardHeader from "./CardHeader";
import FormPersonal from "./FormPersonal";

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

const PreventaStep2 = ({ model, setStep, user, setUser }) => {
  return (
    <Card css={{ w: "100%", h: "100%", p: "32px", maxWidth: "503px" }}>
      <Card.Body css={{ p: 0 }}>
        <CardHeader model={model} title={"Reserva tu"} />
        <Card.Divider css={{ margin: "24px 0" }}></Card.Divider>
        <Text>Ingresa tus datos personales</Text>
        <Text>
          Para inscribirte en la reserva necesitamos datos de contacto.
        </Text>
        <FormPersonal user={user} setUser={setUser} />
        <Card.Divider css={{ margin: "24px 0" }}></Card.Divider>
        <div className="opt-disclaimer">
          <Checkbox defaultSelected={false}></Checkbox>
          <Text h6>
            Acepto ser contactado por Derco SpA* Términos y condiciones de
            privacidad terminos y condiciones
          </Text>
        </div>
        <Text h3 className="reserva-title-disclaimer">
          Valor reserva $200.000
        </Text>
        <Button type="button" className="btn-primary big">
          Paga online >
        </Button>
        <Spacer y={1} />
        <Image
          src="/assets/img/cyber/tarjetas.svg"
          alt="tarjetas"
          width={"100%"}
          height={48}
          objectFit="contain"
        />
      </Card.Body>
    </Card>
  );
};

export default PreventaStep2;
