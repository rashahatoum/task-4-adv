import { GiEmptyHourglass } from "react-icons/gi";
import styles from "./Loading.module.css";

const Loading = () => {
    return (
        <div className={styles.loaderContainer}>
            <GiEmptyHourglass className={styles.hourglassIcon} />
            <p className={styles.loadingText}>Data is being prepared... Please wait</p>
        </div>
    );
};

export default Loading;