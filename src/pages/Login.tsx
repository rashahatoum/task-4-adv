import { useNavigate, useOutletContext } from "react-router-dom";
import DynamicForm from "../components/DynamicForm/DynamicForm";
import { useEffect, useState } from "react";
import axios from "axios";
import type { AlertContextType, loginData } from "../interfaces";

const Login = () => {
    const [data, setData] = useState<loginData>({
        email: "",
        password: "",
    })

    const navigate = useNavigate()
    const { showAlert } = useOutletContext<AlertContextType>();

    useEffect(() => {
        if (data.email != "" && data.password != "") {
            axios.post("https://dashboard-i552.onrender.com/api/login", data, {
                headers: {
                    "Accept": "application/json",
                },
            })
                .then(res => {
                    localStorage.setItem("token", `Bearer ${res.data.token}`)
                    localStorage.setItem("user_name", res.data.user.user_name);
                    localStorage.setItem("profile_image", res.data.user.profile_image_url);
                    showAlert("success", res?.data?.msg || "Success!"); 
                    setTimeout(() => {
                        navigate("/dashboard");
                    },3000);
                })
                .catch(err => {
                    showAlert("error", err.response?.data?.msg || "Error!");
                })
        }
    }, [data])

    const loginInputs = [
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Enter your email"
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter your password"
        },
    ];
    return (
        <>
            <DynamicForm
                logo="/task-4-adv/assets/imgs/Logo.png"
                title="SIGN IN"
                desc="Enter your credentials to access your account"
                inputs={loginInputs}
                submitBtnText="SIGN IN"
                DirectionText="Don't have an account?"
                linkText="Create one"
                path="/register"
                setData={setData}
            />
        </>
    )
}

export default Login