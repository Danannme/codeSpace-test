// components
import ProductCard from "@/components/ProductCard";

// react router
import { useRouteLoaderData } from "react-router";

// types
import type { LoaderData } from "@/types/types";

export default function SinglePage() {
    const data = useRouteLoaderData("root") as LoaderData;

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data.products.products.map((item) => (
                    <ProductCard product={item} variant="default" />
                ))}
            </div>
        </>
    );
}
