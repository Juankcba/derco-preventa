import { FC, useEffect, useReducer, PropsWithChildren } from "react";
import { Mantencion, Version } from "../../interfaces";
import { filterReducer, FilterContext } from "./";
export interface filterState {
  resultados: Version[];
  resultadosMantenciones: Mantencion[];
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
  resultados: [],
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
  const setResultados = (state: Version[]) => {
    dispatch({
      type: "[Filters] - Update Resultados Versiones",
      payload: state,
    });
  };
  const setResultadosMantenciones = (state: Mantencion[]) => {
    dispatch({
      type: "[Filters] - Update Resultados Mantenciones",
      payload: state,
    });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,

        // Methods
        setResultados,
        setResultadosMantenciones,
        setMantencionesState,
        setFilterCarClass,
        setFilterBrand,
        setFilterCombustible,
        setFilterOrder,
        setIndex,
        setIndexMant,
        setFilterMantenciones,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
