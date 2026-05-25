import type { itemProps } from "../../interfaces";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";



export interface NavBarProps {
    items: Array<itemProps>
}
const NavBar = ({ items }: NavBarProps) => {
    return (
        <nav>
            <ul className={styles.list}>
                {items.map((item, index) => (
                    <li key={index}>
                        <NavLink to={item.path} className={({ isActive }) => `${isActive ? styles.active : ""} ${styles.item}`}>
                            <img src={item.icon} alt="icon" className={`${styles.icon} ${index === 0 ? styles.firstIcon : ""}`} />
                            {item.item}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default NavBar