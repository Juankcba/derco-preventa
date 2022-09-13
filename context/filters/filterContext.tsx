import { createContext } from "react";

interface ContextProps {
  isMantenciones: boolean;
  filterCarClass: number[];
  filterBrand: number[];
  isDiesel: boolean;

  // Methods
  setMantencionesState: (state: boolean) => void;
  setFilterCarClass: (state: number[]) => void;
  setFilterBrand: (state: number[]) => void;
  setFilterCombustible: (state: boolean) => void;
}

export const FilterContext = createContext({} as ContextProps);
