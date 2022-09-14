import React, { useContext, useState, useEffect } from "react";

import {
  Text,
  useTheme,
  Navbar,
  Button,
  Container,
  Grid,
  Link,
  Row,
  Spacer,
  Dropdown,
} from "@nextui-org/react";

import { UiContext, FilterContext } from "../../context";
import { FilterIcon } from "./FilterIcon";

const FilterNavBar = () => {
  const { setVisible } = useContext(UiContext);
  const { isMantenciones, order, setFilterOrder, setMantencionesState } =
    useContext(FilterContext);

  const handleClick = (state) => {
    setMantencionesState(state);
  };

  const handler = () => {
    setVisible(true);
  };

  return (
    <Navbar
      isBordered
      variant="floating"
      css={{ bottom: "24px", background: "transparent" }}
      className="navbar-filter-bottom"
    >
      <Navbar.Content
        hideIn="xs"
        css={{ width: "100%", "@mdMax": { display: "none" } }}
      >
        <Grid.Container justify="flex-start">
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
                onClick={() => handleClick(false)}
              >
                Vehículos
              </Button>
              <Button
                type="button"
                className={
                  isMantenciones ? "btn-active group" : "btn-deactive group"
                }
                onClick={() => handleClick(true)}
              >
                Mantenciones
              </Button>
            </Row>
          </Grid>
        </Grid.Container>
      </Navbar.Content>
      <Navbar.Content css={{ width: "100%", "@mdMin": { width: "200px" } }}>
        <Button
          auto
          onClick={handler}
          css={{ width: "100%" }}
          className="btn-primary big"
          iconRight={<FilterIcon />}
        >
          Ver Filtros
        </Button>
      </Navbar.Content>
    </Navbar>
  );
};

export default FilterNavBar;
