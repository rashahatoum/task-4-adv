import styles from "./Pagination.module.css";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import type { PaginationProps } from "../../interfaces";

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const getPageNumbers = (): (number | string)[] => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        if (currentPage <= 3) {
            return [1, 2, 3, "...", totalPages];
        }
        if (currentPage >= totalPages - 2) {
            return [1, "...", totalPages - 2, totalPages - 1, totalPages];
        }
        return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    };

    const pages = getPageNumbers();

    return (
        <div className={styles.paginationContainer}>
            <button
                className={styles.arrowBtn}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <GrFormPrevious className={styles.arrowIcon} />
            </button>
            {pages.map((page, index) => {
                if (page === "...") {
                    return (
                        <span key={`dots-${index}`} className={styles.dots}>
                            ...
                        </span>
                    );
                }
                return (
                    <button
                        key={index}
                        onClick={() => onPageChange(page as number)}
                        className={`${styles.pageBtn} ${currentPage === page ? styles.active : ""}`}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                className={styles.arrowBtn}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <GrFormNext className={styles.arrowIcon} />
            </button>
        </div>
    );
};

export default Pagination;