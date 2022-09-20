import { FC, useEffect, useReducer, PropsWithChildren } from "react";
import { Auto, Mantencion, Version } from "../../interfaces";
import { filterReducer, FilterContext } from "./";
export interface filterState {
  scrollChange: boolean;
  resultadosVersiones: Auto[];
  resultadosMantenciones: Auto[];
  isMantenciones: boolean;
  filterCarClass: number[];
  filterBrand: number[];
  filterMantenciones: string;
  indexOfCards: number;
  indexOfMantenciones: number;
  order: string;
  isDiesel: boolean;
}

const FILTERS_INITIAL_STATE: filterState = {
  scrollChange: false,
  resultadosVersiones: [],
  resultadosMantenciones: [],
  isMantenciones: false,
  filterCarClass: [],
  filterBrand: [],
  filterMantenciones: "10mil",
  indexOfCards: 1,
  indexOfMantenciones: 1,
  order: "dsc",
  isDiesel: false,
};

export const FilterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, FILTERS_INITIAL_STATE);

  const setMantencionesState = (state: boolean) => {
    dispatch({
      type: "[Filters] - Update Mantenciones State",
      payload: state,
    });
  };
  const setFilterCarClass = (state: number[]) => {
    dispatch({
      type: "[Filters] - Update CarClass Filter",
      payload: state,
    });
  };
  const setFilterBrand = (state: number[]) => {
    dispatch({
      type: "[Filters] - Update Brands Filter",
      payload: state,
    });
  };
  const setFilterCombustible = (state: boolean) => {
    dispatch({
      type: "[Filters] - Update Combustible Filter",
      payload: state,
    });
  };
  const setFilterOrder = (state: string) => {
    dispatch({
      type: "[Filters] - Update Order Filter",
      payload: state,
    });
  };
  const setFilterMantenciones = (state: string) => {
    dispatch({
      type: "[Filters] - Update Mantenciones Filter",
      payload: state,
    });
  };
  const setIndex = (state: number) => {
    dispatch({
      type: "[Filters] - Update Index Cards",
      payload: state,
    });
  };
  const setIndexMant = (state: number) => {
    dispatch({
      type: "[Filters] - Update Index Cards Mantenciones",
      payload: state,
    });
  };
  const setResultadosVersiones = (state: Auto[]) => {
    dispatch({
      type: "[Filters] - Update Resultados Versiones",
      payload: state,
    });
  };
  const setResultadosMantenciones = (state: Auto[]) => {
    dispatch({
      type: "[Filters] - Update Resultados Mantenciones",
      payload: state,
    });
  };
  const setScrollChange = (state: boolean) => {
    dispatch({
      type: "[Filters] - Update Scroll State",
      payload: state,
    });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,

        // Methods
        setResultadosVersiones,
        setResultadosMantenciones,
        setMantencionesState,
        setFilterCarClass,
        setFilterBrand,
        setFilterCombustible,
        setFilterOrder,
        setIndex,
        setIndexMant,
        setFilterMantenciones,
        setScrollChange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
