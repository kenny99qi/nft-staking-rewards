import {
    ConnectWallet,
    ThirdwebNftMedia,
    useAddress,
    useContract,
    useContractRead,
    useOwnedNFTs,
    useTokenBalance,
    Web3Button,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import NFTCard from "../components/Cards/NFTCard";
import {
    nftDropContractAddress,
    stakingContractAddress,
    tokenContractAddress,
} from "@/consts/contractAddresses";
import Loader from "@/components/Loader/Loader";
import {useStateContext} from "@/context";

const Stake = () => {
    const { contract, isLoading, address, nftDropContract,
        tokenContract, ownedNfts, tokenBalance, stakedTokens, } = useStateContext()
    const [claimableRewards, setClaimableRewards] = useState();

    async function loadClaimableRewards() {
        const stakeInfo = await contract?.call("getStakeInfo", address);
        setClaimableRewards(stakeInfo[1]);
    }

    useEffect(() => {
        if (!contract || !address) return;

        setInterval(() => {
            loadClaimableRewards().then();
        }, 10000);

    }, [address, contract]);

    async function stakeNft(id) {
        if (!address) return;

        const isApproved = await nftDropContract?.isApproved(
            address,
            stakingContractAddress
        );
        if (!isApproved) {
            await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
        }
        await contract?.call("stake", [id]);
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className={`
        bg-white flex flex-col items-center justify-center min-h-screen
        py-20 px-4 sm:px-6 lg:px-8 font-sans text-gray-900 text-sm
        `}>
            <h1 className={`
            text-3xl font-bold
            `}>Stake Your NFTs</h1>
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
                            `}>Claimable Rewards</h3>
                            <p className={``}>
                                <b className={`
                                    ${claimableRewards && claimableRewards.gt(0) ? "text-green-500" : "text-gray-900"}
                                `}>
                                    {!claimableRewards
                                        ? "Loading..."
                                        : ethers.utils.formatUnits(claimableRewards, 18)}
                                </b>{" "}
                                {tokenBalance?.symbol}
                            </p>
                        </div>
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

                    <Web3Button
                        action={(contract) => contract.call("claimRewards")}
                        contractAddress={stakingContractAddress}
                    >
                        Claim Rewards
                    </Web3Button>

                    <hr className={`
                    w-1/2 my-4
                    `} />
                    <h2 className={`
                    text-2xl font-bold text-gray-900
                    `}>Your Staked NFTs</h2>
                    <div className={`
                    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4
                    w-full max-w-7xl mx-auto
                    `}>
                        {stakedTokens &&
                            stakedTokens[0]?.map((stakedToken) => (
                                <NFTCard
                                    tokenId={stakedToken.toNumber()}
                                    key={stakedToken.toString()}
                                />
                            ))
                        }
                    </div>
                    {
                        stakedTokens && stakedTokens[0]?.length === 0 && (
                            <div className={`
                                text-center text-lg text-gray-900 w-full
                                my-4
                                `}>
                                You have no staked NFTs yet.
                                <br/>
                                Stake your NFTs to earn rewards.
                            </div>
                        )
                    }

                    <hr className={`
                    w-1/2 my-4
                    `} />
                    <h2 className={`
                    text-2xl font-bold text-gray-900
                    `}>Your Unstaked NFTs</h2>
                    <h3 className={`
                    text-center mb-2 text-lg font-bold text-gray-900
                    `}>
                        {ownedNfts?.length} NFTs found
                    </h3>
                    <p className={`
                    text-center mb-2 text-lg text-gray-900 italic
                    `}>
                        There will be 2 transactions to confirm if you are staking for the first time.
                    </p>
                    <div className={`
                    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4
                    w-full max-w-7xl mx-auto
                    `}>
                        {ownedNfts?.map((nft) => (
                            <div className={`
                                flex flex-col items-center justify-center
                            `} key={nft.metadata.id.toString()}>
                                <ThirdwebNftMedia
                                    metadata={nft.metadata}
                                    className={``}
                                />
                                <h3 className={`
                                text-center mb-2 text-lg font-bold text-gray-900
                                `}>{nft.metadata.name}</h3>
                                <Web3Button
                                    contractAddress={stakingContractAddress}
                                    action={() => stakeNft(nft.metadata.id)}
                                >
                                    Stake
                                </Web3Button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Stake;