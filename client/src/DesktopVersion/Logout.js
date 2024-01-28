import { useNavigate } from "react-router-dom";
import { Data } from "../App";
import { useContext, useEffect } from "react"


export default function Logout () {
  const navigate = useNavigate();
  const { setter } = useContext(Data);

  useEffect( () => {
    setter({ auth: false, token: "" });
    navigate("/");
  }, [])

  return "redirecting..."
}
