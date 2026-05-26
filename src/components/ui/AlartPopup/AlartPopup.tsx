import { useEffect } from "react";
import styles from "./AlartPopup.module.css";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdOutlineError } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import type { AlertProps } from "../../../interfaces";


const AlertPopup = ({show, message, type, onClose }: AlertProps) => {
const typeClass = type === "success" ? styles.popupSuccess : styles.popupError;
const showClass = show ? styles.showOverlay : "";

useEffect(() => {
        if (!show) return;
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
        
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className={`${styles.overlay} ${showClass} ${type === "success" ? styles.overlaySuccess : styles.overlayError}`}>
            <div className={`${styles.popupCard} ${typeClass}`}>
                <div className={styles.icon}>
                    {type === "success" ? <IoCheckmarkDoneCircleSharp style={{color: "#2ecc71"}}/> : <MdOutlineError style={{color: "#e74c3c"}}/>}
                </div>
                
                <div className={styles.content}>
                    <h4 className={styles.title} style={{ color: type === "success" ? "#2ecc71" : "#e74c3c" }}>
                        {type === "success" ? "Operation Successful" : "Error Occurred"}
                    </h4>
                    <p className={styles.message}>{message}</p>
                </div>

                <button className={styles.closeBtn} onClick={onClose}>
                    <MdOutlineClose />
                </button>
            </div>
        </div>
    );
};

export default AlertPopup;