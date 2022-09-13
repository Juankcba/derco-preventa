import { FC, useEffect, useReducer, PropsWithChildren } from "react";
import { filterReducer, FilterContext } from "./";
export interface filterState {
  isMantenciones: boolean;
  filterCarClass: number[];
  filterBrand: number[];
  isDiesel: boolean;
}

const FILTERS_INITIAL_STATE: filterState = {
  isMantenciones: false,
  filterCarClass: [],
  filterBrand: [],
  isDiesel: true,
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

  return (
    <FilterContext.Provider
      value={{
        ...state,

        // Methods
        setMantencionesState,
        setFilterCarClass,
        setFilterBrand,
        setFilterCombustible,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
