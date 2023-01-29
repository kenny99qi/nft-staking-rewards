import React, {createContext, useContext, useState} from 'react';
import { Network, Alchemy } from "alchemy-sdk";
import {
    useAddress,
    useContract, useContractRead,
    useContractWrite,
    useDisconnect,
    useMetamask,
    useOwnedNFTs, useTokenBalance,
    useUser
} from '@thirdweb-dev/react';
import {ethers} from 'ethers';
import {NATIVE_TOKEN_ADDRESS} from "@thirdweb-dev/sdk";
import {nftDropContractAddress, stakingContractAddress, tokenContractAddress} from "@/consts/contractAddresses";

const StateContext = createContext();
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const alchemyApiKey = process.env.REACT_APP_ALCHEMY_API_KEY;

export const StateContextProvider = ({children}) => {
    const alchemySettings = {
        apiKey: alchemyApiKey, // Replace with your Alchemy API Key.
        network: Network.ETH_GOERLI, // Replace with your network.
    };

    const alchemy = new Alchemy(alchemySettings);

    const address = useAddress();
    const { contract: nftDropContract } = useContract(
        nftDropContractAddress,
        "nft-drop"
    );
    const { contract: tokenContract } = useContract(
        tokenContractAddress,
        "token"
    );
    const { contract, isLoading } = useContract(stakingContractAddress);
    const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);
    const { data: tokenBalance } = useTokenBalance(tokenContract, address);
    const { data: stakedTokens } = useContractRead(
        contract,
        "getStakeInfo",
        address
    );

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                alchemy,
                nftDropContract,
                tokenContract,
                ownedNfts,
                tokenBalance,
                stakedTokens,
                isLoading
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);