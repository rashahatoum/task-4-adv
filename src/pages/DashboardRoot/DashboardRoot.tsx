import styles from './DashboardRoot.module.css'
import { Outlet } from 'react-router-dom'
import SideBar from '../../components/SideBar/SideBar'
import NavBar from '../../components/NavBar/NavBar'
import AlertPopup from '../../components/ui/AlartPopup/AlartPopup'
import { useState } from 'react'


const DashboardRoot = () => {
    const [alert, setAlert] = useState({ show: false, type: "success" as "success" | "error", message: "" });

    const showAlert = (type: "success" | "error", msg: string) => {
        setAlert({ show: true, type, message: msg });
    };
    
    return (
        <div className={styles.dashboardLayout}>
            <SideBar
                logo="/assets/imgs/Logo.png"
                navBar={
                <NavBar items={[
                    {
                        icon: "/assets/imgs/products-icon.png",
                        item: "Products",
                        path: "/dashboard"
                    },
                    {
                        icon: "/assets/imgs/bookmark-icon.png",
                        item: "Favorites",
                        path: "/dashboard/favorites"
                    },
                    {
                        icon: "/assets/imgs/bookmark-icon.png",
                        item: "order list",
                        path: "/dashboard/orders"
                    }]} />
                }/>
            <div className={styles.mainContent}>
            <Outlet context={{ showAlert }} />
            <AlertPopup
                show={alert.show}
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert({ ...alert, show: false })}
            />
            </div>
        </div>
    )
}

export default DashboardRoot