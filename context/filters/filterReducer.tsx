import { Mantencion, Version } from "../../interfaces";
import { filterState } from "./";

type FilterActionType =
  | {
      type: "[Filters] - Update Mantenciones State";
      payload: boolean;
    }
  | {
      type: "[Filters] - Update CarClass Filter";
      payload: number[];
    }
  | {
      type: "[Filters] - Update Brands Filter";
      payload: number[];
    }
  | {
      type: "[Filters] - Update Combustible Filter";
      payload: boolean;
    }
  | {
      type: "[Filters] - Update Order Filter";
      payload: string;
    }
  | {
      type: "[Filters] - Update Mantenciones Filter";
      payload: string;
    }
  | {
      type: "[Filters] - Update Index Cards";
      payload: number;
    }
  | {
      type: "[Filters] - Update Index Cards Mantenciones";
      payload: number;
    }
  | {
      type: "[Filters] - Update Resultados Versiones";
      payload: Version[];
    }
  | {
      type: "[Filters] - Update Resultados Mantenciones";
      payload: Mantencion[];
    };

export const filterReducer = (
  state: filterState,
  action: FilterActionType
): filterState => {
  switch (action.type) {
    case "[Filters] - Update Mantenciones State":
      return {
        ...state,
        isMantenciones: action.payload,
      };
    case "[Filters] - Update CarClass Filter":
      return {
        ...state,
        filterCarClass: action.payload,
      };
    case "[Filters] - Update Brands Filter":
      return {
        ...state,
        filterBrand: action.payload,
      };
    case "[Filters] - Update Combustible Filter":
      return {
        ...state,
        isDiesel: action.payload,
      };
    case "[Filters] - Update Order Filter":
      return {
        ...state,
        order: action.payload,
      };

    case "[Filters] - Update Mantenciones Filter":
      return {
        ...state,
        filterMantenciones: action.payload,
      };
    case "[Filters] - Update Index Cards":
      return {
        ...state,
        indexOfCards: action.payload,
      };
    case "[Filters] - Update Index Cards Mantenciones":
      return {
        ...state,
        indexOfMantenciones: action.payload,
      };
    case "[Filters] - Update Resultados Versiones":
      return {
        ...state,
        resultadosVersiones: action.payload,
      };
    case "[Filters] - Update Resultados Mantenciones":
      return {
        ...state,
        resultadosMantenciones: action.payload,
      };

    default:
      return state;
  }
};
