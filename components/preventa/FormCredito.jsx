import { Box, MenuItem, TextField } from "@mui/material";
import {
  Row,
  Text,
  Button,
  Grid,
  StyledLoadingContainer,
  Container,
} from "@nextui-org/react";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useFormik, setFieldValue, useFormikContext, Form } from "formik";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import * as Yup from "yup";
import { currency } from "../../utils";
import { Loading } from "@nextui-org/react";
import { cesApi } from "../../apis";
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
const cuotasConvencionales = [
  { value: 12, label: "12 cuotas" },
  { value: 24, label: "24 cuotas" },
  { value: 36, label: "36 cuotas" },
  { value: 48, label: "48 cuotas" },
  { value: 60, label: "60 cuotas" },
];
const cuotasInteligentes = [
  { value: 24, label: "24 cuotas" },
  { value: 36, label: "36 cuotas" },
  { value: 48, label: "48 cuotas" },
];

const FormCredito = ({ setValidate, model }) => {
  const [creditState, setCreditState] = useState(true);
  const [smart, setSmart] = useState(true);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(model.list_price * 0.2);
  const [valueIncome, setValueIncome] = useState(
    (model.list_price * (1 - 0.2)) / 11
  );
  const [results, setResults] = useState(null);

  const formik = useFormik({
    initialValues: {
      pie: model.list_price * 0.2,
      terms: "",
      nacionality: "Chilena",
      income: (model.list_price * (1 - 0.2)) / 11,
      workType: "Dependiente",
      workYears: 2,
    },
    validationSchema: Yup.object().shape({
      terms: Yup.number().required("El plazo es obligatorio"),
      pie: Yup.number()
        .required("El pie es obligatorio")
        .min(
          model.list_price * 0.2,
          `Pie minimo ${currency.format(model.list_price * 0.2)}`
        )
        .max(
          model.list_price * 0.5,
          `Pie maximo ${currency.format(model.list_price * 0.5)}`
        ),
      nacionality: Yup.string().required("La nacionalidad es obligatoria"),
      income: Yup.number()
        .required("El ingreso es obligatorio")
        .min(
          (model.list_price * (1 - 0.2)) / 11,
          `El ingreso mínimo es ${currency.format(
            (model.list_price * (1 - 0.2)) / 11
          )}  `
        ),
      workType: Yup.string().required("El tipo de trabajo es obligatoria"),
      workYears: Yup.number().required("Los años trabajados son oblitagorios"),
    }),

    onSubmit: async (values) => {
      setLoading(true);
      setResults(null);
      try {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();

        const finalDate = new Date(now);
        finalDate.setDate(now.getDate() + 30);
        const finalYear = finalDate.getFullYear();
        const finalMont = finalDate.getMonth() + 1;
        const finalDay = finalDate.getDate();

        let data = {
          customer: {
            identificationTypeId: 1,
            identificationValue: "111111111",
            email: "david@soho.cl",
            phone: "+56981178256",
          },
          vehicle: {
            type: "NU",
            price: model.financial_price,
          },
          loan: {
            type: !smart ? "CONVENTIONAL" : "SMART",
            downPayment: values.pie,
            accessories: 0,
            tradeInCarValue: 0,
            term: values.terms,
            startDate: `${year}-${month}-${day}`,
            firstDueDate: `${finalYear}-${finalMont}-${finalDay}`,
            rateType: smart ? "SMART_NORMAL" : "CONVENTIONAL_NORMAL",
            immediateOption: false,
            saleChannel: "829957000",
            saleChannelType: "WEB",
            salesRoomId: 1,
            modifyTerm: [],
          },
        };
        await cesApi.post("/credit-subject", data).then((response) => {
          if (response.data.status == "OK") {
            setResults(response.data.results);
            setValidate(true);
          } else {
            alert("Hubo un error");
            setValidate(false);
          }
          setLoading(false);
        });
      } catch (error) {
        console.log("error", error);
        setValidate(false);
        alert("Hubo un error");
        //setSubmit(false);
        setLoading(false);
      }
    },
  });

  useMemo(() => {
    formik.setFieldValue("terms", "");
    setLoading(false);
    setResults(null);
  }, [smart]);

  useMemo(() => {
    if (!creditState) {
      setLoading(false);
      setResults(null);
      setValidate(true);
    } else {
      setValidate(false);
    }
  }, [creditState]);

  useMemo(() => {
    formik.setFieldValue("pie", value);
  }, [value]);
  useMemo(() => {
    const minIncome =
      (model.list_price - formik.values.pie) / 11 <= 480000
        ? 480000
        : (model.list_price * (1 - 0.2)) / 11;

    formik.setFieldValue("income", valueIncome);
  }, [valueIncome]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Text>¿Deseas evaluar un crédito en línea?</Text>
        <Row className="btn-group flex-start w-50">
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
                className={!smart ? "btn-active group" : "btn-deactive group"}
                onPress={() => setSmart(false)}
              >
                Convencional
              </Button>
              <Button
                type="button"
                className={smart ? "btn-active group" : "btn-deactive group"}
                onPress={() => setSmart(true)}
              >
                Inteligente
              </Button>
            </Row>

            <Grid.Container gap={1} css={{ p: 0, maxWidth: "99%" }}>
              <Grid xs={12} md={6}>
                <CurrencyTextField
                  fullWidth
                  label="Pie"
                  variant="outlined"
                  value={value}
                  currencySymbol="$"
                  //minimumValue={model.list_price * 0.1999}
                  outputFormat="number"
                  decimalPlaces="0"
                  decimalCharacter=","
                  digitGroupSeparator="."
                  helperText={
                    formik.errors.pie && formik.touched.pie
                      ? formik.errors.pie
                      : ""
                  }
                  onChange={(event, value) => setValue(value)}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  id="outlined-select-terms"
                  select
                  label="Plazo"
                  name="terms"
                  onChange={formik.handleChange}
                  defaultValue={formik.values.terms}
                  value={formik.values.terms}
                  helperColor={"error"}
                  helperText={
                    formik.errors.terms && formik.touched.terms
                      ? formik.errors.terms
                      : ""
                  }
                >
                  <MenuItem value={""} disabled>
                    Seleccione una opción
                  </MenuItem>
                  {!smart
                    ? cuotasConvencionales.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))
                    : cuotasInteligentes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  id="outlined-select-nacionality"
                  select
                  label="Nacionalidad"
                  name="nacionality"
                  onChange={formik.handleChange}
                  value={formik.values.nacionality}
                  helperColor={"error"}
                  helperText={
                    formik.errors.nacionality && formik.touched.nacionality
                      ? formik.errors.nacionality
                      : ""
                  }
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
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  id="outlined-select-work-type"
                  select
                  label="Tipo de trabajo"
                  name="workType"
                  onChange={formik.handleChange}
                  value={formik.values.workType}
                  helperColor={"error"}
                  helperText={
                    formik.errors.workType && formik.touched.workType
                      ? formik.errors.workType
                      : ""
                  }
                >
                  {trabajo.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <CurrencyTextField
                  fullWidth
                  label="Ingreso mensual"
                  variant="outlined"
                  value={valueIncome}
                  currencySymbol="$"
                  //minimumValue={model.list_price * 0.2}
                  outputFormat="number"
                  decimalPlaces="0"
                  decimalCharacter=","
                  digitGroupSeparator="."
                  onChange={(event, value) => setValueIncome(value)}
                  helperText={
                    formik.errors.income && formik.touched.income
                      ? formik.errors.income
                      : ""
                  }
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  id="outlined-select-work-type"
                  select
                  label="Años trabajados"
                  name="workYears"
                  onChange={formik.handleChange}
                  value={formik.values.workYears}
                  helperColor={"error"}
                  helperText={
                    formik.errors.workYears && formik.touched.workYears
                      ? formik.errors.workYears
                      : ""
                  }
                >
                  {years.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12}>
                <div style={{ margin: "0 auto" }}>
                  <Button
                    type="submit"
                    disabled={
                      formik.isSubmitting ||
                      (Object.keys(formik.errors).length >= 0 && formik.isDirty)
                    }
                  >
                    Calcular {formik.isSubmitting}
                  </Button>
                </div>
              </Grid>
            </Grid.Container>
          </>
        )}
      </form>
      <Container css={{ p: 0, marginTop: "20px" }}>
        {loading ? (
          <Loading />
        ) : (
          results && (
            <div className="subject-container">
              <Text h3 className="title">
                Valor Cuota: {currency.format(results.monthlyPayment)}
              </Text>
              <Text h4 className="subtitle">
                CAE: <span>{results.annualCAE.toFixed(2)} %</span>
              </Text>
              <Text h4 className="subtitle">
                Costo total del Crédito:{" "}
                <span> {currency.format(results.totalLoanCost)}</span>
              </Text>
              <Text h4 className="subtitle">
                Valor futuro Garantizado:{" "}
                <span>{currency.format(results.finalPayment)}</span>
              </Text>
            </div>
          )
        )}
      </Container>
    </>
  );
};

export default FormCredito;
