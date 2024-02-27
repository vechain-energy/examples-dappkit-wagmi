import { Fragment, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi';
import { Dialog, Transition } from '@headlessui/react'

export default function Auth() {
    return (
        <div className='flex justify-end p-4'>
            <ConnectButton
                className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
            />
        </div>
    );
}


export function ConnectButton({ className }: { className?: string }) {
    const account = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const ens = useEnsName({ address: account.address })
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleDisconnect = () => {
        disconnect()
        setDialogOpen(false)
    }


    if (account.isConnected && account.address) {
        return (
            <>
                <button
                    type="button"
                    className={className}
                    onClick={() => setDialogOpen(true)}
                >
                    {ens.data || `${account.address.slice(0, 6)}···${account.address.slice(-4)}`}
                </button>

                <Transition.Root show={dialogOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setDialogOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                                        <div>
                                            <div className="mt-3 text-center sm:mt-5">
                                                <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                                                    {ens.data || `${account.address.slice(0, 6)}···${account.address.slice(-4)}`}
                                                </Dialog.Title>
                                                <div className="mt-4">
                                                    <p className="text-sm text-gray-500 font-mono">
                                                        {account.address}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5 sm:mt-6">
                                            <button
                                                type="button"
                                                className={`${className} w-full`}
                                                onClick={handleDisconnect}
                                            >
                                                Disconnect Wallet
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            </>
        )
    }

    if (account.isConnecting) {
        return (
            <button
                type="button"
                className={className}
            >
                Connecting..
            </button>
        )
    }

    if (!connectors.length || !connectors[0]) {
        return <></>
    }

    return (
        <button
            type="button"
            className={className}
            onClick={() => connect({ connector: connectors[0]! })}
        >
            Connect Wallet
        </button>
    )
}