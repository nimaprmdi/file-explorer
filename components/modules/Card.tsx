import { IFile } from "@/types/files";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { setIcon } from "@/utils/helpers";
import { useContext } from "react";
import { FilesContext } from "@/context/FilesContextProvider";

interface CardProps {
  name: string;
  type: string;
  icon: JSX.Element;
  id: string;
  deletable: boolean;
  childItems: IFile[];
}

function Card({ name, type, icon, deletable, id, childItems }: CardProps): JSX.Element {
  const router = useRouter();
  const extension = name ? (name === "root" ? "root" : name.split(".").pop()?.toLowerCase()) : "";
  const slug = name.replace(/ /g, "_").toLowerCase();
  const currentPath = router.asPath;
  const lastPathSegment = currentPath.split("/").pop();

  const { state, dispatch } = useContext(FilesContext);

  const currentIcon = setIcon(type);

  const handleDelete = async () => {
    dispatch({ type: "DELETE_FILE", payload: id });

    // API Call
    const res = await fetch("/api/update-file", {
      method: "POST",
      body: JSON.stringify(state.files),
    });

    const data = await res.json();

    console.log(data);

    if (data.status === "success") {
      console.log("File updated successfully");
    } else {
      console.error("Error updating file:", data.error);
    }
  };

  return (
    <div className="mx-3 w-64 h-64 flex items-center justify-center content-center flex-col max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <Icon icon={currentIcon} width={32} height={32} />

        <h5 className="mt-4 font-normal text-2xl text-gray-900 dark:text-white">{name}</h5>
        <div className="flex mt-4 md:mt-6">
          {type === "folder" ? (
            <Link
              href={`${currentPath}/${name}`}
              className="py-2 px-4 text-sm font-medium  text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Add child
            </Link>
          ) : null}

          {deletable ? (
            <button
              onClick={(e) => handleDelete()}
              className="inline-flex ms-2 items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-400 dark:focus:ring-red-800"
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Card;
