import React from 'react';
import {ConnectWallet, useAddress, useTokenBalance} from "@thirdweb-dev/react";
import {ethers} from "ethers";
import {useStateContext} from "@/context";
import {nftRewardContractAddress} from "@/consts/contractAddresses";
import RewardCard from "@/components/Cards/RewardCard";

const redeem = () => {
    const { contract, isLoading, address, nftDropContract,
        tokenContract, ownedNfts, tokenBalance, stakedTokens, } = useStateContext()

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
                    `}>Current Balance</h2>
                <div className={`
                    flex flex-col sm:flex-row justify-center
                    w-9/12
                    `}>
                        <p className={`
                        text-2xl font-bold text-gray-900 mr-2
                        `}>
                            {
                                isLoading ? "Loading..." : <b>{tokenBalance?.displayValue}</b>
                            }&nbsp;
                            {tokenBalance?.symbol}
                        </p>
                </div>
                </>)}
            <hr className={`
            w-1/2 my-4
            `} />
            <h1 className={`
            text-3xl font-bold
            `}>
                Rewards Available
            </h1>
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4
            `}>
                {
                    nftRewardContractAddress.map((address, index) =>
                        <RewardCard nftRewardContractAddress={address} key={index} />
                    )
                }
            </div>
        </div>
    );
};

export default redeem;
