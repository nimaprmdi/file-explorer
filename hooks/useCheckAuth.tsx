import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const useCheckAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();

        if (data.status === "success") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          router.replace("/");
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, [router]);

  return isLoggedIn;
};

export default useCheckAuth;
