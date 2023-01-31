import React from 'react';
import {ConnectWallet} from "@thirdweb-dev/react";
import {useRouter} from "next/router";
import Link from "next/link";

const Navbar = () => {
    const currentRouter = useRouter().pathname;

    const links = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Staking",
            path: "/staking",
        },
        {
            name: "Redeem",
            path: "/redeem",
        },
        {
            name: "FAQ",
            path: "/faq",
        }
    ]

    return (
        <div className={`
        bg-white flex flex-row items-center justify-between
        py-4 px-4 sm:px-6 lg:px-8 font-sans text-gray-900 text-sm
        `}>
            <div className={`
            text-2xl font-bold text-gray-900 mr-2 cursor-pointer hover:text-gray-700
            `}>
                LOGO
            </div>
                <div className={`
                flex flex-row items-center justify-between
                w-1/2
                `}>
                    {
                        links.map((link, index) =>
                            <Link
                                href={`${link.path}`}
                                key={index}
                                className={`
                                    text-2xl font-bold mr-2 cursor-pointer hover:text-gray-700
                                    transition-all duration-300 ease-in-out 
                                    ${currentRouter === link.path ? "text-gray-700" : "text-gray-300 "}
                            `}>
                                {link.name}
                            </Link>)
                    }
                </div>
            <ConnectWallet />
        </div>
    );
};

export default Navbar;
