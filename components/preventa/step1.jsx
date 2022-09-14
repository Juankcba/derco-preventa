import React, { FC, useState, useEffect } from "react";
import {
  Grid,
  Text,
  Row,
  Card,
  Input,
  Spacer,
  Button,
  CSS,
  FormElement,
} from "@nextui-org/react";
import CarsColorsPreventa from "../cars/CarsColorsPreventa";
import { IPUser, ModelResponse } from "../../interfaces";
import { currency } from "../../utils";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import MaskedInput from "react-text-mask";
import createRutMask from "text-mask-rut";

const rutMask = createRutMask();

import { formatRut, validateRut } from "../../utils/rut";

// interface Props {
//   model: ModelResponse;
//   setStep: (arg: number) => void;
//   user: IPUser;
//   setUser: (arg: IPUser) => void;
// }
// type FormData = {
//   name: string,
//   email: string,
//   rut: string,
//   lastname: string,
//   phone: string,
// };

// interface FormValues {
//   email: string;
//   password: string;
// }

// interface OtherProps {
//   message: string;
// }

const PreventaStep1 = ({ model, setStep, user, setUser }) => {
  return (
    <Card>
      <Card.Body>
        <Text h1>{model.name}</Text>
        <Text h4>
          Para que reserver tu <strong>{model.name}</strong> por{" "}
          {currency.format(50000)} necesitamos tu RUT
        </Text>
        <Spacer y={1.2} />
        <Formik
          initialValues={{ ...user }}
          onSubmit={(values, { setSubmitting }) => {
            setUser({ ...user, rut: values.rut });
            setStep(2);
          }}
          validationSchema={Yup.object().shape({
            rut: Yup.string()
              .min(8, "El RUT debe de tener al menos 8 caracteres")
              .required("El RUT es requerido")
              .test("rut", "El rut es inválido", (val) => validateRut(val)),
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
              setFieldValue,
            } = props;

            return (
              <form onSubmit={handleSubmit}>
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
                          initialValue={values.rut}
                          helperColor={"error"}
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
                <Grid.Container css={{ marginTop: "20px" }}>
                  <Grid xs={8}>
                    <Button
                      type="submit"
                      disabled={!dirty || errors.length > 0 || isSubmitting}
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

export default PreventaStep1;
