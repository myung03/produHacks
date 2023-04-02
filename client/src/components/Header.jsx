import React, { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

export default function Header() {
  const { loginState } = useContext(LoginContext);

  // return loginState == "" ? null : (
  //   <div className="bg-indigo-900 text-center py-4 lg:px-4">
  //     <div
  //       className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
  //       role="alert"
  //     >
  //       <span className="font-semibold mr-2 text-center flex-auto ">
  //         It's great to have you here, {loginState}!
  //       </span>
  //     </div>
  //   </div>
  // );
  return <div></div>;
}
