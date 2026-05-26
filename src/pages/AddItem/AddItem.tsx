import { useEffect, useState } from "react";
import DynamicForm from "../../components/DynamicForm/DynamicForm";
import type { AlertContextType, InputProps, ProductCreated } from "../../interfaces";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import { GrPrevious } from "react-icons/gr";
import styles from "./AddItem.module.css"


const AddItem = () => {
  const [data, setData] = useState<ProductCreated>()
  const navigate = useNavigate()
  const { showAlert } = useOutletContext<AlertContextType>();

  useEffect(() => {
    if (data?.name) {
      axios.post("https://dashboard-i552.onrender.com/api/items", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
          Accept: "application/json"
        }
      })
        .then(res => {
          showAlert("success", res?.data?.message || "Success!");
          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);
        }
        )
        .catch(err => {
          console.log("Full Error Object:", err);
          const backendErrors = err.response?.data?.errors;

          if (backendErrors) {
            const messages = Object.values(backendErrors).flat().join(" - ");
            showAlert("error", messages);
          }
          else {
            showAlert("error", err.data?.message || "Internal Server Error");
          }
        })
    }
  }, [data])

  const addInputs: InputProps[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter the product name",
      wrapperClassName: styles.nameField,
    },
    {
      name: "price",
      label: "Price",
      type: "text",
      placeholder: "Price",
      wrapperClassName: styles.priceField,
    },
    {
      name: "image",
      label: "Image",
      type: "file",
      placeholder: "",
      wrapperClassName: styles.imageField,

    },
  ];
  return (
    <div>
      <button className={styles.prev}><Link to="/dashboard"><GrPrevious className={styles.prevIcon}/></Link></button>
      <DynamicForm
        title="ADD NEW ITEM"
        inputs={addInputs}
        submitBtnText="SAVE"
        setData={setData}
        className={styles.productForm}
        textPartClassName={styles.formTitle} 
        submitBtnClassName={styles.saveBtn}
      />
    </div>
  )
}

export default AddItem