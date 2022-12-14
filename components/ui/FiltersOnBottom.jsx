import { Dropdown, Grid, Row, Button } from "@nextui-org/react";
import React, { useState, useEffect, useContext } from "react";
import { FilterContext, UiContext } from "../../context";

const FiltersOnBottom = () => {
  const { isModalOpen, setVisible } = useContext(UiContext);
  const { isMantenciones, order, setFilterOrder, setMantencionesState } =
    useContext(FilterContext);

  const handleClick = (state) => {
    setMantencionesState(state);
  };

  return (
    <Grid.Container justify="flex-start" css={{ alignContent: "center" }}>
      <Grid xs={1}>
        <Dropdown>
          <Dropdown.Button light>
            {order == "dsc" ? "Menor Precio" : "Mayor Precio"}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Order Actions"
            selectionMode="single"
            selectedKeys={order}
            onSelectionChange={(e) => setFilterOrder(e.currentKey)}
          >
            <Dropdown.Item key="dsc">Menor precio</Dropdown.Item>
            <Dropdown.Item key="asc">Mayor precio</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Grid>
      <Grid xs={4}>
        <Row className="btn-group">
          <Button
            type="button"
            className={
              !isMantenciones ? "btn-active group" : "btn-deactive group"
            }
            onPress={() => handleClick(false)}
            id="cyber22-cta-home-reservacion-verfiltro"
          >
            Vehículos
          </Button>
          <Button
            type="button"
            className={
              isMantenciones ? "btn-active group" : "btn-deactive group"
            }
            onPress={() => handleClick(true)}
            id="cyber22-cta-home-mantenimiento-verfiltro"
          >
            Mantenciones
          </Button>
        </Row>
      </Grid>
    </Grid.Container>
  );
};

export default FiltersOnBottom;
