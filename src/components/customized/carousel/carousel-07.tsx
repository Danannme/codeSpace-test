"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

// types
import type { Product, Category } from "@/types/types";

export default function CarouselWithFooter({
    variant = "carousel",
    productVariant = "default",
    productList,
    listRow = 1,
}: {
    productVariant?: "flashSale" | "default" | "category" | "wishlist";
    variant?: "carousel" | "notCarousel" | "wishlist";
    productList: Product[] | Category[];
    listRow?: number;
}) {
    if (productList.length === 0) {
        return (
            <div>
                <h1 className="text-center text-xl">The list is empty</h1>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto py-4">
            <Carousel
                opts={{
                    active: true,
                    align: "start",
                    dragFree: true,
                    slidesToScroll: 3,
                }}
                className="w-full mx-auto"
            >
                <CarouselContent className="flex justify-start gap-4">
                    {listRow === 1
                        ? productList.map((product, index) => (
                              <CarouselItem
                                  key={index}
                                  className={`${
                                      productVariant !== "category"
                                          ? "basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                                          : "basis-auto"
                                  }`}
                              >
                                  <ProductCard
                                      variant={productVariant}
                                      product={product}
                                  />
                              </CarouselItem>
                          ))
                        : Array.from({
                              length: Math.ceil(productList.length / 2),
                          }).map((_, index) => (
                              <CarouselItem
                                  key={index}
                                  className={`${
                                      productVariant !== "category"
                                          ? "basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                                          : "basis-auto"
                                  } grid grid-rows-2 gap-8`}
                              >
                                  {productList[index * 2] && (
                                      <ProductCard
                                          variant={productVariant}
                                          product={productList[index * 2]}
                                      />
                                  )}
                                  {productList[index * 2 + 1] && (
                                      <ProductCard
                                          variant={productVariant}
                                          product={productList[index * 2 + 1]}
                                      />
                                  )}
                              </CarouselItem>
                          ))}
                </CarouselContent>

                {variant === "carousel" ? (
                    <div className="absolute flex gap-4 -top-18 right-0 md:right-20">
                        <CarouselPrevious className="w-12 h-12 rounded-full! cursor-pointer bg-[#F5F5F5]" />
                        <CarouselNext className="w-12 h-12 rounded-full! cursor-pointer bg-[#F5F5F5]" />
                    </div>
                ) : variant === "wishlist" ? (
                    <Button
                        variant={"outline"}
                        className="absolute -top-16 right-0 rounded px-6 py-4 cursor-pointer"
                    >
                        Move All To Bag
                    </Button>
                ) : (
                    <Button className="absolute -top-16 right-0 rounded bg-[#007AFF] hover:bg-blue-600 px-6 py-4 cursor-pointer">
                        View All
                    </Button>
                )}
            </Carousel>
        </div>
    );
}
