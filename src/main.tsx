import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux"; // store provider
import { store } from "./store/store.ts"; // store provider value
import { createBrowserRouter, RouterProvider } from "react-router"; // react router

// api slice
import { productApi } from "./api/productApi.ts";
import { mockApi } from "./api/mockApi.ts";

// components
import App from "./App.tsx";
import Home from "./Pages/Home.tsx";
import SearchPage from "./Pages/SearchPage.tsx";
import Login from "./Pages/Login.tsx";
import NotFound from "./Pages/NotFound.tsx";
import SinglePage from "./Pages/SinglePage.tsx";
import ContactPage from "./Pages/ContactPage.tsx";
import AboutPage from "./Pages/AboutPage.tsx";
import WishlistPage from "./Pages/WishlistPage.tsx";
import CartPage from "./Pages/CartPage.tsx";

// loader for fetch data from dummyjson and mockapi
import User from "./data/fakeUser.json";
async function loader() {
    const products = await store.dispatch(
        productApi.endpoints.getProducts.initiate({ limit: 20, skip: 0 })
    );
    const cart = await store.dispatch(mockApi.endpoints.getCart.initiate());
    const wishlist = await store.dispatch(
        mockApi.endpoints.getWishlist.initiate()
    );
    return {
        products: products.data,
        cart: cart.data,
        wishlist: wishlist.data,
        user: User,
    };
}

// routing
const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        id: "root",
        loader: loader,
        children: [
            { index: true, Component: Home },
            { path: "contact", Component: ContactPage },
            { path: "about", Component: AboutPage },
            { path: "products/:id", Component: SinglePage },
            { path: "products/category/:category", Component: SearchPage },
            { path: "search", Component: SearchPage },
            { path: "wishlist", Component: WishlistPage },
            { path: "cart", Component: CartPage },
            { path: "*", Component: NotFound },
        ],
    },
    {
        path: "/login",
        Component: Login,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
