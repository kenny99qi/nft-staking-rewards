import React from 'react';
import {ConnectWallet, useAddress, useTokenBalance} from "@thirdweb-dev/react";
import {ethers} from "ethers";

const redeem = () => {
    const address = useAddress();
    const { data: tokenBalance } = useTokenBalance(tokenContract, address);

    return (
        <div className={`
        bg-white flex flex-col items-center justify-center min-h-screen
        py-20 px-4 sm:px-6 lg:px-8 font-sans text-gray-900 text-sm
        `}>
            <h1 className={`
            text-3xl font-bold
            `}>
                Redeem Your Rewards with your Tokens
            </h1>
            <hr className={`
            w-1/2 my-4
            `} />
            {!address ? (
                <ConnectWallet />
            ) : (
                <>
                <h2 className={`
                    text-2xl font-bold text-gray-900
                    `}>Your Tokens</h2>
                <div className={`
                    flex flex-col sm:flex-row justify-between
                    w-9/12
                    `}>
                    <div className={`
                        flex flex-col items-center justify-center
                        `}>
                        <h3 className={`
                            text-center mb-2 text-lg font-bold text-gray-900
                            `}>Current Balance</h3>
                        <p className={``}>
                            <b>{tokenBalance?.displayValue}</b> {tokenBalance?.symbol}
                        </p>
                    </div>
                </div>
                </>)}
        </div>
    );
};

export default redeem;
