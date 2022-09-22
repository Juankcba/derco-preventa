import { PreventaLayout } from "../../../../components/Layouts"

const CarPage = () => {
  return (
    <PreventaLayout>
      <div className="page_reserva_mantencion">
        <div className="container">
          <img src="https://s3.amazonaws.com/dercocenter.cl/cyber/backgorund-page-maintenance.jpg" alt="mobile" className="img_mobile" />
          <div className="discount_mobile">
            <span className="discount__number">35%</span>
          </div>
          <div className="content">
            <div className="card">
              <div className="discount">
                <span className="discount__number">35%</span>
              </div>
              <div className="card__header">
                <div className="card__header__title">
                  <h3>Mantención Citycar 30.000km</h3>
                  <h4>$270.000*</h4>
                  <span className="card__header__title__discount">Antes <span>$370.000</span></span>
                </div>
                <button className="card__header__button">Pagar mantención</button>
              </div>
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
                  <button className="button_verify">Verificar mantención</button>
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
          </div>
        </div>
      </div>
    </PreventaLayout >
  );
};

export default CarPage;