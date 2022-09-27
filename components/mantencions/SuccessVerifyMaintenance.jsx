import React, { FC, useRef, useState, useMemo, useEffect } from "react";
import NextImage from "next/image";

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
  Loading,
} from "@nextui-org/react";
import { Formik, Field, useFormik } from "formik";

import CardHeader from "./CardHeader";
import FormPersonal from "./FormPersonal";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Image from "next/image";
import * as Yup from "yup";

const SuccessVerifyMaintenance = ({ model, setStep, data, msg }) => {
  const handleStep = (value) => {
    setStep(value);
  };

  const [data, setData] = useState({
    user: {
      rut: "",
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
    },
    ces: "",
    financial: "",
    model: "",
  });

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
    onSubmit: async (values) => {
      let returnUrl = `${process.env.NEXT_PUBLIC_STORE_URL}/pre-order/transbank-return`;
      let finalUrl = `${process.env.NEXT_PUBLIC_STORE_URL}/pre-order/${process.env.NEXT_PUBLIC_PREVENTA}/transbank-final`;
      let resultUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reserva/auto/${model.brand_slug}/${model.version_slug}/respuesta-transbank`;

      let device = isIOS ? "IOS" : isAndroid ? "Android" : osName;
      const dataRequest = {
        transbank_urls: {
          return_url: returnUrl,
          final_url: finalUrl,
          result_url: resultUrl,
        },
        customer: {
          rut: values.rut,
          first_name: values.first_name,
          last_name: values.last_name,
          phone: values.phone,
          email: values.email,
        },
        car_id: data.model.id,
        subsidiary_id: parseInt(data.ces, 10),
        client_device: isTablet ? "tablet" : isMobile ? "mobile" : "desktop",
        client_os: device,
        utm_source_url:
          sessionStorage.getItem("querySource") ||
          process.env.NEXT_PUBLIC_BASE_URL,
        request_financing: data.financial.financial_state,
        preaprobacion_online: data.financial.results,
      };
      console.log("holi", dataRequest);

      try {
        setLoading(true);
        await storeApi
          .post(
            `pre-order/cyber-dc/${process.env.NEXT_PUBLIC_PREVENTA}/cars/withhold-cyber-dc`,
            dataRequest
          )
          .then((response) => {
            console.log(
              "response de Endpoint",
              response.data,
              JSON.stringify(response)
            );
            if (response.data.error) {
              setGetAvailableCarsState(false);
              setLoading(false);
              setData({
                ...data,
                user: values,
                withhold: response.data.message,
              });
              Swal.fire({
                title: "Error!",
                text: response.data.message,
                icon: "error",
                confirmButtonText: "Confirmar",
              });
              setStep(3);
            } else {
              console.log("paso", response.data);
              setOrder(response.data);

              setLoading(false);
            }
          });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
  });
  
  const [selected, setSelected] = useState(false);
  useMemo(() => {
    formik.setFieldValue("opt", selected);
  }, [selected]);


  return (
    <div className="success_verify_maintenance">
      <hr></hr>
      <div className="card__body">
        {msg && (<div>
          <h3 className="card__body__title">Tu [Marca] [Modelo] corresponde a la Categoría [Categoria] y a la mantención de [kilometraje].</h3>
          <div className="message_success success">
            <span className="message_success__text">Seleccionaste correctamente tu mantención</span>
            <NextImage
              src="/assets/img/check.svg"
              height={34}
              width={34}
              alt="cyber-coin"
            />
          </div>
        </div>
        )}

  <Card
      css={{
        w: "100%",
        h: "100%",
        p: "32px",
        maxWidth: "100%",
        "@mdMin": {
          maxWidth: "503px",
        },
      }}
    >
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
            iconRight={
              loading ? <Loading /> : <NavigateNextIcon fill="currentColor" />
            }
            type="submit"
            className="btn-primary big"
          >
            Paga online
          </Button>
          <Spacer y={1} />
          {loading}
          <Image
            src="/assets/img/cyber/tarjetas.svg"
            alt="tarjetas"
            width={"100%"}
            height={48}
            objectFit="contain"
          />
        </form>
        <div className="hidden">
          <form ref={transbankForm} method="post" action={order?.form_action}>
            <input type="hidden" name="token_ws" value={order?.token_ws} />
            <input
              className="button-next next hidden"
              disabled={loading ? true : false}
              type="submit"
              value="Paga Online"
            />
          </form>
        </div>
        <Card.Divider css={{ margin: "24px 0" }}></Card.Divider>
        <div>
          <Button
            icon={<ArrowBackIosNewIcon fill="currentColor" />}
            className="btn-secondary grey big fit"
            onPress={() => setStep(1)}
          >
            Volver al paso anterior
          </Button>
        </div>
      </Card.Body>
    </Card>

        <Button className="button_verify btn-primary big" onPress={() => handleStep(4)}>Paga online</Button>
        <NextImage src="/assets/img/icon-transbank.svg" height={48} width={439} alt="cyber-coin" className="img_transbank" />
      </div>
      <div className="content_btn">
        <Button light color="error" auto className="btn" onPress={() => handleStep(1)}>
          Regresar a “Verificar mantención”
        </Button>
      </div>
    </div>
  )
}

export default SuccessVerifyMaintenance
