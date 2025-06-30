import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// types
import type { Product, Category } from "@/types/types";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
    endpoints: (builder) => ({
        // for fetching products
        getProducts: builder.query<
            {
                limit: number;
                products: Product[];
                skip: number;
                total: number;
            },
            { limit: number; skip: number }
        >({
            query: ({ limit, skip }) => `/products?limit=${limit}&skip=${skip}`,
        }),

        // for fetching product by search
        getProductsbySearch: builder.query<
            {
                limit: number;
                products: Product[];
                skip: number;
                total: number;
            },
            string
        >({
            query: (querySearch) => `/products/search?q=${querySearch}`,
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
    useGetProductsbySearchQuery,
} = productApi;
