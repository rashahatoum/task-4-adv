import { Outlet } from "react-router-dom"
import styles from "./AuthRoot.module.css"
import { useState } from "react";
import AlertPopup from "../../components/ui/AlartPopup/AlartPopup";

const AuthRoot = () => {

  const [alert, setAlert] = useState({ show: false, type: "success" as "success" | "error", message: "" });

  const showAlert = (type: "success" | "error", msg: string) => {
    setAlert({ show: true, type, message: msg });
  };

  return (
    <div className={styles.authWrapper}>
      <Outlet context={{ showAlert }} />
      <AlertPopup
        show={alert.show}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ ...alert, show: false })}
      />
    </div>
  )
}

export default AuthRoot