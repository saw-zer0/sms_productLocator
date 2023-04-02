import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn : false,
    token: ""
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoggedIn: (state, action) => {
            console.log(action)
            return {...state, loggedIn: action.payload}
        },
        setToken: (state, action) => {
            return {...state, token: action.payload.token}
        },
        defaultState: (state) => {
            state = initialState;
        },
    },
});

export const {setLoggedIn, setToken, defaultState} = authSlice.actions;

export default authSlice.reducer;