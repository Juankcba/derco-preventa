import { Button } from "@nextui-org/react";
import NextImage from "next/image";

const VerifyMaintenance = ({ setStep }) => {
  const handleStep = () => {
    setStep(1);
  };
  return (
    <div className="error_verify_maintenance">
      <hr></hr>
      <div className="card__body">
        <h3 className="card__body__title">Tu [Marca] [Modelo] corresponde a la Categoria [Categoria] y a la mantencion de [kilometraje].</h3>
        <div className="message_error">
          <span className="message_error__text">La mantención seleccionada no aplica a tu vehículo.</span>
          <NextImage
            src="/assets/img/ion_warning-outline.svg"
            height={23.78}
            width={25.3}
            alt="cyber-coin"
          />
        </div>
        <span className="card__body__text">Por favor, cambia tu selección de mantención, asi cohincide con la Categoria de tu vehículo.</span>
        <Button className="card__header__button btn-primary big" onPress={() => handleStep()}>Volver a seleccionar mantención</Button>
        <hr></hr>
        <span className="card__body__text">¿Algún dato ingresado es incorrecto?</span> <br />
        <span className="card__body__text">Vuelve a verificar la Categoria de tu vehículo.</span>
        <Button className="button_verify btn-primary big" onPress={() => handleStep()}>Volver a verificar</Button>
      </div>
    </div>
  )
}

export default VerifyMaintenance
