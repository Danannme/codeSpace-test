import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// types
import type { Product, Category } from "@/types/types";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
    endpoints: (builder) => ({
        // for fetching products
        getProducts: builder.query<Product[], void>({
            query: () => "/products",
        }),

        // for fetching single product
        getProduct: builder.query<Product, number>({
            query: (productId) => `/products/${productId}`,
        }),

        // for fetching product by category
        getCategories: builder.query<Category, void>({
            query: () => `/products/categories`,
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useGetCategoriesQuery,
} = productApi;
