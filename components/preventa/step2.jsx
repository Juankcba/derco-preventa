import React, { FC } from "react";
import {
  Grid,
  Text,
  Row,
  Card,
  Input,
  Spacer,
  Button,
} from "@nextui-org/react";
import { validations } from "../../utils";
import CarsColorsPreventa from "../cars/CarsColorsPreventa";
import { ModelResponse, IPUser } from "../../interfaces";
import { currency } from "../../utils";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import MaskedInput from "react-text-mask";
import createRutMask from "text-mask-rut";

const rutMask = createRutMask();

import { phoneNumberMask } from "./../../utils/validations";
import { validateRut } from "../../utils/rut";

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
  let regex = /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g;
  return (
    <Card css={{ w: "100%", h: "100%" }}>
      <Card.Body css={{ overflowY: "hidden" }}>
        <Text h1>Ahora necesitamos tus datos</Text>
        <Text h4>El {model.name} te espera</Text>
        <Spacer y={1.2} />
        <Formik
          initialValues={{ ...user }}
          onSubmit={(values, { setSubmitting }) => {
            setUser({ ...user, rut: values.rut });
            setStep(3);
          }}
          validationSchema={Yup.object().shape({
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
          })}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;

            return (
              <form onSubmit={handleSubmit}>
                <Grid.Container gap={4} css={{ w: "100%", h: "100%" }}>
                  <Grid>
                    <Field
                      name="rut"
                      render={({ field }) => (
                        <MaskedInput
                          {...field}
                          mask={rutMask}
                          id="rut"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          render={(ref, props) => (
                            <Input
                              bordered
                              labelPlaceholder="RUT"
                              clearable
                              color="default"
                              helperColor={"error"}
                              initialValue={values.rut}
                              helperText={
                                errors.rut && touched.rut ? errors.rut : ""
                              }
                              ref={ref}
                              {...props}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid>
                    <Field
                      name="name"
                      render={({ ref, field }) => (
                        <Input
                          id="name"
                          bordered
                          labelPlaceholder="NOMBRE"
                          clearable
                          color="default"
                          helperColor={"error"}
                          initialValue={values.name}
                          helperText={
                            errors.name && touched.name ? errors.name : ""
                          }
                          ref={ref}
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid>
                    <Field
                      name="lastname"
                      render={({ ref, field }) => (
                        <Input
                          bordered
                          labelPlaceholder="APELLIDO"
                          clearable
                          color="default"
                          helperColor={"error"}
                          initialValue={values.lastname}
                          helperText={
                            errors.lastname && touched.lastname
                              ? errors.lastname
                              : ""
                          }
                          ref={ref}
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid>
                    <Field
                      name="phone"
                      render={({ field }) => (
                        <MaskedInput
                          {...field}
                          mask={phoneNumberMask}
                          id="phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          render={(ref, props) => (
                            <Input
                              bordered
                              labelPlaceholder="TELÉFONO"
                              clearable
                              color="default"
                              helperColor={"error"}
                              initialValue={values.phone}
                              helperText={
                                errors.phone && touched.phone
                                  ? errors.phone
                                  : ""
                              }
                              ref={ref}
                              {...props}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid>
                    <Field
                      name="email"
                      render={({ ref, field }) => (
                        <Input
                          bordered
                          labelPlaceholder="EMAIL"
                          clearable
                          color="default"
                          type={"email"}
                          helperColor={"error"}
                          initialValue={values.email}
                          helperText={
                            errors.email && touched.email ? errors.email : ""
                          }
                          ref={ref}
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={8}>
                    <Button
                      type="submit"
                      disabled={!dirty || errors.length > 0}
                    >
                      Continuar
                    </Button>
                  </Grid>
                </Grid.Container>
              </form>
            );
          }}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default PreventaStep2;
