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
import styles from "../styles/Home.module.css";

const Stake = () => {
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
    const [claimableRewards, setClaimableRewards] = useState();
    const { data: stakedTokens } = useContractRead(
        contract,
        "getStakeInfo",
        address
    );

    useEffect(() => {
        if (!contract || !address) return;

        async function loadClaimableRewards() {
            const stakeInfo = await contract?.call("getStakeInfo", address);
            setClaimableRewards(stakeInfo[1]);
        }

        loadClaimableRewards().then();
    }, [address, contract]);

    async function stakeNft() {
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
        return <div>Loading</div>;
    }

    return (
        <div className={`
        bg-white flex flex-col items-center justify-center min-h-screen
        py-2 px-4 sm:px-6 lg:px-8 font-sans text-gray-900 text-sm
        
        `}>
            <h1 className={``}>Stake Your NFTs</h1>
            <hr className={``} />

            {!address ? (
                <ConnectWallet />
            ) : (
                <>
                    <h2>Your Tokens</h2>
                    <div className={``}>
                        <div className={``}>
                            <h3 className={``}>Claimable Rewards</h3>
                            <p className={``}>
                                <b>
                                    {!claimableRewards
                                        ? "Loading..."
                                        : ethers.utils.formatUnits(claimableRewards, 18)}
                                </b>{" "}
                                {tokenBalance?.symbol}
                            </p>
                        </div>
                        <div className={``}>
                            <h3 className={``}>Current Balance</h3>
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

                    <hr className={``} />
                    <h2>Your Staked NFTs</h2>
                    <div className={``}>
                        {stakedTokens &&
                            stakedTokens[0]?.map((stakedToken) => (
                                <NFTCard
                                    tokenId={stakedToken.toNumber()}
                                    key={stakedToken.toString()}
                                />
                            ))}
                    </div>

                    <hr className={``} />
                    <h2>Your Unstaked NFTs</h2>
                    <div className={``}>
                        {ownedNfts?.map((nft) => (
                            <div className={``} key={nft.metadata.id.toString()}>
                                <ThirdwebNftMedia
                                    metadata={nft.metadata}
                                    className={``}
                                />
                                <h3>{nft.metadata.name}</h3>
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