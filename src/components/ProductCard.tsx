// components
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

// toast
import { toast } from "sonner";

// RTK query
import {
    useAddCartMutation,
    useAddWishlistMutation,
    useDeleteWishlistMutation,
} from "@/api/mockApi";

// react-router
import { Link, useRouteLoaderData, useRevalidator } from "react-router";

// types
import type { Product, Category, Cart, LoaderData } from "@/types/types";

// icons
import { Heart, Eye, Trash2, LoaderCircle } from "lucide-react";

// type checking
function isProduct(obj: Product | Category): obj is Product {
    return (obj as Product).rating !== undefined;
}

export default function ProductCard({
    product,
    variant = "default",
}: {
    product: Product | Category;
    variant?: "flashSale" | "default" | "category" | "wishlist";
}) {
    // RTQ query hooks
    const [AddCart, { isLoading: isLoadingCart }] = useAddCartMutation();
    const [AddWishlist, { isLoading: isLoadingWishlist }] =
        useAddWishlistMutation();
    const [DeleteWishlist, { isLoading: isLoadingDeleteWishlist }] =
        useDeleteWishlistMutation();

    // data from react router loader
    const data = useRouteLoaderData("root") as LoaderData;

    // refech data after post / delete method
    const revalidator = useRevalidator();

    // to check if product in wishlist or not
    const isWishlist = isProduct(product)
        ? !!data.wishlist.find((item) => item.id === product.id)
        : false;

    const productStar = isProduct(product)
        ? parseInt(product.rating.toString().charAt(0))
        : 0;

    const productAfterDiscount = isProduct(product)
        ? product.price - (product.price * product.discountPercentage) / 100
        : 0;

    if (isProduct(product) == false) {
        return (
            <Link
                to={{
                    pathname: `/products/category/${product.name.toLowerCase()}`,
                }}
                className="group flex justify-center items-center gap-2 flex-col w-35 aspect-square bg-white hover:bg-[#007AFF] border-2 rounded cursor-pointer"
            >
                <i className="group-hover:text-white">{product.icon}</i>
                <span className="text-sm group-hover:text-white">
                    {product.name}
                </span>
            </Link>
        );
    }

    async function handleAddCart() {
        try {
            if (!isProduct(product)) return;

            const newCartItem: Cart = {
                mockId: product.id,
                id: crypto.randomUUID(),
                product,
                selected: false,
                userId: data.user.id,
                quantity: 1,
            };

            await AddCart(newCartItem).unwrap();
            revalidator.revalidate();
            toast.success("Successfully added to cart");
        } catch (err) {
            console.error("Failed add cart: ", err);
        }
    }

    async function handleAddWishlist() {
        try {
            if (!isProduct(product)) return;

            await AddWishlist({ ...product, mockId: product.id }).unwrap();
            revalidator.revalidate();
            toast.success("Successfully added to wishlist");
        } catch (err) {}
    }

    async function handleRemoveFromWishlist() {
        try {
            if (!isProduct(product)) return;
            const productSameId = data.wishlist.find(
                (item) => item.id == product.id
            );

            await DeleteWishlist(productSameId?.mockId!);
            revalidator.revalidate();
            toast.success("Successfully remove product from wishlist");
        } catch (err) {
            console.log("Failed remove produdct from wishlist: ", err);
        }
    }

    if (isProduct(product)) {
        return (
            <>
                <div className="group relative flex flex-col bg-white rounded z-5 h-full">
                    <div className="relative">
                        {variant === "flashSale" && (
                            <Badge className="bg-[#007AFF] rounded">
                                {product.discountPercentage}%
                            </Badge>
                        )}
                        {/* fast action */}
                        <div className="absolute top-2 right-2 grid gap-2 z-10">
                            {variant == "wishlist" ? (
                                isLoadingDeleteWishlist ? (
                                    <LoaderCircle className="animate-spin" />
                                ) : (
                                    <Trash2
                                        className="cursor-pointer"
                                        onClick={handleRemoveFromWishlist}
                                    />
                                )
                            ) : (
                                <>
                                    {isLoadingWishlist ||
                                    isLoadingDeleteWishlist ? (
                                        <LoaderCircle className="animate-spin" />
                                    ) : (
                                        <Heart
                                            className="cursor-pointer"
                                            color={isWishlist ? "red" : "black"}
                                            onClick={
                                                isWishlist
                                                    ? handleRemoveFromWishlist
                                                    : handleAddWishlist
                                            }
                                        />
                                    )}
                                    <Eye className="cursor-pointer" />
                                </>
                            )}
                        </div>
                        {/* image */}
                        <Link to={`/product/${product.id}`}>
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-full object-cover rounded-t-lg -z-5"
                            />
                        </Link>
                        <Button
                            className={`absolute ${
                                isLoadingCart ? "bottom-0" : "-bottom-10"
                            } group-hover:bottom-0 opacity-0 group-hover:opacity-100 w-full bg-[#007AFF] hover:bg-blue-600 text-center cursor-pointer`}
                            onClick={handleAddCart}
                        >
                            {isLoadingCart ? (
                                <LoaderCircle className="animate-spin" />
                            ) : (
                                "Add to Cart"
                            )}
                        </Button>
                    </div>
                    <Link to={`/product/${product.id}`} className="mt-auto">
                        <h3 className="mt-2 text-sm font-semibold z-10">
                            {product.title}
                        </h3>
                        {/* price */}
                        <div className="flex gap-3 ">
                            <span className="text-[#007AFF]">
                                ${productAfterDiscount.toFixed(2)}
                            </span>
                            <span className="text-[#686868] line-through">
                                ${product.price}
                            </span>
                        </div>
                        {/* star */}
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }, (_, index) => (
                                <svg
                                    className="w-5 h-5 "
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    fill={
                                        index <= productStar
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
                            ))}
                        </div>
                    </Link>
                </div>
            </>
        );
    }
}
