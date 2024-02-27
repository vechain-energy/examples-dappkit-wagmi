import { useMemo } from 'react'
import { useConnex, useWalletModal, useWallet } from "@vechain/dapp-kit-react"
import { Provider } from '@vechain/web3-providers-connex'
import { createConfig, custom } from 'wagmi'
import { vechain } from 'wagmi/chains'
import { createConnector } from '@wagmi/core'

// inject vet domains relevant contracts that enable ens interactions
vechain.contracts = {
    "ensRegistry": { "address": "0xa9231da8BF8D10e2df3f6E03Dd5449caD600129b" },
    "ensBaseRegistrarImplementation": { "address": "0x6e04F400810Be5C570c08Ea2def43c4d44481063" },
    "ensDnsRegistrar": { "address": "0x0000000000000000000000000000000000000000" },
    "ensEthRegistrarController": { "address": "0x07479F2710d16a0bACbE6C25b9b32447364C0A33" },
    "ensNameWrapper": { "address": "0x1c8Adf6d8E6302d042b1f09baD0c7f65dE3660eA" },
    "ensPublicResolver": { "address": "0xabac49445584C8b6c1472b030B1076Ac3901D7cf" },
    "ensReverseRegistrar": { "address": "0x5c970901a587BA3932C835D4ae5FAE2BEa7e78Bc" },
    "ensBulkRenewal": { "address": "0x793eBb866c7Db6b3e6336861456938D67379d623" },
    "ensDnssecImpl": { "address": "0x0000000000000000000000000000000000000000" },
    "ensUniversalResolver": { "address": "0x3dEB91b387d1e0A2ceB9aDd2AdF43Add1a922569" },
    "multicall3": { "address": "0xfB906D3Ef66cb80fc2E7A79E03228a720b1401F6" },
    "vetResolveUtils": { "address": "0xA11413086e163e41901bb81fdc5617c975Fa5a1A" },
    "venOracle": { "address": "0x49eC7192BF804Abc289645ca86F1eD01a6C17713" }
}

export function useWagmiConfig() {
    const connex = useConnex()
    const connectModal = useWalletModal()
    const wallet = useWallet()

    const config = useMemo(() => {
        // create the provider
        const connexProvider = new Provider({ connex })
        const provider = custom(connexProvider)

        // build a new connector for vechain
        const connector = createConnector(() => ({
            id: 'vechain',
            name: 'vechain',
            type: 'wallet',
            connect: async () => {
                if (!wallet.account) {
                    await connectModal.open()
                    const result = await wallet.connect()
                    return {
                        accounts: [result.account as `0x${string}`],
                        chainId: vechain.id
                    }
                }

                return {
                    accounts: [wallet.account as `0x${string}`],
                    chainId: vechain.id
                }
            },
            disconnect: async () => await wallet.disconnect(),
            getProvider: async () => {
                return {
                    ...provider,
                    request: connexProvider.request.bind(connexProvider)
                }
            },
            getChainId: async () => vechain.id,
            getAccounts: async () => wallet.account ? [wallet.account as `0x${string}`] : [],
            isAuthorized: async () => Boolean(wallet.account),
            onAccountsChanged: () => { },
            onChainChanged: () => { },
            onDisconnect: () => { },
        }))

        // combine it into a valid configuration
        return createConfig({
            chains: [vechain],
            connectors: [connector],
            transports: {
                [vechain.id]: provider
            }
        })
    }, [connex, wallet, connectModal]);

    return {
        config
    }
}