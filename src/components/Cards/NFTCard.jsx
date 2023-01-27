import {
    ThirdwebNftMedia,
    useContract,
    useNFT,
    Web3Button,
} from "@thirdweb-dev/react";
import {
    nftDropContractAddress,
    stakingContractAddress,
} from "@/consts/contractAddresses";

const NFTCard = ({ tokenId }) => {
    const { contract } = useContract(nftDropContractAddress, "nft-drop");
    const { data: nft } = useNFT(contract, tokenId);

    return (
        <>
            {nft && (
                <div className={``}>
                    {nft.metadata && (
                        <ThirdwebNftMedia
                            metadata={nft.metadata}
                            className={``}
                        />
                    )}
                    <h3>{nft.metadata.name}</h3>
                    <Web3Button
                        action={(contract) => contract?.call("withdraw", [nft.metadata.id])}
                        contractAddress={stakingContractAddress}
                    >
                        Withdraw
                    </Web3Button>
                </div>
            )}
        </>
    );
};
export default NFTCard;