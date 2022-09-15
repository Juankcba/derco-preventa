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
import ModalFilters from "../cyber/ModalFilters";
import { Drawer, SwipeableDrawer } from "@mui/material";
import FiltersOnBottom from "./FiltersOnBottom";

const FilterNavBar = () => {
  const { isModalOpen, setVisible } = useContext(UiContext);
  const { isMantenciones, order, setFilterOrder, setMantencionesState } =
    useContext(FilterContext);

  const handleClick = (state) => {
    setMantencionesState(state);
  };

  const handler = () => {
    setVisible(!isModalOpen);
  };

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <Navbar
      isBordered
      variant="floating"
      css={{ bottom: "24px", background: "transparent" }}
      className="navbar-filter-bottom"
    >
      {isModalOpen && (
        <Navbar.Content>
          <SwipeableDrawer
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            anchor={"bottom"}
            open={true}
            onClose={handler}
            className="nav-drawer-bottom"
          >
            <ModalFilters />
          </SwipeableDrawer>
        </Navbar.Content>
      )}
      <Navbar.Content
        hideIn="xs"
        css={{ width: "100%", "@mdMax": { display: "none" } }}
      >
        <FiltersOnBottom />
      </Navbar.Content>

      <Navbar.Content
        css={{ width: "100%", padding: "0 10px", "@mdMin": { width: "200px" } }}
      >
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
