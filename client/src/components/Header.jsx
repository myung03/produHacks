import React, { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

export default function Header() {
  const { loginState } = useContext(LoginContext);

  return <div>{loginState}</div>;
}
