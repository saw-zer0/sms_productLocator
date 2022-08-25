import React, { useState } from 'react'
import { Button, TextField, Select, InputLabel, MenuItem, Box,  } from '@mui/material'

import productApi from "../reducers/productsApi";

export default function ProductForm(props) {
    const [formValues, setFormValues] = useState(()=>({
        "productName": "",
        "description": "",
        "categories": "",
        "tag": "",
        "isleNum": "",
        "side": "",
        "row": "",
    })
    )

    const [postProduct] = productApi.usePostProductMutation();

    const changeFormValues = (field, value) => {
        setFormValues(state=> ({...state, [field]:value}))
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const productPostBody = {
            name: data.get("productName"),
            description: data.get("description"),
            category: formValues.categories,
            isleNum: data.get("isleNum"),
            side: data.get("side"),
            row:data.get("rowNum")
        }
        console.log(productPostBody)
        await postProduct(productPostBody);
    }

    return(
        <Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField 
                name="productName"
                id="productName" 
                label="Product Name" 
                variant="outlined" 
                value={formValues.productName}
                onChange={(e) => {
                    changeFormValues("productName", e.target.value);
                }}
            />
            <TextField 
                name="description"
                id="description" 
                label="Description" 
                variant="outlined" 
                value={formValues.description}
                onChange={(e) => {
                    changeFormValues("description", e.target.value);
                }}
            />
            <TextField 
                name="tags"
                id="tags" 
                label="Tags" 
                variant="outlined" 
                value={formValues.tag}
                onChange={(e) => {
                    changeFormValues("tag", e.target.value);
                }}
            />
            <Button
                variant='outlined'
                // onClick={()=>addTag()}
            >+ tags
            </Button>
            <TextField
                name="isleNum"
                type="number"
                id="isleNum" 
                label="Isle Number" 
                value={formValues.isleNum}
                onChange={(e) => {
                    changeFormValues("isleNum", e.target.value);
                }}
            />
            <InputLabel id="side">Side</InputLabel>
            <Select
                name="side"
                labelId="side-label"
                id="side"
                value={formValues.side}
                label="Side"
                onChange={e=>changeFormValues("side", e.target.value)}
            >
                <MenuItem value={"RIGHT"}>Right</MenuItem>
                <MenuItem value={"LEFT"}>Left</MenuItem>
            </Select>
            <TextField
                name="rowNum"
                type="number"
                id="rowNum" 
                label="Row Number" 
                value={formValues.row}
                onChange={(e) => {
                    changeFormValues("row", e.target.value);
                }}
            />
            <Button
                variant="contained"
                type="submit"
            >Add Product</Button>
        </Box>
        
        </Box>
    )
}
