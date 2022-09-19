export const getNetwork = (chainId) => {

    switch (chainId) {
        case 1:
            return { link: process.env.ETHEREUM_MAINNET, apiKey: process.env.ETHEREUM_API }
        default:
            return { link: process.env.ETHEREUM_MAINNET, apiKey: process.env.ETHEREUM_API }
    }

}