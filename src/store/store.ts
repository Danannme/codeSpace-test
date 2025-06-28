import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "@/api/productApi";
import { cartApi } from "@/api/cartApi";

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootApp = typeof store;
