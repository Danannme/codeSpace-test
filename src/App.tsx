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

// types
import type { FormEvent } from "react";

// react router
import { Outlet, Link, useLocation } from "react-router";

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
    userLink: [
        {
            title: "Wishlist",
            url: "/wishlist",
            icon: <Heart />,
        },
        {
            title: "Cart",
            url: "/cart",
            icon: <ShoppingCart />,
        },
        {
            title: "User",
            url: "/user",
            icon: <User />,
        },
    ],
};

function App() {
    const location = useLocation();
    const breadcrumbPathname = location.pathname.split("/").filter(Boolean);

    function handleSearch(e: FormEvent) {
        e.preventDefault();
    }

    return (
        <>
            {/* Navigation bar */}
            <SidebarProvider>
                <AppSidebar
                    className="md:hidden"
                    pageLink={navbarLink.pageLink}
                />
                <SidebarInset>
                    <header className="flex w-full justify-between items-center px-4 md:px-30 py-4 md:py-6 border-b-2">
                        {/* logo */}
                        <Link to={{ pathname: "/" }} className="cursor-pointer">
                            <h1 className="hidden md:block text-2xl ">
                                Elmora
                            </h1>
                        </Link>
                        {/* another page link */}
                        <div className="hidden lg:flex gap-10">
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
                                />
                                <Button
                                    variant={"outline"}
                                    className="bg-transparent border-none shadow-none cursor-pointer"
                                >
                                    <Search color="black" />
                                </Button>
                            </form>
                            {/* wishlist & cart link & user*/}
                            {navbarLink.userLink.map((page) => (
                                <Link
                                    to={{ pathname: page.url }}
                                    key={page.title}
                                    className="cursor-pointer"
                                >
                                    {page.icon}
                                </Link>
                            ))}
                        </div>
                    </header>
                    <div className="flex flex-col p-6">
                        {/* breadcrumb / url path */}
                        {breadcrumbPathname.length == 0 ? (
                            <></>
                        ) : (
                            <Breadcrumb>
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
                                                <BreadcrumbItem className="hidden md:block">
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
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}

export default App;
