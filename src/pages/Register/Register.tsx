import { useEffect, useState } from "react";
import DynamicForm from "../../components/DynamicForm/DynamicForm"
import { useNavigate, useOutletContext } from "react-router-dom";
import type { AlertContextType, InputProps, registerData } from "../../interfaces";
import styles from "./Register.module.css"
import axios from "axios";


const Register = () => {
    const [data, setData] = useState<registerData>({
        first_name: "",
        last_name: "",
        user_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        profile_image: null,
    })

    const navigate = useNavigate()
    const { showAlert } = useOutletContext<AlertContextType>();
    useEffect(() => {
        if (data.first_name !== "" && data.email !== "" && data.password !== "") {

        const sendRegistrationData = async () => {
            const generatedUserName = `${data.first_name} ${data.last_name}`.toLowerCase();
            const finalData = { ...data, user_name: generatedUserName };

            if (!data.profile_image) {
                    try {
                        const resp = await fetch("/task-4-adv/assets/imgs/default-profile.png");
                        const blob = await resp.blob();
                        finalData.profile_image = new File([blob], "default-profile.png", { type: blob.type });
                    } catch (imageError) {
                        console.error("Failed to load default image:", imageError);
                    }
                }


            axios.post("https://dashboard-i552.onrender.com/api/register", finalData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json"
                }
            })
                .then(res => {
                    const serverResponse = res.data;

                    localStorage.setItem("token", `Bearer ${serverResponse.data.token}`);
                    localStorage.setItem("user_name", serverResponse.data.user.user_name);
                    localStorage.setItem(
                        "profile_image",
                        serverResponse.data.user.profile_image_url || "/task-4-adv/assets/imgs/default-profile.png"
                    );

                    showAlert("success", serverResponse?.data?.message || "Success!");
                    setTimeout(() => { navigate("/dashboard"); }, 3000);
                })
                .catch(err => {

                    if (err && err.response && err.response.data) {
                        const responseData = err.response.data;
                        if (responseData.message) return showAlert("error", responseData.message);
                        if (responseData.errors) {
                            const messages = Object.values(responseData.errors).flat().join(" - ");
                            return showAlert("error", messages);
                        }
                    }
                    showAlert("error", err?.message || "Internal Server Error");
                });
            }
                sendRegistrationData();
        }
    }, [data]);

    const registerInputs: InputProps[] = [
        {
            name: "first_name",
            label: "Name",
            type: "text",
            placeholder: "First Name",
            wrapperClassName: styles.halfInput,
        },
        {
            name: "last_name",
            type: "text",
            placeholder: "Last Name",
            wrapperClassName: styles.halfInput,
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Enter your email",
            wrapperClassName: styles.fullInput,
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter password",
            wrapperClassName: styles.halfInput,
        },
        {
            name: "password_confirmation",
            type: "password",
            placeholder: "Re-enter your password",
            wrapperClassName: styles.halfInput,
        },
        {
            name: "profile_image",
            label: "Profile Image",
            type: "file",
            placeholder: "",
            wrapperClassName: styles.fullInput,
            className: styles.profileImage,

        },
    ];
    return (
        <>
            <DynamicForm
                logo="/task-4-adv/assets/imgs/Logo.png"
                title="SIGN UP"
                desc="Fill in the following fields to create an account."
                inputs={registerInputs}
                submitBtnText="SIGN UP"
                DirectionText="Do you have an account? "
                linkText="Sign in"
                path="/"
                setData={setData}
                className={styles.registerForm}
                textPartClassName={styles.formHeader}
                submitBtnClassName={styles.formButton}
            />
        </>
    )
}


export default Register