import { createContext } from "react";
import { Auto, Mantencion, Version } from "../../interfaces";

interface ContextProps {
  scrollChange: boolean;
  resultadosVersiones: Auto[];
  resultadosMantenciones: Auto[];
  isMantenciones: boolean;
  filterCarClass: number[];
  filterBrand: number[];
  filterMantenciones: string;
  indexOfCards: number;
  indexOfMantenciones: number;
  isDiesel: boolean;
  order: string;

  // Methods
  setScrollChange: (state: boolean) => void;
  setResultadosVersiones: (state: Auto[]) => void;
  setResultadosMantenciones: (state: Auto[]) => void;
  setMantencionesState: (state: boolean) => void;
  setFilterCarClass: (state: number[]) => void;
  setFilterBrand: (state: number[]) => void;
  setFilterCombustible: (state: boolean) => void;
  setFilterMantenciones: (state: string) => void;
  setIndex: (state: number) => void;
  setIndexMant: (state: number) => void;
  setFilterOrder: (state: string) => void;
}

export const FilterContext = createContext({} as ContextProps);
