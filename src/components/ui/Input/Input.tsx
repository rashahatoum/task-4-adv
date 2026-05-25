import styles from "./Input.module.css"
import type { InputProps } from "../../../interfaces"
import { useState } from "react";



const Input = ({ name, label, type, placeholder, value, defaultValue, onChange, className }: InputProps) => {
    const [preview, setPreview] = useState<string | null>(typeof defaultValue === "string" && defaultValue !== "" ? defaultValue.replace("http://", "https://") : null);
    if (type === "file") {
        return (
            <div className={`${styles.inputContainer} ${className}`}>
                <label className={styles.lable}>{label}</label>

                {/* هذا هو المربع المقطع */}
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
                        <img src={preview} alt="preview" className={styles.previewImg} onError={(e) => { e.currentTarget.src = "/assets/imgs/default-product-img.png" }} />) : (
                        <img src="/assets/imgs/uploadIcon.png" className={styles.uploadIcon} />
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