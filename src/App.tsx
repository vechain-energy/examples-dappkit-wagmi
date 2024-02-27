import { DAppKitProvider } from '@vechain/dapp-kit-react';
import type { WalletConnectOptions } from '@vechain/dapp-kit';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { WagmiProvider } from 'wagmi'
import { useWagmiConfig } from './hooks/useWagmiConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
let walletConnectOptions: WalletConnectOptions | undefined;
if (process.env.WALLET_CONNECT_PROJECT_ID) {
    walletConnectOptions = {
        projectId: String(process.env.WALLET_CONNECT_PROJECT_ID),
        metadata: {
            name: 'Vechain App',
            description: 'Your Description',
            url: window.location.origin,
            icons: [],
        },
    };
}


// the app creating the dappkit provider and wrapping the app with the providers
export default function App() {
    return (
        <DAppKitProvider
            nodeUrl={process.env.NODE_URL ?? 'https://node-mainnet.vechain.energy'}
            usePersistence
            walletConnectOptions={walletConnectOptions}
        >
            <AppProviders>
                <AppRouter />
            </AppProviders>
        </DAppKitProvider>
    );
}

// further app providers that are helpful for the app
const queryClient = new QueryClient()
function AppProviders({ children }: { children: React.ReactNode }) {
    const { config } = useWagmiConfig()
    return (
        <BrowserRouter future={{ v7_startTransition: true }}>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </WagmiProvider>
        </BrowserRouter>

    )
}