import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({baseUrl: `http://localhost:8080/products`}),
    endpoints: (builder) => ({
        fetchProducts: builder.mutation({
            query: () => {
                return {
                    url: '',
                    method: 'GET',
                }
            }
        }),
        fetchSingleProduct: builder.mutation({
            query: (productId) => {
                return {
                    url: '/:productId',
                    method: 'GET',
                }
            }
        }),
        postProduct: builder.mutation({
            query: (body) => {
                return {
                    url: '',
                    method: "POST",
                    body
                }
            }
        }),
        productDelete: builder.mutation({
            query: (productId) => {
                return {
                    url: `/${productId}`,
                    method: "DELETE",
                }
            }
        }),
        searchProducts: builder.mutation({
            query: (keywords) => {
                return {
                    url: `/search?keywords=${keywords}`,
                    method: 'GET',
                }
            }
        }),
    })
})

export default productApi;