import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn : false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoggedIn: (state, action) => {
            return {...state, loggedIn: action.payload}
        },
        defaultState: (state) => {
            state = initialState;
        },
    },
});

export const {setLoggedIn, defaultState} = authSlice.actions;

export default authSlice.reducer;