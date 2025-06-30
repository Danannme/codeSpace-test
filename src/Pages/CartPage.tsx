import { useState } from "react";

// components
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// rtk query
import { useDeleteCartMutation } from "@/api/mockApi";

// react router
import { useRouteLoaderData, useRevalidator } from "react-router";

// taost
import { toast } from "sonner";

// types
import type { LoaderData } from "@/types/types";

// icons
import { Plus, Minus, Trash2, LoaderCircle } from "lucide-react";

export default function CartPage() {
    const revalidator = useRevalidator();
    const data = useRouteLoaderData("root") as LoaderData;
    const [selectedCheckbox, setSelectedCheckbox] = useState<{ id: string }[]>( // array for save selected cartItem
        []
    );
    const [DeleteCart, { isLoading }] = useDeleteCartMutation();

    if (data.cart == undefined || data.cart.length == 0) {
        return (
            <div>
                <h1 className="text-center text-xl">The list is empty</h1>
            </div>
        );
    }

    // const totalPrice = selectedCheckbox.reduce(
    //     (prev, curr) =>
    //         prev + data.cart.find((item) => item.id == curr.id)!.product.price,
    //     0
    // );

    const totalPrice = 0;

    function handleCheckboxChange(productId: string) {
        if (
            selectedCheckbox.find((item) => item.id == productId) == undefined
        ) {
            setSelectedCheckbox([...selectedCheckbox, { id: productId }]);
        } else {
            const deletedCheckbox = selectedCheckbox.filter(
                (item) => item.id !== productId
            );
            setSelectedCheckbox(deletedCheckbox);
        }
    }

    async function handleRemoveFromCart(productId: string) {
        try {
            const productSameId = data.cart.find(
                (item) => item.id == productId
            );
            await DeleteCart(productSameId?.mockId!);
            setSelectedCheckbox((prev) =>
                prev.filter((item) => item.id !== productId)
            );
            revalidator.revalidate();
            toast.success("Successfully remove product from cart");
        } catch (err) {
            console.log("Failed to remove product from cart", err);
        }
    }

    return (
        <>
            <div className="w-[90%] items-center mx-auto space-y-4">
                {/* cart table */}
                <div className="h-100 overflow-y-auto">
                    <table className="relative table-auto w-full border-separate border-spacing-y-2 ">
                        <thead className="sticky top-0 bg-white h-10 hidden md:table-header-group">
                            <tr>
                                <th className="text-left"></th>
                                <th className="text-left w-[90%]">Product</th>
                                <th className="text-center whitespace-nowrap">
                                    QTY
                                </th>
                                <th className="text-left">Price</th>
                                <th className="text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.cart.map((cartItem) => (
                                <tr
                                    key={cartItem.product.id}
                                    className="bg-[#F5F5F5]"
                                >
                                    {/* checkbox */}
                                    <td>
                                        <div className="flex justify-center items-center px-4 py-14 md:py-18">
                                            <Checkbox
                                                onCheckedChange={() =>
                                                    handleCheckboxChange(
                                                        cartItem.id
                                                    )
                                                }
                                                className="w-5 h-5 data-[state=checked]:bg-[#007AFF] border-black/30 data-[state=checked]:border-none cursor-pointer"
                                            />
                                        </div>
                                    </td>

                                    {/* product */}
                                    <td className="w-[90%]">
                                        <div className="flex items-center gap-2 pr-6">
                                            <img
                                                src={cartItem.product.thumbnail}
                                                alt={cartItem.product.title}
                                                className="w-20 md:w-30"
                                            />
                                            <div className="w-full space-y-2">
                                                <span className="text-gray-500">
                                                    {
                                                        cartItem.product
                                                            .availabilityStatus
                                                    }
                                                </span>
                                                <h2 className="font-semibold">
                                                    {cartItem.product.title}
                                                </h2>
                                                <div className="flex justify-between items-center">
                                                    {/* price mobile view */}
                                                    <span className="text-lg md:hidden font-bold">
                                                        $
                                                        {(
                                                            cartItem.product
                                                                .price -
                                                            (cartItem.product
                                                                .price *
                                                                cartItem.product
                                                                    .discountPercentage) /
                                                                100
                                                        ).toFixed(2)}
                                                    </span>
                                                    {/* qty mobile view */}
                                                    <div className="flex md:hidden items-center gap-2">
                                                        <Minus size={15} />
                                                        {cartItem.quantity}
                                                        <Plus size={15} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* QTY */}
                                    <td className="hidden md:table-cell whitespace-nowrap">
                                        <div className="grid grid-cols-3 items-center gap-8 justify-items-center px-12">
                                            <Minus size={15} />
                                            {cartItem.quantity}
                                            <Plus size={15} />
                                        </div>
                                    </td>

                                    {/* price */}
                                    <td className="hidden md:table-cell text-2xl font-bold">
                                        ${cartItem.product.price}
                                    </td>

                                    {/* quick action */}
                                    <td className="hidden md:table-cell px-8">
                                        {selectedCheckbox.find(
                                            (item) => item.id == cartItem.id
                                        ) &&
                                            (isLoading ? (
                                                <LoaderCircle className="animate-spin" />
                                            ) : (
                                                <Trash2
                                                    className="cursor-pointer hover:text-red-600"
                                                    onClick={() =>
                                                        handleRemoveFromCart(
                                                            cartItem.id
                                                        )
                                                    }
                                                />
                                            ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* total */}
                <div>
                    <h3 className="font-semibold">Choose Shipping</h3>
                    <div className="flex flex-col md:flex-row justify-between mt-4 gap-8">
                        <div className="w-full flex md:grid items-center justify-center gap-8 md:gap-4 md:justify-start">
                            <span className="flex gap-2">
                                <input type="radio" name="shipping" />
                                <Label>Free</Label>
                            </span>
                            <span className="flex gap-2">
                                <input type="radio" name="shipping" />
                                <Label>
                                    Delivery at home <br /> (Upder 2-4 day) $12
                                </Label>
                            </span>
                        </div>
                        <div className="w-full md:w-100 space-y-2">
                            <span className="flex justify-between">
                                <p>
                                    Subtotal ({selectedCheckbox.length}
                                    {" user"})
                                </p>
                                <p>${totalPrice}</p>
                            </span>
                            <span className="flex justify-between">
                                <p>Shipping</p>
                                <p>$0.01</p>
                            </span>
                            <span className="flex justify-between">
                                <p>Cart Total</p>
                                <p className="text-2xl font-bold">
                                    ${totalPrice}
                                </p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* checkout button */}
            <div className="w-[90%] mx-auto">
                <Button className="w-full flex justify-between p-6 bg-[#007AFF] mt-4">
                    <h2 className="text-xl font-semibold">Checkout</h2>
                    <h2 className="text-xl font-semibold">${totalPrice}</h2>
                </Button>
            </div>
        </>
    );
}
