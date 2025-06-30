"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export default function CarouselWithPagination({
    carouselItem,
}: {
    carouselItem: string[];
}) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <div className="w-full">
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    {carouselItem.map((image, index) => (
                        <CarouselItem key={index}>
                            <Card className="w-full p-0">
                                <CardContent
                                    className={`flex w-full h-fit items-center justify-center p-0`}
                                >
                                    <img
                                        className="w-full object-contain"
                                        src={image}
                                        alt=""
                                    />
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* <CarouselPrevious className="hidden lg:flex" />
                <CarouselNext className="hidden lg:flex" /> */}
                <div className="absolute flex items-center justify-center gap-2 bottom-4 left-1/2 -translate-x-1/2">
                    {carouselItem.length > 1 &&
                        Array.from({ length: count }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => api?.scrollTo(index)}
                                className={cn(
                                    "h-3.5 w-3.5 rounded-full border-2 cursor-pointer",
                                    {
                                        "border-white": current === index + 1,
                                        "bg-red-600": current == index + 1,
                                    }
                                )}
                            />
                        ))}
                </div>
            </Carousel>
        </div>
    );
}
