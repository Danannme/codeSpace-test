import { useEffect, useState } from "react";

// components
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "./components/ui/badge";
import { Footer2 } from "./components/footer2";

// toast
import { Toaster } from "sonner";

// types
import type { FormEvent } from "react";
import type { LoaderData } from "./types/types";

// react router
import { Outlet, Link, useLocation, useLoaderData } from "react-router";

// icons
import { Search, Heart, ShoppingCart, User } from "lucide-react";

// navbar link
const navbarLink = {
    pageLink: [
        {
            title: "Home",
            url: "/",
        },
        {
            title: "Contact",
            url: "/contact",
        },
        {
            title: "About",
            url: "/about",
        },
        {
            title: "Sign Up",
            url: "",
        },
    ],
};

// scroll to top after change page
export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    // get url location / path
    const location = useLocation();
    const breadcrumbPathname = location.pathname.split("/").filter(Boolean);
    const [searchInput, setSearchInput] = useState("");

    const data = useLoaderData() as LoaderData;

    function handleSearch(e: FormEvent) {
        e.preventDefault();
    }

    return (
        <>
            <ScrollToTop />
            <Toaster richColors position="top-center" />
            {/* Navigation bar */}
            <SidebarProvider>
                <AppSidebar
                    className="md:hidden"
                    pageLink={navbarLink.pageLink}
                />
                <SidebarInset>
                    <header className="sticky top-0 bg-white flex w-full justify-between items-center px-4 md:px-25 py-4 md:py-6 border-b-2 z-20">
                        {/* logo */}
                        <Link
                            to={{ pathname: "/" }}
                            className="hidden lg:block cursor-pointer"
                        >
                            <h1 className=" text-2xl ">Elmora</h1>
                        </Link>
                        {/* another page link */}
                        <div className="hidden md:flex gap-10">
                            {navbarLink.pageLink.map((page) => (
                                <Link
                                    to={{ pathname: page.url }}
                                    key={page.title}
                                    className="cursor-pointer"
                                >
                                    <span>{page.title}</span>
                                </Link>
                            ))}
                        </div>
                        <div className="flex w-full md:w-fit items-center gap-4 md:gap-6">
                            <SidebarTrigger className="md:hidden" />
                            {/* search item */}
                            <form
                                onSubmit={handleSearch}
                                className="flex w-full bg-[#F5F5F5] gap-1 rounded"
                            >
                                <Input
                                    type="text"
                                    className="border-none shadow-none "
                                    placeholder="e.g. Bag"
                                    value={searchInput}
                                    onChange={(e) =>
                                        setSearchInput(e.target.value)
                                    }
                                />
                                <Link
                                    to={{
                                        pathname: "/search",
                                        search: `?q=${searchInput}`,
                                    }}
                                >
                                    <Button
                                        variant={"outline"}
                                        className="bg-transparent border-none shadow-none cursor-pointer"
                                    >
                                        <Search color="black" />
                                    </Button>
                                </Link>
                            </form>
                            {/* wishlist */}
                            <Link
                                to={{ pathname: "/wishlist" }}
                                className="relative cursor-pointer"
                            >
                                <Heart />
                                <Badge className="absolute bg-[#007AFF] text-xs px-1 -top-2 -right-2 ">
                                    {data.wishlist.length ?? "0"}
                                </Badge>
                            </Link>
                            {/* shopping cart */}
                            <Link
                                to={{ pathname: "/cart" }}
                                className="relative cursor-pointer"
                            >
                                <ShoppingCart />
                                <Badge className="absolute bg-[#007AFF] text-xs px-1 -top-2 -right-2 ">
                                    {data?.cart?.length ?? "0"}
                                </Badge>
                            </Link>
                            {/* profile */}
                            <Link
                                to={{ pathname: "/profile" }}
                                className="relative cursor-pointer"
                            >
                                <User />
                            </Link>
                        </div>
                    </header>
                    <div className="flex flex-col">
                        {/* breadcrumb / url path */}
                        {breadcrumbPathname.length == 0 ? (
                            <></>
                        ) : (
                            <Breadcrumb className="px-10 md:px-20 py-6 md:py-12">
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/">
                                            Home
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    {breadcrumbPathname.map((path, index) => {
                                        const pathTo = `/${breadcrumbPathname
                                            .slice(0, index + 1)
                                            .join("/")}`;

                                        return (
                                            <>
                                                /
                                                <BreadcrumbItem className="">
                                                    <BreadcrumbLink
                                                        href={pathTo}
                                                    >
                                                        {path}
                                                    </BreadcrumbLink>
                                                </BreadcrumbItem>
                                            </>
                                        );
                                    })}
                                </BreadcrumbList>
                            </Breadcrumb>
                        )}

                        {/* component from react-router */}
                        <Outlet />

                        {/* footer */}
                        <Footer2 />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}

export default App;
