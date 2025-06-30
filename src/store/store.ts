import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "@/api/productApi";
import { mockApi } from "@/api/mockApi";

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        [mockApi.reducerPath]: mockApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productApi.middleware)
            .concat(mockApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootApp = typeof store;
