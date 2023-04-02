import React from "react";
import { useLocation } from "react-router-dom";
import UserForm from "../components/UserForm";

const AddUser = (props) => {
    const location = useLocation()
    const locationState = location.state;
    return (
        <>
            <UserForm product={locationState}/>
        </>
    )
}

export default AddUser;