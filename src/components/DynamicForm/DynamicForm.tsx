import { useRef, type FormEvent } from "react";
import type { FormProps } from "../../interfaces";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";
import styles from "./DynamicForm.module.css";
import { Link } from "react-router-dom";

const DynamicForm = <T,>({
    logo,
    title,
    desc,
    inputs,
    submitBtnText,
    className,
    textPartClassName, 
    submitBtnClassName,
    DirectionText,
    path,
    linkText,
    setData,
    setSubmit,
}: FormProps<T> & { textPartClassName?: string; submitBtnClassName?: string }) => {
    const data = useRef<T>({} as T);

    const sendData = (event: FormEvent) => {
        event.preventDefault();
        setData(data.current);
        if (setSubmit) setSubmit(true);
    };

    return (
        <div>
            <form onSubmit={sendData} className={`${styles.formCard} ${className || ""}`}>
                {logo && <img src={logo} alt="logo" className={styles.logo} />}

                <div className={`${styles.textPart} ${textPartClassName || ""}`}>
                    <h2 className={styles.title}>{title}</h2>
                    {desc && <p className={styles.desc}>{desc}</p>}
                </div>

                {inputs.map((input, index) => {
                    const isFile = input.type === "file";
                    return (
                        <div key={index} className={`${styles.inputWrapper} ${input.wrapperClassName || ""}`}>
                            {!isFile ? (
                                <Input
                                    className={input.className}
                                    label={input.label}
                                    type={input.type}
                                    name={input.name}
                                    placeholder={input.placeholder}
                                    onChange={(event) =>
                                        (data.current = { ...data.current, [input.name]: event.target.value })
                                    }
                                    required
                                    defaultValue={input.value}
                                />
                            ) : (
                                <>
                                    <Input
                                        label={input.label}
                                        type={input.type}
                                        name={input.name}
                                        className={input.className}
                                        placeholder={input.placeholder}
                                        onChange={(event) =>
                                            (data.current = { ...data.current, [input.name]: event.target.files?.[0] })
                                        }
                                        defaultValue={input.value}
                                        required={!input.value}
                                    />
                                </>
                            )}
                        </div>
                    );
                })}

                <Button text={submitBtnText} className={`${styles.submitBtn} ${submitBtnClassName || ""}`} />

                {DirectionText && path && linkText && (
                    <p className={styles.directionText}>
                        {DirectionText} <Link to={path} className={styles.link}>{linkText}</Link>
                    </p>
                )}
            </form>
        </div>
    );
};

export default DynamicForm;