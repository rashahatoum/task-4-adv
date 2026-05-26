import { useState, useEffect } from "react";

import styles from "./ReadItem.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import Button from "../../components/ui/Button/Button";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../components/ui/ProductCard/ProductCard";
import type { AlertContextType, Product } from "../../interfaces";
import Loading from "../../components/Loading/Loading";
import DeletePopup from "../../components/DeletePopup/DeletePopup";



const ReadItem = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { showAlert } = useOutletContext<AlertContextType>();
  const navigate = useNavigate()
    const [deletedProduct, setDeletedProduct] = useState<Product>({
    id: 0,
    name: "",
    price: "",
    image_url: "",
    created_at: "",
    updated_at: "",
  })

  useEffect(() => {
    setIsLoading(true);

    axios.get("https://dashboard-i552.onrender.com/api/items", {
      headers: {
        Authorization: localStorage.getItem("token"),
        Accept: "application/json"
      }
    })
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        showAlert("error", err.response?.data?.msg || "Error!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);


  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
        <SearchBar
          onSearch={(value) => {
            setSearchQuery(value); 
            setCurrentPage(1);     
          }}
        />
        <Button className={styles.addBtn}>
          <Link to="/dashboard/add">ADD NEW PRODUCT</Link>
        </Button>
      <DeletePopup 
      deletedProduct={deletedProduct} 
      setDeletedProduct={setDeletedProduct}
      setProducts={setProducts}/>
      {isLoading ? (
        <Loading/>
      ) : (
        <div className={styles.productsGrid}>
          {displayedProducts.map((item) => (
            <div className={styles.showProduct} onClick={()=>navigate(`/dashboard/show/${item.id}`)} key={item.id}>
            <ProductCard
              key={item.id}
              product={item}
              onEdit={()=>navigate(`/dashboard/edit/${item.id}`)}
              onDelete={()=>{setDeletedProduct(item)}}
            />
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <p className={styles.noData}> No product matching your search was found.</p>
          )}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ReadItem;
