import styles from "./SideBar.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloseCircleSharp } from "react-icons/io5";
import { CgMenuRound } from "react-icons/cg";
import type { SideBarProps } from "../../interfaces";


const SideBar = ({ logo, navBar }: SideBarProps) => {
    const [name, setName] = useState<string>("");
    const [profile, setProfile] = useState<string>("/task-4-adv/assets/imgs/default-profile.png");
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const navigate = useNavigate();
    useEffect(() => {
        const mql = window.matchMedia("(max-width: 1024px)");
        const checkScreen = () => setIsOpen(!mql.matches);
        checkScreen();
        mql.addEventListener("change", checkScreen);
        return () => mql.removeEventListener("change", checkScreen);
    }, []);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/");
            return;
        }

        const savedName = localStorage.getItem("user_name");
        const savedProfile = localStorage.getItem("profile_image");

        if (savedName) setName(savedName);
        if (savedProfile && savedProfile !== "null") {
            setProfile(savedProfile);
        }
    }, [navigate]);

    const logout = () => {
        const token = localStorage.getItem("token");
        fetch("https://dashboard-i552.onrender.com/api/logout", {
            method: "POST",
            headers: {
                "Authorization": token ?? "",
                "Accept": "application/json"
            },
        })
            .then(res => res.json())
            .then(_res => {
                localStorage.removeItem("token");
                localStorage.removeItem("user_name");
                localStorage.removeItem("profile_image");
                navigate("/");
            })
            .catch (err => {
    window.alert(err.response?.data?.msg || "Error in logout!")
})
    }

return (
    <div className={`${styles.sideBar} ${isOpen ? "" : styles.closed}`}>
        <button className={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
            <div className={styles.toggleIcon}>
                {isOpen ? <IoCloseCircleSharp /> : <CgMenuRound />}
            </div>
        </button>
        <div className={styles.logoGroup}>
            <div className={styles.rectangle}></div>
            <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.profileGroup}>
            <img src={profile.replace("http://", "https://")} alt={name} className={styles.profileImage}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "/task-4-adv/assets/imgs/default-profile.png";
                }}
            />
            <h3 className={styles.name}>{name}</h3>
        </div>
        {navBar}
        <button onClick={logout} className={styles.logout}>logout <img src="/task-4-adv/assets/imgs/logout-icon.png" alt="Logout" className={styles.logoutIcon}></img></button>
    </div>
)
}

export default SideBar