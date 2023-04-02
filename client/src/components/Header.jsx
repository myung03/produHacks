import React, { useContext } from "react";
import { LoginContext } from "../App";

export default function Header() {
  const { loginState } = useContext(LoginContext);

  return <div>{loginState}</div>;
}
