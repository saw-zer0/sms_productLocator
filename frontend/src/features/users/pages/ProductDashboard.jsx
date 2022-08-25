import React, { useEffect } from 'react'
import { Button, Grid } from '@mui/material'
import SearchBar from '../../../core/components/searchBar'
import ProductList from '../../products/components/ProductList'
import { useDispatch, useSelector } from 'react-redux'
import productApi from "../../products/reducers/productsApi";
import { setProducts } from "../../products/reducers/productsSlice";
import ViewProducts from '../../products/pages/viewProducts'
import { Navigate, useNavigate } from 'react-router-dom'




export default function ProductDashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const products= useSelector((state)=> (state.products.productList))
  const [searchProducts] = productApi.useSearchProductsMutation();
  const handleSearch = async(value) => {
    const result = await searchProducts(value)
    dispatch(setProducts(result))
  }

  useEffect(()=>{

  }, [])

  return (
    <div>
        <Grid container style={{ marginBottom: '2rem'}} spacing={2}>
            <Grid item md={9}>
              <Button
                  variant="contained"
                  onClick={()=> navigate("/new_product", {replace: true})}
                  >+ New Product
              </Button>
            </Grid>
        </Grid>
        <ViewProducts
        />
    </div>
  )
}
