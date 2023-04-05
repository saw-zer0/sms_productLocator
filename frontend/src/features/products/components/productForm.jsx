import React, { useState } from 'react'
import { Button, TextField, Select, InputLabel, MenuItem, Box, Snackbar, IconButton  } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

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

    const [postProduct] = productApi.usePostProductMutation()
    const [succed, setSucced] = useState(false)
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
        try{
            await postProduct(productPostBody);
            setSucced(true)
            handleClick()
            setFormValues(state=>({
                ...state,
                "productName": "",
                "description": "",
                "categories": "",
                "tag": "",
                "isleNum": "",
                "side": "",
                "row": "",
            }))
        }catch(err){
            setSucced(false)
            handleClick()
        }
    }

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    
      const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

    return(
        <Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ m: 1 }}>
            <TextField 
                name="productName"
                id="productName" 
                label="Product Name" 
                variant="outlined" 
                value={formValues.productName}
                onChange={(e) => {
                    changeFormValues("productName", e.target.value);
                }}
                sx={{ m: 1 }}
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
                sx={{ m: 1 }}
            />
            <Box>
            <TextField 
                name="tags"
                id="tags" 
                label="Tags" 
                variant="outlined" 
                value={formValues.tag}
                onChange={(e) => {
                    changeFormValues("tag", e.target.value);
                }}
                sx={{ m: 1 }}
            />
            <Button
                variant='outlined'
                // onClick={()=>addTag()}
                sx={{ m: 1 }}
            >+ tags
            </Button>
            </Box>
            <TextField
                name="isleNum"
                type="number"
                id="isleNum" 
                label="Isle Number" 
                value={formValues.isleNum}
                onChange={(e) => {
                    changeFormValues("isleNum", e.target.value);
                }}
                sx={{ m: 1 }}
            />
            <InputLabel id="side">Side</InputLabel>
            <Select
                name="side"
                labelId="side-label"
                id="side"
                value={formValues.side}
                label="Side"
                onChange={e=>changeFormValues("side", e.target.value)}
                sx={{ m: 1 }}
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
                sx={{ m: 1 }}
            />
            <br/>
            <Button
                variant="contained"
                type="submit"
                sx={{ m: 1 }}
            >Add Product</Button>
        </Box>
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={succed?"Added":"Failed to Add"}
        action={action}
      />
        </Box>
    )
}
