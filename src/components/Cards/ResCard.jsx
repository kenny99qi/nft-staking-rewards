import React, {useState} from 'react';
import {ThirdwebNftMedia} from "@thirdweb-dev/react";
import Image from "next/image";

const ResCard = ({data, setRes}) => {
    const [metadata, setMetadata] = useState(data[0]?.data().then(r => setMetadata(r?.metadata)));



    return (
        <div className={`
            flex flex-col items-center justify-center
            my-5 p-5 bg-gray-100 rounded-lg shadow-lg
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            w-1/2
        `}>

                <h1 className={`
                    text-center mb-2 text-3xl font-bold text-gray-900
                `}>
                    Congratulations!
                </h1>
                <h3 className={`
                    text-center mb-2 text-2xl font-bold text-gray-900
                `}>
                    {metadata?.name}&nbsp;
                    #{metadata?.id}
                </h3>
                <h3 className={`
                    text-center mb-2 text-2xl font-bold text-gray-900
                `}>Transaction Hash</h3>
                <a href={`
                    https://goerli.etherscan.io/tx/${data[0]?.receipt?.transactionHash}
                `} className={`
                    text-center mb-2 text-lg text-gray-900 font-bold
                    hover:text-blue-500 hover:underline cursor-pointer
                `}>
                    {data[0]?.receipt?.transactionHash.split('').slice(0, 10).join('')}...
                    {data[0]?.receipt?.transactionHash.split('').slice(-10).join('')}
                </a>

            <Image src={metadata?.image} alt="" className={`w-64 h-64 rounded-lg mb-5 shadow-xl`}/>
            <button className={`
                bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
            `} onClick={
                () => setRes(null)
            }>
                Close
            </button>
        </div>
    );
};

export default ResCard;
