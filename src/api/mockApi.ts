import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// types
import type { Product, Cart } from "@/types/types";

export const mockApi = createApi({
    reducerPath: "mockApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://685ac7619f6ef9611157c1d3.mockapi.io",
    }),
    tagTypes: ["Products", "Cart", "Wishlist"],
    endpoints: (builder) => ({
        // get method fetching for get carts prodcut
        getCart: builder.query<Cart[], void>({
            query: () => "/cart",
            providesTags: ["Cart"],
        }),

        // post method fetching for send product to mock api cart
        addCart: builder.mutation<Cart, Cart>({
            query: (newProduct) => ({
                url: "/cart",
                method: "POST",
                body: newProduct,
            }),
            invalidatesTags: ["Cart"],
        }),

        // post method fetching for delete product to mock api cart
        deleteCart: builder.mutation<Cart, number>({
            query: (productId) => ({
                url: `/cart/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
        }),

        // get method fetching for get wishlist prodcut
        getWishlist: builder.query<Product[], void>({
            query: () => "/wishlist",
            providesTags: ["Wishlist"],
        }),

        // post method fetching for send product to mock api wishlsit
        addWishlist: builder.mutation<Product, Product>({
            query: (newProduct) => ({
                url: "/wishlist",
                method: "POST",
                body: newProduct,
            }),
            invalidatesTags: ["Wishlist"],
        }),

        // delete method fething for delete product from wishlist
        deleteWishlist: builder.mutation<Product, number>({
            query: (productId) => ({
                url: `/wishlist/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Wishlist"],
        }),
    }),
});

export const {
    useAddCartMutation,
    useGetCartQuery,
    useGetWishlistQuery,
    useAddWishlistMutation,
    useDeleteWishlistMutation,
    useDeleteCartMutation,
} = mockApi;
