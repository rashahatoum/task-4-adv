import { useParams, useOutletContext, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import type { AlertContextType, Product } from "../../interfaces";
import styles from "./ShowItem.module.css";
import { GrPrevious } from "react-icons/gr";
import Loading from "../../components/Loading/Loading";


const ShowItem = () => {
    const { id } = useParams<{ id: string }>();
    const { showAlert } = useOutletContext<AlertContextType>();
    const [product, setProduct] = useState<Product>({
        id: 0,
        name: "",
        price: "",
        image_url: "",
        created_at: "",
        updated_at: "",
    }
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString; 

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };



    useEffect(() => {
        if (!id) return;
        setIsLoading(true);
        axios.get(`https://dashboard-i552.onrender.com/api/items/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
                Accept: "application/json"
            }
        })
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => {
                showAlert("error", err.response?.data?.message || "Error!");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    return (
        <div className={styles.container}>
            <button className={styles.prev}><Link to="/dashboard"><GrPrevious className={styles.prevIcon} /></Link></button>
            {isLoading ? (
                <Loading />
            ) :
                <div className={styles.productInfo}>
                    <h1 className={styles.productName}>{product.name}</h1>
                    <div className={styles.imgContainer}>
                    <img
                        src={product.image_url.replace("http://", "https://")}
                        alt={product.name}
                        className={styles.productImg}
                        onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.onerror = null;
                            target.src = "/task-4-adv/assets/imgs/default-product-img.png";
                            
                        }}
                    />
                    </div>
                    <div className={styles.rowGroup}>
                    <p>price: <span>{product.price}$</span></p>
                    <p>Added at: <span>{formatDate(product.created_at)}</span></p>
                    </div>
                    <p className={styles.update}>updated at: <span>{formatDate(product.updated_at)}</span></p>
                </div>}
        </div>
    );
};

export default ShowItem;