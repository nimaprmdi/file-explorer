import React, { createContext, useReducer } from "react";

interface ActionType {
  type: string;
  payload: JSX.Element | JSX.Element[];
}

const initialState: { isOpen: boolean; content: JSX.Element | JSX.Element[] | null } = {
  isOpen: false,
  content: null,
};

const modalReducer = (state: { isOpen: boolean; content: JSX.Element | JSX.Element[] | null }, action: ActionType) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, isOpen: true, content: action.payload };

    case "CLOSE_MODAL":
      return { ...state, isOpen: false, content: null };

    default:
      return state;
  }
};

// Create the context
export const ModalContext = createContext<{
  state: { isOpen: boolean; content: JSX.Element | JSX.Element[] | null };
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Create the provider component
export const ModalContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  return <ModalContext.Provider value={{ state, dispatch }}>{children}</ModalContext.Provider>;
};
