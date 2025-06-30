import { useEffect, useState } from "react";

// components
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import ProductCard from "@/components/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";

// react router
import { useSearchParams } from "react-router";

// api slice
import {
    useGetProductsQuery,
    useGetProductsbySearchQuery,
} from "@/api/productApi";

// types
import type { Product } from "@/types/types";

// intersection obererver
import { useInView } from "react-intersection-observer";

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const limit = 20;
    const [skip, setSkip] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const { data: productData, isFetching: isProductFetching } =
        useGetProductsQuery({
            limit,
            skip,
        });
    const { data: productSearch, isFetching: isSearchFetching } =
        useGetProductsbySearchQuery(searchParams.get("q") || "");

    // data for ui
    const showingProduct = query
        ? productSearch?.products
        : productData?.products;

    // to detect wether the element is in view
    const { ref, inView } = useInView({
        threshold: 1,
    });

    useEffect(() => {
        if (searchParams.size == 0)
            if (productData?.products) {
                setProducts([...products, ...productData.products]);

                if (
                    products.length + productData.products.length >=
                    productData.total
                ) {
                    setHasMore(false);
                }
            }
    }, [productData, productSearch?.products]);

    // when div in view and didn't fethcing, do next fetch
    useEffect(() => {
        if (
            inView &&
            hasMore &&
            !isProductFetching &&
            showingProduct?.length !== 0
        ) {
            setSkip(skip + limit);
        }
    }, [inView]);

    // sidebar filter items
    const sidebarFilter = {
        rating: { title: "Rating", list: [5, 4, 3, 2, 1] },
        brand: {
            title: "Brand",
            list: ["Hp", "Accer", "Samsung", "Dell", "LG"],
        },
    };

    return (
        <>
            <div className="flex w-[90%] md:w-full mx-auto">
                <div className="sticky hidden md:block px-10 top-25 h-screen">
                    <SidebarContent>
                        {/* rating filter */}
                        <SidebarGroup>
                            <SidebarGroupLabel>
                                {sidebarFilter.rating.title}
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu className="space-y-2">
                                    {sidebarFilter.rating.list.map((item) => (
                                        <SidebarMenuItem className="flex gap-2">
                                            <Checkbox className="data-[state=checked]:bg-[#007AFF] border-black/30 data-[state=checked]:border-none cursor-pointer" />
                                            <div className="flex gap-1">
                                                {Array.from(
                                                    { length: 5 },
                                                    (_, index) => (
                                                        <svg
                                                            className="w-5 h-5 "
                                                            clipRule="evenodd"
                                                            fillRule="evenodd"
                                                            fill={
                                                                index < item
                                                                    ? "#FDA732"
                                                                    : "#E4E4E4   "
                                                            }
                                                            strokeLinejoin="round"
                                                            strokeMiterlimit="2"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"
                                                                fillRule="nonzero"
                                                            />
                                                        </svg>
                                                    )
                                                )}
                                            </div>
                                            {item}.0
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        {/* brand filiter */}
                        <SidebarGroup>
                            <SidebarGroupLabel>
                                {sidebarFilter.brand.title}
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu className="space-y-2">
                                    <input
                                        type="text"
                                        className="border-b-1 border-gray-500 p-2 focus:outline-0"
                                        placeholder="Search..."
                                    />
                                    {sidebarFilter.brand.list.map((item) => (
                                        <SidebarMenuItem className="flex gap-2">
                                            <Checkbox className="data-[state=checked]:bg-[#007AFF] border-black/30 data-[state=checked]:border-none cursor-pointer" />
                                            {item}
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </div>
                <div className="w-full md:mx-10 grid h-fit grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                    {showingProduct?.length !== 0 ? (
                        showingProduct?.map((item) => (
                            <ProductCard product={item} variant="default" />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-xl text-gray-500">
                            Products no found
                        </p>
                    )}

                    {/* Ref will detect when in view */}
                    <div ref={ref} className="h-10" />

                    {(isProductFetching || isSearchFetching) && (
                        <p className="text-center col-span-full mt-2">
                            Loading more...
                        </p>
                    )}
                    {!hasMore && (
                        <p className="text-center text-gray-500">
                            No more products.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
