import AuthModule from "@/components/modules/Auth";
import { FilesContext } from "@/context/FilesContextProvider";
import { IFile } from "@/types/files";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [isLoggedIn, setIsLoggedin] = useState<boolean>(false);
  const router = useRouter();
  const { dispatch } = useContext(FilesContext);

  useEffect(() => {}, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      await fetch("/api/user")
        .then((res) => res.json())
        .then((data) => {
          setIsLoggedin(data.status === "success");
          if (data.status === "success") {
            router.replace("/explore");
          }
        });
    };

    const fetchUserFiles = async () => {
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

    fetchCurrentUser();
    fetchUserFiles();
  }, []);

  return <div className="w-full h-full">{!isLoggedIn ? <AuthModule /> : null}</div>;
}
