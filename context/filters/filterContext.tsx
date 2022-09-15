import { createContext } from "react";
import { Mantencion, Version } from "../../interfaces";

interface ContextProps {
  resultadosVersiones: Version[];
  resultadosMantenciones: Mantencion[];
  isMantenciones: boolean;
  filterCarClass: number[];
  filterBrand: number[];
  filterMantenciones: string;
  indexOfCards: number;
  indexOfMantenciones: number;
  isDiesel: boolean;
  order: string;

  // Methods
  setResultadosVersiones: (state: Version[]) => void;
  setResultadosMantenciones: (state: Mantencion[]) => void;
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
