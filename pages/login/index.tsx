import { useRouter } from "next/router";
import React, { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.innerText = "Please wait...";

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (data.status === "failed") {
      toast(data.message);
      const button = btnRef.current;
      if (button) {
        button.innerText = "Login";
      }
      return;
    }

    if (data.status === "success") router.push("/explore");
  };

  useEffect(() => {
    fetch("/api/user")
      .then((result) => result.json())
      .then((data) => data.status === "success" && router.replace("/explore"));
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center content-center flex-wrap flex-col">
      <div className="w-full  text-center mb-4">
        <h4 className="text-2xl">Please Login</h4>
      </div>

      <div className="w-1/8">
        <input
          placeholder="email"
          type="text"
          value={email}
          className="shadow mb-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />

        <input
          placeholder="password"
          type="password"
          value={password}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
      </div>

      <div className="w-max">
        <button
          ref={btnRef}
          className="bg-blue-500 text-2xl hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ms-2 mt-4"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
