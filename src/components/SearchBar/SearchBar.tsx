import { useRef } from "react";
import styles from "./SearchBar.module.css";
import { IoSearch } from "react-icons/io5";
import type { SearchBarProps } from "../../interfaces";


const SearchBar = ({ onSearch }: SearchBarProps) => {

    const inputRef = useRef<HTMLInputElement>(null);


    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            const value = inputRef.current?.value || "";
            onSearch(value); 
        }
    };

    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                placeholder="Search product by name and press Enter"
                ref={inputRef}
                onKeyDown={handleKeyDown} 
                className={styles.searchInput}
            />
            <IoSearch className={styles.searchIcon}/>
        </div>
    );
};

export default SearchBar;