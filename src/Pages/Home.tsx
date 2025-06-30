// components
import { Separator } from "../components/ui/separator";
import CarouselWithPagination from "../components/customized/carousel/carousel-06";
import ProductList from "@/components/ProductList";
import { Button } from "@/components/ui/button";

// react-router
import { useRouteLoaderData } from "react-router";

// icons
import {
    ChevronRight,
    Smartphone,
    Monitor,
    Watch,
    Camera,
    Headphones,
    Gamepad,
    Truck,
    Headset,
    ShieldCheck,
} from "lucide-react";

// types
import type { LoaderData } from "@/types/types";

// carousel images
const carouselImages = [
    "/img/1.webp",
    "/img/2.webp",
    "/img/3.webp",
    "/img/4.webp",
    "/img/5.webp",
];

// timer
const timer = [
    {
        label: "Days",
        value: 3,
    },
    {
        label: "Hours",
        value: 23,
    },
    {
        label: "Minutes",
        value: 19,
    },
    {
        label: "Seconds",
        value: 56,
    },
];

// categories
const categories = [
    {
        name: "Phones",
        icon: <Smartphone className="w-5 h-5" />,
    },
    {
        name: "Computers",
        icon: <Monitor className="w-5 h-5" />,
    },
    {
        name: "Smart Watches",
        icon: <Watch className="w-5 h-5" />,
    },
    {
        name: "Camera",
        icon: <Camera className="w-5 h-5" />,
    },
    {
        name: "Headphones",
        icon: <Headphones className="w-5 h-5" />,
    },
    {
        name: "Gaming",
        icon: <Gamepad className="w-5 h-5" />,
    },
    {
        name: "Gaming",
        icon: <Gamepad className="w-5 h-5" />,
    },
    {
        name: "Gaming",
        icon: <Gamepad className="w-5 h-5" />,
    },
    {
        name: "Gaming",
        icon: <Gamepad className="w-5 h-5" />,
    },
    {
        name: "Gaming",
        icon: <Gamepad className="w-5 h-5" />,
    },
];

export default function Home() {
    const data = useRouteLoaderData("root") as LoaderData;

    return (
        <>
            {/* banner section */}
            <div className="flex w-full justify-center gap-20">
                {/* category list */}
                <ul className="hidden space-y-2 lg:block mt-8">
                    <li className="flex justify-between gap-5">
                        Woman's Fashion <ChevronRight />
                    </li>
                    <li className="flex justify-between">
                        Men's Fashion <ChevronRight />
                    </li>
                    <li>Electronics</li>
                    <li>Home & Lifestyle</li>
                    <li>Medicine</li>
                    <li>Sports & Outdoor</li>
                    <li>Baby's & Toys</li>
                    <li>Groceries & Pets</li>
                    <li>Health & Beauty</li>
                </ul>
                <Separator
                    orientation="vertical"
                    className="hidden md:block border-1 "
                />
                {/* banner */}
                <div className="w-[90%] lg:w-180 mt-8">
                    <CarouselWithPagination carouselItem={carouselImages} />
                </div>
            </div>

            {/* flash sale */}
            <div className="flex flex-col items-center">
                <ProductList
                    label="Today's"
                    productVariant="flashSale"
                    listVariant="carousel"
                    productList={data.products.products}
                >
                    {/* header section */}
                    <div className="w-full flex flex-col md:flex-row md:items-center font-bold gap-4 md:gap-25">
                        <h1 className="text-2xl md:text-4xl">Flash Sales</h1>
                        {/* timer */}
                        <div className="flex gap-4">
                            {timer.map((item, index) => (
                                <div className="flex items-center relative">
                                    <span className="text-xs absolute -top-3">
                                        {item.label}
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-semibold">
                                        {item.value}
                                    </h2>
                                    {index < timer.length - 1 && (
                                        <span className="ml-4 text-2xl font-semibold">
                                            :
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </ProductList>
                <Button className="rounded bg-[#007AFF] hover:bg-blue-600 px-8 py-6 cursor-pointer mt-4">
                    View All Products
                </Button>
            </div>

            {/* categories */}
            <ProductList
                label="Categories"
                listVariant="carousel"
                productVariant="category"
                productList={categories}
            />

            {/* best selling product */}
            <ProductList
                label="Best Selling Products"
                productVariant="default"
                listVariant="notCarousel"
                productList={data.products.products}
            />

            {/* banner */}
            <div className="w-[90%] md:w-[80%] mx-auto mt-14">
                <CarouselWithPagination carouselItem={["/img/6.webp"]} />
            </div>

            {/* our products */}
            <div className="flex flex-col items-center ">
                <ProductList
                    label="Our Products"
                    productVariant="default"
                    listVariant="carousel"
                    productList={data.products.products}
                    listRow={2}
                >
                    {/* header section */}
                    <div className="w-full flex flex-col md:flex-row md:items-center font-bold gap-4 md:gap-25">
                        <h1 className="text-2xl md:text-4xl">
                            Explore Our Products
                        </h1>
                    </div>
                </ProductList>
                <Button className="rounded bg-[#007AFF] hover:bg-blue-600 px-8 py-6 cursor-pointer mt-4">
                    View All Products
                </Button>
            </div>

            {/* new arrival */}
            <div className="flex flex-col gap-4 w-[95%] md:w-[90%] mx-auto mt-10 md:mt-30">
                <div className="flex gap-2 text-[#007AFF] items-center">
                    <div className="bg-[#007AFF] w-5 h-8 rounded"></div>
                    <p>Featured</p>
                </div>
                <div className="w-full flex flex-col md:flex-row md:items-center font-bold gap-4 md:gap-25">
                    <h1 className="text-2xl md:text-4xl">New Arrival</h1>
                </div>
                <div className="grid grid-cols-4 grid-rows-2 gap-1 md:gap-4">
                    <div className="relative col-span-2 row-span-2">
                        <img
                            src="/img/7.webp"
                            className="w-full h-full"
                            alt=""
                        />
                        <div className="absolute bottom-5 left-5 text-white">
                            <span className="text-sm md:text-xl font-bold">
                                Playstation 5
                            </span>
                        </div>
                    </div>
                    <div className="col-span-2 relative">
                        <img
                            src="/img/8.webp"
                            className="w-full h-full"
                            alt=""
                        />
                        <div className="absolute bottom-5 left-5 text-white">
                            <span className="text-sm md:text-xl font-bold ">
                                Women's Collection
                            </span>
                        </div>
                    </div>
                    <div className=" relative">
                        <img
                            src="/img/9.webp"
                            className="w-full h-full"
                            alt=""
                        />
                        <div className="absolute bottom-5 left-5 text-white">
                            <span className="text-sm md:text-xl font-bold ">
                                Speaker
                            </span>
                        </div>
                    </div>
                    <div className=" relative">
                        <img
                            src="/img/10.webp"
                            className="w-full h-full"
                            alt=""
                        />
                        <div className="absolute bottom-5 left-5 text-white">
                            <span className="text-sm md:text-xl font-bold ">
                                Parfume
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* circle */}
            <div className="flex flex-col lg:flex-row w-[90%] items-center justify-center mx-auto mt-20 md:mt-30 gap-15 lg:gap-20">
                <div className="flex flex-col items-center">
                    <div className="bg-black p-2 w-fit rounded-full ring-[10px] ring-ring/70">
                        <Truck color="white" size={30} />
                    </div>
                    <h3 className="text-lg font-bold mt-6">
                        FREE AND FAST DELIVERY
                    </h3>
                    <p>Free delivery for all orders over $140</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-black p-2 w-fit rounded-full ring-[10px] ring-ring/70">
                        <Headset color="white" size={30} />
                    </div>
                    <h3 className="text-lg font-bold mt-6">
                        24/7 CUSTOMER SERVICE
                    </h3>
                    <p>Friendly 24/7 customer support</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-black p-2 w-fit rounded-full ring-[10px] ring-ring/70">
                        <ShieldCheck color="white" size={30} />
                    </div>
                    <h3 className="text-lg font-bold mt-6">
                        MONEY BACK GUARANTEE
                    </h3>
                    <p>We return money with 30 days</p>
                </div>
            </div>
        </>
    );
}
