import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productList : [],
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            return {...state, productList: action.payload.data}
        },
        defaultState: (state) => {
            state = initialState;
        },
    },
});

export const {setProducts, defaultState} = productSlice.actions;

export default productSlice.reducer;