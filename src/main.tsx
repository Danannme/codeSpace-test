import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux"; // store provider
import { store } from "./store/store.ts"; // store provider value
import { createBrowserRouter, RouterProvider } from "react-router"; // react router

// components
import App from "./App.tsx";
import Home from "./components/Home.tsx";
import SearchPage from "./components/SearchPage.tsx";
import Login from "./components/Login.tsx";
import NotFound from "./components/NotFound.tsx";

// routing
const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: Home },
            { path: "search", Component: SearchPage },
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
