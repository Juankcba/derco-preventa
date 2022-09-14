import { createContext } from "react";

interface ContextProps {
  isMantenciones: boolean;
  filterCarClass: number[];
  filterBrand: number[];
  filterMantenciones: string;
  isDiesel: boolean;
  order: string;

  // Methods
  setMantencionesState: (state: boolean) => void;
  setFilterCarClass: (state: number[]) => void;
  setFilterBrand: (state: number[]) => void;
  setFilterCombustible: (state: boolean) => void;
  setFilterMantenciones: (state: string) => void;
  setFilterOrder: (state: string) => void;
}

export const FilterContext = createContext({} as ContextProps);
