import { useRouter } from "next/router";
import { useContext } from "react";
import { FilesContext } from "@/context/FilesContextProvider";
import { IFile } from "@/types/files";
import toast from "react-hot-toast";

const useFetchData = () => {
  const router = useRouter();
  const { dispatch } = useContext(FilesContext);

  const fetchData = async () => {
    const res = await fetch("/api/user-files", {
      method: "GET",
    });
    const result = await res.json();

    // IF user-files api failed
    if (result.status === "failed") {
      toast(result.message);
      const res: any = await fetch("/api/auth/signout");
      router.push("/");
    }

    const data: IFile[] = (result.data && result.data.files) || [];
    dispatch({ type: "GET_FILES", payload: data });
  };

  return { fetchData };
};

export default useFetchData;
