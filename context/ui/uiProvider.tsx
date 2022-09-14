import { FC, useEffect, useReducer, PropsWithChildren } from "react";
import { UiContext, uiReducer } from "./";

export interface UiState {
  isModalOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
  isModalOpen: false,
};

export const UiProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const setVisible = (state: boolean) => {
    dispatch({
      type: "[Modal] - Update Visible",
      payload: state,
    });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,

        // Methods
        setVisible,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
