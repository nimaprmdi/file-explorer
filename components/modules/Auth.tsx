import Link from "next/link";
import React from "react";

const AuthModule = () => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-wrap content-center">
      <h4 className="w-full  text-center mb-4 text-2xl">Please Login or Create an Account</h4>

      <Link
        className="bg-blue-500 text-lg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ms-2"
        href="/login"
      >
        Login
      </Link>
      <Link
        className="bg-blue-500 text-lg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ms-2"
        href="/signup"
      >
        Signup
      </Link>
    </div>
  );
};

export default AuthModule;
