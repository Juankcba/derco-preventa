import { createContext } from "react";

interface ContextProps {
  isModalOpen: boolean;

  // Methods
  setVisible: (state: boolean) => void;
}

export const UiContext = createContext({} as ContextProps);
