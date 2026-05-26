import styles from "./Input.module.css"
import type { InputProps } from "../../../interfaces"
import { useEffect, useState } from "react";



const Input = ({ name, label, type, placeholder, value, defaultValue, onChange, className }: InputProps) => {
    const [preview, setPreview] = useState(defaultValue);
    useEffect(() => {
    if (typeof defaultValue === "string" && defaultValue !== "") {
        setPreview(defaultValue.replace("http://", "https://"));
    }
}, [defaultValue]);

    if (type === "file") {
        return (
            <div className={`${styles.inputContainer} ${className}`}>
                <label className={styles.lable}>{label}</label>
                <label className={styles.fileSquare}>
                    <input
                        type="file"
                        name={name}
                        className={styles.hiddenInput}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setPreview(URL.createObjectURL(file)); 
                                onChange?.(e); 
                            }
                        }}
                    />
                    {preview ? (
                        <img src={preview} alt="preview" className={styles.previewImg} onError={(e) => { e.currentTarget.src = "/task-4-adv/assets/imgs/default-product-img.png" }} />) : (
                        <img src="/task-4-adv/assets/imgs/uploadIcon.png" className={styles.uploadIcon} />
                    )}
                </label>
            </div>
        );
    }
    return (
        <div className={`${styles.inputContainer} ${className}`}>
            <label className={styles.lable}>{label}</label>
            <input className={styles.input}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                defaultValue={defaultValue}
            />
        </div>
    )
}

export default Input