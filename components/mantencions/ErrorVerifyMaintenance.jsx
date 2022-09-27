import { Button, Text } from "@nextui-org/react";
import NextImage from "next/image";
import { useRouter } from "next/router";

const ErrorVerifyMaintenance = ({ setStep, setMsg, data, setData }) => {
  const router = useRouter();
  const handleStep = (value, msg = false) => {
    setStep(value);
    setMsg(msg);
    console.log(msg);
  };
  return (
    <div className="error_verify_maintenance">
      <hr></hr>
      <div className="card__body">
        <Text h3 className="card__body__title">
          Tu {data.verify.modelo.brand} {data.verify.modelo.model} corresponde a
          la Categoría {data.verify.modelo.category}
        </Text>
        <div className="message_error error">
          <Text>
            <span className="message_error__text">
              La mantención seleccionada no aplica a tu vehículo.
            </span>
          </Text>
          <NextImage
            src="/assets/img/ion_warning-outline.svg"
            height={23.78}
            width={25.3}
            alt="cyber-coin"
          />
        </div>
        <Text className="card__body__text">
          Por favor, cambia tu selección de mantención, asi coincide con la
          categoria de tu vehículo.
        </Text>
        <Button
          className="card__header__button btn-primary big"
          onPress={() => router.push("/?card=true")}
        >
          Volver a seleccionar mantención
        </Button>
        <hr></hr>
        <Text className="card__body__text">
          ¿Algún dato ingresado es incorrecto?
        </Text>{" "}
        <br />
        <Text className="card__body__text">
          Vuelve a verificar la Categoria de tu vehículo.
        </Text>
        <Button
          className="button_verify btn-primary big"
          onPress={() => handleStep(1, true)}
        >
          Volver a verificar
        </Button>
      </div>
    </div>
  );
};

export default ErrorVerifyMaintenance;
