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
import {
  isBrowser,
  isMobile,
  isIOS,
  isTablet,
  isAndroid,
  osName,
} from "react-device-detect";
import CardHeader from "./CardHeader";
import FormPersonal from "./FormPersonal";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Image from "next/image";
import * as Yup from "yup";
import { validateRut } from "../../utils/rut";
import { currency } from "../../utils";
import FormPlate from "./FormPlate";
import { storeApi } from "../../apis";

const SuccessVerifyMaintenance = ({
  model,
  regions,
  setStep,
  msg,
  data,
  setData,
}) => {
  const handleStep = (value) => {
    setStep(value);
  };
  const [loading, setLoading] = useState(false);

  const transbankForm = useRef();
  const [order, setOrder] = useState(null);
  const [selected, setSelected] = useState(false);
  const regex = /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g;
  const formik = useFormik({
    initialValues: {
      kms: "",
      plate: "",
      regions: "",
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
      opt: Yup.boolean()
        .required("Debe de aceptar los Términos y condiciones")
        .oneOf([true], "Debe de aceptar los Términos y condiciones"),
    }),
    onSubmit: async (values) => {
      let returnUrl = `${process.env.NEXT_PUBLIC_STORE_URL}/pre-order/transbank-return`;
      let finalUrl = `${process.env.NEXT_PUBLIC_STORE_URL}/pre-order/${process.env.NEXT_PUBLIC_PREVENTA}/transbank-final`;
      let resultUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reserva/mantencion/${model.brand_slug}/${model.model_slug}/${model.version_slug}/respuesta-transbank`;

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
        patente: values.plate,
        km: values.kms,
        car_id: data.model.id,
        subsidiary_id: parseInt(values.regions, 10),
        client_device: isTablet ? "tablet" : isMobile ? "mobile" : "desktop",
        client_os: device,
        utm_source_url:
          sessionStorage.getItem("querySource") ||
          process.env.NEXT_PUBLIC_BASE_URL,
        request_financing: false,
        preaprobacion_online: {},
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

  useMemo(() => {
    formik.setFieldValue("opt", selected);
  }, [selected]);
  useEffect(() => {
    if (order != null) {
      console.log("order", order);
      transbankForm.current.submit();
    }
  }, [order]);

  return (
    <div className="success_verify_maintenance">
      <hr></hr>
      <div className="card__body">
        {msg && (
          <div>
            <Text h3 className="card__body__title">
              Tu {data.verify.modelo.brand} {data.verify.modelo.model}{" "}
              corresponde a la Categoría{" "}
              {data.verify.modelo.category.toLowerCase()} y a la mantención de{" "}
              {new Intl.NumberFormat("es-CL").format(
                parseInt(data.model.model_slug, 10)
              )}{" "}
              kms.
            </Text>
            <div className="message_success success">
              <Text className="message_success__text">
                Seleccionaste correctamente tu mantención
              </Text>
              <NextImage
                src="/assets/img/check.svg"
                height={34}
                width={34}
                alt="cyber-coin"
              />
            </div>
          </div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormPlate
            data={data}
            setData={setData}
            formik={formik}
            regions={regions}
          />
          <hr></hr>
          <FormPersonal
            data={data}
            setData={setData}
            formik={formik}
            selected={selected}
          />
          <hr></hr>
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
            Valor reserva {currency.format(data.model.brand_price)}
          </Text>
          <Button
            iconRight={
              loading ? <Loading /> : <NavigateNextIcon fill="currentColor" />
            }
            type="submit"
            className="btn-primary big"
            css={{ width: "100%" }}
          >
            Paga online
          </Button>
          <Spacer y={1} />
          <div>
            <Image
              src="/assets/img/cyber/tarjetas.svg"
              alt="tarjetas"
              width={300}
              height={48}
              objectFit="contain"
            />
          </div>
        </form>
      </div>
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
    </div>
  );
};

export default SuccessVerifyMaintenance;
