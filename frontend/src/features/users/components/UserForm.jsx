import React, { useState } from 'react'
import { Button, TextField, Select, InputLabel, MenuItem, Box, Snackbar, IconButton  } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import userApi from '../../auth/reducers/authApi';
import { useNavigate } from 'react-router-dom';

export default function UserForm(props) {
    const [formValues, setFormValues] = useState(()=>({
        "email": "",
        "password": "",
        "admin": "",
    })
    )
    const navigate = useNavigate()
    const [postUser] = userApi.usePostUserMutation()
    const [succed, setSucced] = useState(false)
    const changeFormValues = (field, value) => {
        setFormValues(state=> ({...state, [field]:value}))
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userPostBody = {
            email: data.get("email"),
            password: data.get("password"),
            admin: data.get("admin"),
        }
        console.log(userPostBody)
        try{
            await postUser(userPostBody);
            setSucced(true)
            handleClick()
            setFormValues(state=> ({
                ...state,
                "email": "",
                "password": "",
                "admin": "",
                })
            )
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
                name="email"
                id="email" 
                label="Email" 
                variant="outlined" 
                value={formValues.email}
                onChange={(e) => {
                    changeFormValues("email", e.target.value);
                }}
                sx={{ m: 1 }}
            />
            <TextField 
                name="password"
                id="password" 
                label="Password" 
                variant="outlined" 
                value={formValues.password}
                onChange={(e) => {
                    changeFormValues("password", e.target.value);
                }}
                sx={{ m: 1 }}
            />
           
            <InputLabel id="admin">Admin</InputLabel>
            <Select
                name="admin"
                labelId="Admin"
                id="admin"
                value={formValues.admin}
                label="Admin"
                onChange={e=>changeFormValues("admin", e.target.value)}
                sx={{ m: 1 }}
            >
                <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
            </Select>
            
            <br/>
            <Button
                variant="contained"
                type="submit"
                sx={{ m: 1 }}
            >Add User</Button>
        </Box>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={succed?"User added successfully":"Failed to Add"}
            action={action}
        />
    </Box>
    )
}
