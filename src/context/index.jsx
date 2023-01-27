import React, {createContext, useContext} from 'react';
import { Network, Alchemy } from "alchemy-sdk";
import {useAddress, useContract, useContractWrite, useDisconnect, useMetamask, useUser} from '@thirdweb-dev/react';
import {ethers} from 'ethers';
import {NATIVE_TOKEN_ADDRESS} from "@thirdweb-dev/sdk";

const StateContext = createContext();
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const alchemyApiKey = process.env.REACT_APP_ALCHEMY_API_KEY;

export const StateContextProvider = ({children}) => {
    const {contract} = useContract(contractAddress, "marketplace")

    const alchemySettings = {
        apiKey: alchemyApiKey, // Replace with your Alchemy API Key.
        network: Network.ETH_GOERLI, // Replace with your network.
    };

    const alchemy = new Alchemy(alchemySettings);

    const address = useAddress();

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                alchemy
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);