import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// types
import type { Product } from "@/types/types";

export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://685ac7619f6ef9611157c1d3.mockapi.io",
    }),
    endpoints: (builder) => ({
        // post method fetching for send product to mock api
        addCart: builder.mutation<Product, Product>({
            query: (newProduct) => ({
                url: "/cart",
                method: "POST",
                body: newProduct,
            }),
        }),
    }),
});

export const { useAddCartMutation } = cartApi;
