import React, {useState} from 'react';
import {ThirdwebNftMedia, useContract, useNFT, Web3Button} from "@thirdweb-dev/react";
import {nftDropContractAddress} from "@/consts/contractAddresses";
import {useStateContext} from "@/context";
import {ethers} from "ethers";

const RewardCard = ({nftRewardContractAddress}) => {
    const { contract } = useContract(nftRewardContractAddress, "nft-drop");
    const { data: nft } = useNFT(contract, 0);
    const {address} = useStateContext()
    const [res, setRes] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleClaim = async () => {
        setLoading(true);
        try {
            const tx = await contract.claimTo(address, 1);
            setRes(tx)
            console.log(tx[0]?.receipt?.transactionHash)
            console.log(parseInt(tx[0]?.id._hex, 16))
            setLoading(false);
        } catch (e) {
            console.log(e)
            setLoading(false);
        }
    }

    return (
        <div className={`
            flex flex-col items-center justify-center
            my-5 p-3
        `}>
            {nft?.metadata && (
                <ThirdwebNftMedia
                    metadata={nft.metadata}
                    className={`
                        w-64 h-64
                    `}
                />
            )}
            <h3 className={`
                                text-center mb-2 text-lg font-bold text-gray-900
                                `}>{nft?.metadata.name}</h3>
            <p>
                Price: {nft?.metadata.price}
            </p>
            <button
                className={`
                    bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                `}
                onClick={handleClaim}
            >
                {loading ? 'Loading...' : 'Claim'}
            </button>
        </div>
    );
};

export default RewardCard;
