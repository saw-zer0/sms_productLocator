import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import SearchBar from "../../../core/components/searchBar";
import ProductList from "../components/ProductList";
import productApi from "../reducers/productsApi";
import { setProducts } from "../reducers/productsSlice";

const ViewProducts = () => {
    const dispatch= useDispatch();
    const productList= useSelector((state)=> (state.products.productList))
    const [fetchProducts] = productApi.useFetchProductsMutation();
    const [fetchSingleProduct] = productApi.useFetchSingleProductMutation();
    const [searchProducts] = productApi.useSearchProductsMutation();
    const loadProducts = async() => {
        const products =  await fetchProducts();
        dispatch(setProducts(products))
    }

    useEffect(()=> {
        loadProducts();
    },[])

    const handleSearch = async(value) => {
        const result = await searchProducts(value)
        dispatch(setProducts(result))
    }

    return (
        <>
            <SearchBar 
            handleSearch={handleSearch}
            />
            <ProductList
                productList={productList}
            />
        </>
    )
}

export default ViewProducts;