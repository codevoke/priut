import { useNavigate } from "react-router-dom";
import { Data } from "../App";
import { useContext, useEffect } from "react"
import { toast } from "react-toastify";


export default function Logout () {
  const navigate = useNavigate();
  const { setter } = useContext(Data);

  useEffect( () => {
    setter({ auth: false, token: "" });
    navigate("/");
    toast.success("Successfully loged out");
  }, [setter, navigate])

  return "redirecting..."
}
