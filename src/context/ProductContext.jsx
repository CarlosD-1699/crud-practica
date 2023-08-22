import { createContext, useContext, useState } from "react";
import {
  createProductRequest,
  getProductsRequest,
  deleteProductRequest,
  updateProductRequest,
  getProductRequest,
} from "../api/products";
import { show_alert } from "../utils/function";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within an productProvider");
  }
  return context;
};

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await getProductsRequest();
      console.log(res);
      setProducts(res.data);
      console.log(products);
    } catch (error) {
      console.log(error);
    }
  };

  const createProduct = async (products) => {
    try {
      const res = await createProductRequest(products);
      console.log(res.data);
      getProducts();
      //   let type = res.response.data[0];
      //   let msj = res.response.data[1];
      //   console.log(type);
      //   console.log(msj);
      //   show_alert(msj, type);
      //   if (type === "success") {
      //     document.getElementById("btnclose").click();
      //   }
    } catch (error) {
      show_alert("Request Failed", "error");
      console.log(error);
    }
    //return products;
  };

  const deleteProducts = async (id) => {
    try {
      const res = await deleteProductRequest(id);
      const mySwal = withReactContent(Swal);
      mySwal
        .fire({
          title: "¿Are you sure you want to delete the product?",
          icon: "question",
          text: "You can't go back",
          showCancelButton: true,
          confirmButtonText: "yes, delete",
          cancelButtonText: "Cancel",
        })
        .then((result) => {
          if (result.isConfirmed) {
            if (res.status === 204)
              setProducts(products.filter((product) => product._id !== id));
          } else {
            show_alert("The product was not removed", "info");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const getProduct = async (id) => {
    try {
      const res = await getProductRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateProducts = async (id, products) => {
    try {
      await updateProductRequest(id, products);
      getProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        createProduct,
        getProducts,
        deleteProducts,
        getProduct,
        updateProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
