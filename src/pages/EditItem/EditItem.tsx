import { useEffect, useState } from "react";
import DynamicForm from "../../components/DynamicForm/DynamicForm";
import type { InputProps, Product, ProductCreated } from "../../interfaces";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import axios from "axios";
import { GrPrevious } from "react-icons/gr";
import styles from "./EditItem.module.css"
import Loading from "../../components/Loading/Loading";


const EditItem = () => {
  const [data, setData] = useState<ProductCreated>()
  const navigate = useNavigate()
  const { id } = useParams()
  const { showAlert } = useOutletContext<{ showAlert: Function }>();
  const [oldData, setOldData] = useState<Product>()
  const [submit, setSubmit] = useState<boolean>(false)
  

      useEffect(() => {
        axios.get(`https://dashboard-i552.onrender.com/api/items/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
                Accept: "application/json"
            }
        })
            .then(res => {
              setOldData(res.data)})
            .catch(err => console.log(err))
    }, [id])

  useEffect(() => {
    if (submit) {
            let sendData = {
                name: data?.name ? data?.name : oldData?.name,
                price: data?.price ? data?.price : oldData?.price,
                image: data?.image ? data?.image : null,
                _method: "PUT"
            }
      axios.post(`https://dashboard-i552.onrender.com/api/items/${id}`, sendData, {
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
      value: oldData?.name
    },
    {
      name: "price",
      label: "Price",
      type: "text",
      placeholder: "Price",
      wrapperClassName: styles.priceField,
      value: oldData?.price
    },
    {
      name: "image",
      label: "Image",
      type: "file",
      placeholder: "",
      wrapperClassName: styles.imageField,
      value: oldData?.image_url
    },
  ];

  if (!oldData) {
    return <div> <Loading/> </div>;
  }
  return (
    <div>
      <button className={styles.prev}><Link to="/dashboard"><GrPrevious className={styles.prevIcon}/></Link></button>
      <DynamicForm
        title="EDIT ITEM"
        inputs={addInputs}
        submitBtnText="SAVE"
        setData={setData}
        className={styles.productForm}
        textPartClassName={styles.formTitle} 
        submitBtnClassName={styles.saveBtn}
        setSubmit={setSubmit}
      />
    </div>
  )
}

export default EditItem