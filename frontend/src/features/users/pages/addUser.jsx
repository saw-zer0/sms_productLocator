import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { Button } from "@mui/material";

const AddUser = (props) => {
    const location = useLocation()
    const locationState = location.state;
    const navigate = useNavigate()
    console.log(location, navigate)
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
            <UserForm product={locationState}/>
        </>
    )
}

export default AddUser;