import { IFile } from "@/types/files";
import { deleteObjectById } from "@/utils/helpers";
import React, { createContext, useReducer } from "react";

export interface FileState {
  files: IFile[] | null;
}

interface ActionType {
  type: string;
  payload: IFile[];
}

const initialState: { files: IFile[] } = {
  files: [],
};

const fileReducer = (state: { files: IFile[] }, action: ActionType) => {
  switch (action.type) {
    case "GET_FILES":
      return { ...state, files: action.payload };

    case "DELETE_FILE":
      if (typeof action.payload === "string") {
        const res = deleteObjectById(state.files, action.payload);
        return { ...state, files: res };
      }

    default:
      return state;
  }
};

// Create the context
export const FilesContext = createContext<{
  state: { files: IFile[] };
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Create the provider component
export const FilesContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(fileReducer, initialState);

  return <FilesContext.Provider value={{ state, dispatch }}>{children}</FilesContext.Provider>;
};
