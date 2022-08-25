import React from "react";
import { useLocation } from "react-router-dom";
import ProductForm from "../components/productForm";

const AddProduct = (props) => {
    const location = useLocation()
    const locationState = location.state;
    return (
        <>
            <ProductForm product={locationState}/>
        </>
    )
}

export default AddProduct;