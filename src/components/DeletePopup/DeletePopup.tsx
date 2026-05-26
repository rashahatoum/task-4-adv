import axios from "axios"
import type { AlertContextType, DeletePopupProps } from "../../interfaces"
import styles from "./DeletePopup.module.css"
import Button from "../ui/Button/Button"
import { useOutletContext } from "react-router-dom"

const DeletePopup = ({ deletedProduct, setDeletedProduct , setProducts}: DeletePopupProps) => {

const { showAlert } = useOutletContext<AlertContextType>();

    const cancleDelete = () => {
        setDeletedProduct({
            id: 0,
            name: "",
            price: "",
            image_url: "",
            created_at: "",
            updated_at: "",
        })
    }
    const deleteProduct = () => {
        axios.delete(`https://dashboard-i552.onrender.com/api/items/${deletedProduct.id}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
                "Accept": "application/json"
            }
        })
            .then(res => {
                showAlert("success", res?.data?.msg || "Success!");
                setProducts((prev) => prev.filter(item => item.id !== deletedProduct.id));
                cancleDelete();
            })
            .catch(err => {
                showAlert("error", err.response?.data?.msg || "Error!");
            })
    }
    return (
        <div className={`${styles.overlay} ${deletedProduct.name !== "" ? styles.show : ""}`}>
        <div className={styles.deletePopup}>
            <p>Are you sure you want to delete the product?</p>
            <div className={styles.btnGroup}>
                <Button className={styles.btn} onClick={deleteProduct}>Yes</Button>
                <Button className={styles.btn} onClick={cancleDelete}>No</Button>
            </div>
        </div>
        </div>
    )
}

export default DeletePopup