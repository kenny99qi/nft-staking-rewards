import React, {useEffect, useState} from 'react';
import {ThirdwebNftMedia, useContract, useNFT, Web3Button} from "@thirdweb-dev/react";
import {useStateContext} from "@/context";

const RewardCard = ({nftRewardContractAddress}) => {
    const { contract } = useContract(nftRewardContractAddress, "nft-drop");
    const { data: nft } = useNFT(contract, 0);
    const {address} = useStateContext()
    const [res, setRes] = useState(null);
    const [loading, setLoading] = useState(false);
    const [supply, setSupply] = useState(null);

    useEffect(() => {
        const getInfo = async () => {
            const supply = await contract?.totalUnclaimedSupply();
            setSupply(parseInt(supply._hex, 16))
        }
        getInfo().then()
    }, []);

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
                                text-center mb-2 text-2xl font-bold text-gray-900
                                `}>{nft?.metadata.name}</h3>
            <p>
                {
                    supply && supply > 0 ? (
                        <span className={`
                            text-center mb-2 text-lg text-gray-900 font-bold
                        `}>
                            {supply} NFTs left
                        </span>
                    ) : (
                        <span className={`
                            text-center mb-2 text-lg text-gray-900 font-bold
                        `}>
                            No NFTs left
                        </span>)
                }
            </p>
            <p className={`
                text-center mb-2 text-lg text-gray-900 font-bold
            `}>
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
