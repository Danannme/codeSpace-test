// icons
import { CircleDollarSign, Truck, Headset, ShieldCheck } from "lucide-react";
import { CiTwitter, CiInstagram } from "react-icons/ci";
import { RiLinkedinLine } from "react-icons/ri";

// block
const block = [
    {
        value: "10.5k",
        text: "Lorem ipsum dolor sit amet consectetur",
    },
    {
        value: "33k",
        text: "Lorem ipsum dolor sit amet consectetur",
    },
    {
        value: "45.5k",
        text: "Lorem ipsum dolor sit amet consectetur",
    },
    {
        value: "25k",
        text: "Lorem ipsum dolor sit amet consectetur",
    },
];

// profile
const profiles = [
    {
        name: "Tom Cruise",
        title: "Actor",
        img: "/img/about/2.webp",
    },
    {
        name: "Emma Watason",
        title: "Actor",
        img: "/img/about/3.webp",
    },
    {
        name: "Will Smith",
        title: "Actor",
        img: "/img/about/4.webp",
    },
];

export default function AboutPage() {
    return (
        <>
            <div className="md:w-[90%] bg-[url(/img/about/1.webp)] md:bg-none mx-auto flex gap-6 w-full items-center text-white md:text-black">
                <div className="flex flex-col gap-6 backdrop-blur-md backdrop-brightness-50 md:backdrop-blur-none  md:backdrop-brightness-100 md:bg-none bg-cover flex-1 p-8 md:p-0">
                    <h1 className="text-3xl font-bold">Our Story</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Harum voluptates voluptate eum velit eos eius, vero
                        magnam ea, aut odio earum facilis quia laudantium atque,
                        sed enim debitis tempora illo?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Asperiores recusandae itaque fugiat minus. Sequi
                        qui ab, quam nulla corrupti omnis ipsum. Expedita
                        quisquam aliquam ratione tempore, facere hic delectus
                        laboriosam?
                    </p>
                </div>
                <img
                    src="/img/about/1.webp"
                    className="w-full hidden md:block flex-1"
                    alt=""
                />
            </div>

            {/* block */}
            <div className="w-[90%] mx-auto gap-6 flex justify-center flex-wrap mt-10 md:mt-30 ">
                {block.map((item) => (
                    <div className="group flex justify-center items-center gap-2 flex-col px-6 w-55 aspect-square bg-white hover:bg-[#007AFF] border-2 rounded cursor-pointer">
                        <i className=" bg-black group-hover:bg-white rounded-full p-2 ring-ring/50 ring-7">
                            <CircleDollarSign
                                size={35}
                                className="text-white group-hover:text-black"
                            />
                        </i>
                        <span className="text-2xl font-bold group-hover:text-white mt-4">
                            {item.value}
                        </span>
                        <p className="text-black group-hover:text-white">
                            {item.text}
                        </p>
                    </div>
                ))}
            </div>

            {/* profile */}
            <div className=" w-[90%] mt-20 md:mt-30 mx-auto flex flex-wrap justify-center gap-8">
                {profiles.map((profile) => (
                    <div className="w-full max-w-[20rem] space-y-2">
                        <img
                            className="w-full aspect-[3/4] object-cover object-center shadow-lg rounded"
                            src={profile.img}
                            alt=""
                        />
                        <div>
                            <h3 className="text-2xl">{profile.name}</h3>
                            <span>{profile.title}</span>
                        </div>
                        <div>
                            <ul className="flex gap-6 items-center">
                                <li>
                                    <CiTwitter size={25} />
                                </li>
                                <li>
                                    <CiInstagram size={25} />
                                </li>
                                <li>
                                    <RiLinkedinLine size={25} />
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
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
