// components
import ProductList from "@/components/ProductList";

// react-router
import { useRouteLoaderData } from "react-router";

// types
import type { LoaderData } from "@/types/types";

export default function WishlistPage() {
    const data = useRouteLoaderData("root") as LoaderData;

    return (
        <>
            {/* wishlist */}
            <ProductList
                productList={data.wishlist}
                productVariant="wishlist"
                listVariant="wishlist"
                className="mt-0 md:mt-0"
            >
                {/* header section */}
                <div className="w-full flex flex-col md:flex-row md:items-center font-bold gap-4 md:gap-25">
                    <h1 className="text-lg font-normal">
                        Wishlist ({data.wishlist.length})
                    </h1>
                </div>
            </ProductList>
            {/* recommendation */}
            <ProductList
                label="Just For You"
                productList={data.products.products}
                listVariant="notCarousel"
            />
        </>
    );
}
