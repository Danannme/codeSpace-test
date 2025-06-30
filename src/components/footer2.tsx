// components
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// icons
import { SendHorizonal } from "lucide-react";
import { RiFacebookLine } from "react-icons/ri";
import { CiTwitter } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { RiLinkedinLine } from "react-icons/ri";

interface MenuItem {
    title: string;
    links: {
        text: string;
        url: string;
    }[];
}

interface Footer2Props {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
    tagline?: string;
    menuItems?: MenuItem[];
    copyright?: string;
    bottomLinks?: {
        text: string;
        url: string;
    }[];
}

const Footer2 = ({
    logo = {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
        alt: "blocks for shadcn/ui",
        title: "Elmora",
        url: "https://www.shadcnblocks.com",
    },
    menuItems = [
        {
            title: "Support",
            links: [
                { text: "MyStreet, Kingston, New York 12401", url: "#" },
                { text: "elmora@gmail.com", url: "#" },
                { text: "(555) 555-1234", url: "#" },
            ],
        },
        {
            title: "Account",
            links: [
                { text: "My Account", url: "#" },
                { text: "Login / Register", url: "#" },
                { text: "Cart", url: "#" },
                { text: "Wishlist", url: "#" },
                { text: "Shop", url: "#" },
            ],
        },
        {
            title: "Quick Link",
            links: [
                { text: "Privacy Policy", url: "#" },
                { text: "Term Of Use", url: "#" },
                { text: "FAQ", url: "#" },
                { text: "Contact", url: "#" },
            ],
        },
    ],
    copyright = "© Copyright Elmora 2025. All right reserved",
}: Footer2Props) => {
    return (
        <section className=" pt-16 mt-20 md:mt-30 flex flex-col items-center bg-black text-white">
            <div className="">
                <footer>
                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-6 px-10 lg:px-30">
                        <div className="col-span-2 mb-8 lg:mb-0">
                            <div className="flex items-center gap-2 lg:justify-start">
                                <p className="text-xl font-semibold">
                                    {logo.title}
                                </p>
                            </div>
                            <p className="mt-4 font-bold text-md">Subscribe</p>
                            <p className="mt-4 font-semibold text-md">
                                Get 10% off your first order
                            </p>
                            <div className="mt-4 flex w-fit bg-black border-2 border-white gap-1 rounded">
                                <Input
                                    type="text"
                                    className="border-none shadow-none text-white focus-visible:ring-0"
                                    placeholder="Enter your email"
                                />
                                <Button
                                    variant={"outline"}
                                    className="group bg-transparent border-none shadow-none cursor-pointer"
                                >
                                    <SendHorizonal className="text-white group-hover:text-black" />
                                </Button>
                            </div>
                        </div>
                        {menuItems.map((section, sectionIdx) => (
                            <div key={sectionIdx}>
                                <h3 className="mb-4 font-bold">
                                    {section.title}
                                </h3>
                                <ul className="space-y-4 text-muted-foreground">
                                    {section.links.map((link, linkIdx) => (
                                        <li
                                            key={linkIdx}
                                            className="font-medium hover:text-white"
                                        >
                                            <a href={link.url}>{link.text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <div>
                            <h3 className="mb-4 font-bold">Download App</h3>
                            <div className="grid gap-2">
                                <p className="text-xs text-neutral-500">
                                    Save $3 with App New User Only
                                </p>
                                <div>
                                    <img
                                        src="/img/qrcode.webp"
                                        className="w-30 mb-4"
                                        alt=""
                                    />
                                    <ul className="flex gap-6 items-center">
                                        <li>
                                            <RiFacebookLine size={20} />
                                        </li>
                                        <li>
                                            <CiTwitter size={20} />
                                        </li>
                                        <li>
                                            <FaInstagram size={18} />
                                        </li>
                                        <li>
                                            <RiLinkedinLine size={20} />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-24 flex flex-col justify-center gap-4 py-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
                        <p>{copyright}</p>
                    </div>
                </footer>
            </div>
        </section>
    );
};

export { Footer2 };
