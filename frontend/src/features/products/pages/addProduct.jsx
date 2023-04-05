import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductForm from "../components/productForm";
import { Button } from "@mui/material";


const AddProduct = (props) => {
    const location = useLocation()
    const locationState = location.state;
    const navigate = useNavigate()
    return (
        <>
        <Button
                variant="outlined"
                onClick={()=> {
                    navigate("/dashboard")
                }}
                sx={{
                    mt: 3,
                    ml: 2,
                    mb: 1
                }}
            >Go Back</Button>
            <ProductForm product={locationState}/>
        </>
    )
}

export default AddProduct;