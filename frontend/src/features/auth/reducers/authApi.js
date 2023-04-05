import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: `http://localhost:8080/users`}),
    endpoints: (builder) => ({
        fetchUsers: builder.mutation({
            query: () => {
                return {
                    url: '/',
                    headers: {
                        authorization: sessionStorage.getItem("token")
                    },
                    method: 'GET',
                }
            }
        }),
        fetchSingleUser: builder.mutation({
            query: (userId) => {
                return {
                    url: `/:${userId}`,
                    method: 'GET',
                }
            }
        }),
        postUser: builder.mutation({
            query: (body) => {
                return {
                    url: '/signup',
                    method: "POST",
                    body
                }
            }
        }),
        userLogin: builder.mutation({
            query: (body) => {
                return {
                    url: '/login',
                    method: "POST",
                    body
                }
            }
        }),
        validateToken: builder.mutation({
            query: (token) => {
                return {
                    url: '/validate_token',
                    method: "GET",
                    headers: {
                        authorization: token
                    }
                }
            }
        }),
        userDelete: builder.mutation({
            query: (userId) => {
                return {
                    headers: {
                        authorization: sessionStorage.getItem("token")
                    },
                    url: `/${userId}`,
                    method: "DELETE",
                }
            }
        }),
        searchUsers: builder.mutation({
            query: (keywords) => {
                return {
                    url: `/search?keywords=${keywords}`,
                    method: 'GET',
                }
            }
        }),
    })
})

export default userApi;