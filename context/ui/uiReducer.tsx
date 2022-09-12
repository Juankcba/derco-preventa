import { UiState } from "./";

type UiActionType = {
  type: "[Modal] - Update Visible";
  payload: boolean;
};

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
  switch (action.type) {
    case "[Modal] - Update Visible":
      return {
        ...state,
        isModalOpen: action.payload,
      };

    default:
      return state;
  }
};
