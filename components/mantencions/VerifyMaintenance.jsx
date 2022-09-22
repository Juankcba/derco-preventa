import { Button } from "@nextui-org/react";

const VerifyMaintenance = ({ setStep }) => {
  const handleStep = () => {
    setStep(2);
  };
  return (
    <div className="verify_maintenance">
      <Button className="card__header__button btn-primary big" onPress={() => handleStep()}>Pagar mantención</Button>
      <hr></hr>
      <div className="card__body">
        <h3 className="card__body__title">Si no estas seguro de que la mantención sea compatible con tu vehículo</h3>
        <span className="card__body__text">Ingresa los siguientes datos:</span>
        <div className="card__body__form">
          <select className="select_options">
            <option value="0" selected disabled>Selecciona la Marca</option>
            <option value="1">Marca 1</option>
            <option value="2">Marca 2</option>
          </select>
          <select className="select_options">
            <option value="0" selected disabled>Selecciona el Modelo</option>
            <option value="1">Modelo 1</option>
            <option value="2">Modelo 2</option>
          </select>
          <Button className="button_verify btn-primary big" onPress={() => handleStep()}>Verificar mantención</Button>
        </div>
      </div>
      <div className="card_footer">
        <div className="card_footer__text">
          <span className="card_footer__text__title">Bases legales</span>
          <br />
          <span className="card_footer__text__subtitle">Hacer referencia a si mentiste o te equivocaste </span>
        </div>
      </div>
    </div>
  )
}

export default VerifyMaintenance
