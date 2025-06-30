// components
import CarouselWithFooter from "./customized/carousel/carousel-07";
import { cn } from "@/lib/utils";

// types
import type { Product, Category } from "@/types/types";

export default function ProductList({
    label,
    children,
    productList,
    productVariant = "default",
    listVariant = "wishlist",
    listRow = 1,
    className,
}: {
    label?: string;
    children?: React.ReactNode;
    productList: Product[] | Category[];
    productVariant?: "flashSale" | "default" | "category" | "wishlist";
    listVariant?: "notCarousel" | "carousel" | "wishlist";
    listRow?: number;
    className?: string | undefined;
}) {
    return (
        <div
            className={cn(
                "flex flex-col gap-4 w-[90%] mx-auto mt-10 md:mt-30",
                className
            )}
            // className={"flex flex-col gap-4 w-[90%] mx-auto mt-10 md:mt-30"}
        >
            {label && (
                <div className="flex gap-2 text-[#007AFF] items-center">
                    <div className="bg-[#007AFF] w-5 h-8 rounded"></div>
                    <p>{label}</p>
                </div>
            )}
            {children}
            <CarouselWithFooter
                variant={listVariant}
                productVariant={productVariant}
                productList={productList}
                listRow={listRow}
            />
        </div>
    );
}
