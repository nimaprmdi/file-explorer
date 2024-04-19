import { IFile } from "@/types/files";
import React, { createContext, useReducer } from "react";

export interface FileState {
  files: IFile | IFile[] | null;
}

interface ActionType {
  type: string;
  payload: IFile | IFile[];
}

export type FileAction = { type: "GET_FILES"; payload: IFile | IFile[] | null };

const initialState: { files: IFile | IFile[] } = {
  files: [],
};

const fileReducer = (state: { files: IFile | IFile[] }, action: ActionType) => {
  switch (action.type) {
    case "GET_FILES":
      return { ...state, files: action.payload };

    case "SET_FILES":
      return { ...state, files: action.payload };

    case "DELETE_FILE":
      const data =
        Array.isArray(state.files) &&
        state.files
          .map((file: IFile, index: number) => {
            if (Array.isArray(action.payload)) {
              if (file.name === action.payload[index].name) {
                return null; // Remove the file from the array
              } else if (file.type === "folder") {
                return {
                  ...file,
                  children: file.children.filter((child, index: number) => {
                    //
                    if (Array.is) child.type !== "folder" ? child.name !== action.payload[index].name : child;
                  }),
                };
              }
              return file;
            }
          })
          .filter(Boolean);

      return {
        ...state,
        files: data,
      };

    default:
      return state;
  }
};

// Helper function to recursively delete files from children
const deleteFile = (file: IFile, fileToDelete: IFile): IFile => {
  if (file.name === fileToDelete.name) {
    return {
      ...file,
      children: file.children.filter((child) => child.name !== fileToDelete.name),
    };
  } else if (file.children.length > 0) {
    return {
      ...file,
      children: file.children.map((child) => deleteFile(child, fileToDelete)),
    };
  }
  return file;
};

// Create the context
export const FilesContext = createContext<{
  state: { files: IFile | IFile[] };
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
