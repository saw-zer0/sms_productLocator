import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux/es/exports';
import productApi from '../reducers/productsApi'
import { setProducts } from '../reducers/productsSlice';


const products = [
    {
    name: "product1",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    location: "isle 8 R r-4"
    },
    {
    name: "product3",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    location: "isle 8 R r-4"
    },
    {
    name: "product2",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    location: "isle 8 R r-4"
    },
]

export default function ProductList(props) {
  const productList = props.productList || [];
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [productDelete] = productApi.useProductDeleteMutation()
  const [fetchProducts] = productApi.useFetchProductsMutation()
  const handleDeleteProduct =async(productId) => {
    await productDelete(productId)
    const newproducts = await fetchProducts()
    dispatch(setProducts(newproducts))
  }

  const handleEdit = (product) => {
    navigate(`/edit_product/${product._id}`, {replace: true, state: {...product, editMode:true}})
  }

  return (
    <div>
        {productList.map((product, index) => (
            <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{product.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
              <IconButton aria-label="delete" color='error' 
                onClick={()=>(handleDeleteProduct(product._id))}
              >
                <DeleteIcon />
              </IconButton>
              {/* <Button
               variant='outlined'
               color="secondary"
               onClick={()=> handleEdit(product)}
               >Edit</Button> */}
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  )
}
