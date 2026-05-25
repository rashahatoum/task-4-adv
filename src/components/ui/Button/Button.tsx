import styles from "./Button.module.css"
import type { ButtonProps } from "../../../interfaces"

const Button = ({text, onClick,children, className }: ButtonProps) => {
    return (
        <>
            <button onClick={onClick} className={`${className} ${styles.mainBtn}`}> 
                {text}
                {children}
                </button>
        </>
    )
}

export default Button