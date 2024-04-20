import React, { useContext, useEffect, useState } from "react";
// import { ModalContext } from "@/context/ModalContextProvider";
// import { CloseIcon } from "../icons/close";
import { useRouter } from "next/router";
import { FilesContext } from "@/context/FilesContextProvider";
import { findObjectByName } from "@/utils/helpers";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
interface LayoutProps {
  children: any;
}

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  const [fileName, setFileName] = useState("");
  const router = useRouter();
  const { slug } = router.query;
  const { asPath } = router;
  const { state, dispatch } = useContext(FilesContext);

  const addNewFile = async () => {
    if (fileName) {
      const extension = fileName
        ? fileName === "root"
          ? "root"
          : !fileName.includes(".")
          ? undefined
          : fileName.split(".").pop()?.toLowerCase()
        : "";
      const newFile = {
        deleteable: true,
        type: extension === undefined ? "folder" : extension,
        name: fileName,
        children: [],
      };

      let updatedFiles;

      // Check if the file name already exists at the current level
      const currentLevel =
        asPath === "/explore"
          ? state.files
          : findObjectByName(state.files, slug![slug!.length - 1])?.[0]?.children || [];

      const fileNameExists = currentLevel.some((file) => file.name === fileName);

      if (!fileNameExists) {
        if (asPath === "/explore") {
          updatedFiles = [...state.files, newFile];
        } else if (slug && asPath !== "/explore") {
          const files = state.files;
          const foundRoot = findObjectByName(files, slug[slug.length - 1]);
          if (foundRoot && foundRoot.length > 0) {
            const oldRoot = foundRoot[0];
            oldRoot.children = [...oldRoot.children, newFile];
            updatedFiles = files;
          } else {
            console.error(`Root object not found: ${slug[slug.length - 1]}`);
          }
        }

        dispatch({ type: "GET_FILES", payload: updatedFiles });

        // API Call
        const res = await fetch("/api/update-file", {
          method: "POST",
          body: JSON.stringify(updatedFiles),
        });

        const data = await res.json();

        if (data.status === "success") {
          console.log("File updated successfully");
        } else {
          console.error("Error updating file:", data.error);
        }
      } else {
        console.error("File name already exists at this level.");
      }
    }
  };

  return (
    <>
      <div className="desktop">
        <div className="window">
          {/* Side Nav Content */}
          <div className="side-panel">
            <label>LIST MAP</label>
            <ul id="favourites">
              <li>{router.asPath.split("/")[1]}</li>
              {router &&
                slug &&
                slug.length > 0 &&
                Array.isArray(slug) &&
                slug.map(
                  (
                    route: string | number,
                    index
                    // eslint-disable-next-line react/jsx-key
                  ) => <li key={uuidv4()}>{route}</li>
                )}
            </ul>
          </div>

          {/* Main Content */}
          <div className="content-panel">
            <ul className="tabs flex items-center">
              <li className="active">Main</li>

              <li className="w-1/6">
                <input
                  type="text"
                  placeholder="Enter a file name eg. file.txt"
                  onChange={(e) => setFileName(e.target.value)}
                  className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </li>

              <button onClick={addNewFile}>
                <li className="add"></li>
              </button>
            </ul>
            <div className="nav">
              <div className="nav-controls">
                <button className="back"></button>
                <button className="forward"></button>
              </div>
              <ul className="nav-box">
                <li>{router.asPath}</li>
                {router &&
                  slug &&
                  slug.length > 0 &&
                  Array.isArray(slug) &&
                  slug.map(
                    (
                      route: string | number
                      // eslint-disable-next-line react/jsx-key
                    ) => <li key={uuidv4()}>{route}</li>
                  )}
              </ul>
            </div>
            <div className="content">{children}</div>
          </div>
        </div>
      </div>

      {/* {state.isOpen ? (
        <div className=" w-full h-full absolute z-50 bg-gray-900 top-0 left-0">
          <div className="w-full h-1/6 flex justify-end pt-8 pe-6">
            <button onClick={handleCloseModal}>
              <CloseIcon />
            </button>
          </div>

          <div className="c-modal h-4/6 w-full relative flex items-center justify-center content-center">
            {state.content}
          </div>
        </div>
      ) : null} */}
    </>
  );
};

export default Layout;
