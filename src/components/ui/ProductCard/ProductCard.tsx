import type { ProductCardProps } from "../../../interfaces";
import styles from "./ProductCard.module.css";



const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
    return (
        <div className={styles.card}>
            <img
                src={product.image_url.replace("http://", "https://")}
                alt={product.name}
                className={styles.productImg}
                onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/assets/imgs/default-product-img.png";
                }}
            />
            <div className={styles.overlay}>
                <h3 className={styles.productName}>{product.name}</h3>
                <div className={styles.btnGroup}>
                    <button className={`${styles.actionBtn} ${styles.editBtn}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(product.id);
                        }}>Edit</button>
                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(product.id);
                        }}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard