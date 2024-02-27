import { useReadContract, useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi'
import { formatEther } from 'ethers'

import vtho from '@/src/contracts/vtho'


export default function Home() {
    const { address, isConnected } = useAccount()
    const resultSupply = useReadContract({
        abi: vtho.abi,
        address: vtho.address,
        functionName: 'totalSupply'
    })

    const { data: txId, status, writeContract } = useWriteContract()
    const receipt = useWaitForTransactionReceipt({
        hash: txId,
        pollingInterval: 1_000,
    })

    const handleSendTransfer = () => {
        if (!address) return
        writeContract({
            abi: vtho.abi,
            address: vtho.address,
            functionName: 'transfer',
            args: [
                address,
                0n
            ]
        })
    }

    if (!isConnected) {
        return <center>Please connect wallet first</center>
    }

    return (
        <div className='space-y-8 text-center'>
            <div>
                Total VTHO Supply: {resultSupply.isLoading ? 'Loading' : formatEther(resultSupply.data ?? 0)}
            </div>

            <button
                className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
                onClick={handleSendTransfer}
                disabled={!isConnected}
            >
                Test Transfer of 0 VTHO
            </button>

            <div><hr /></div>

            <div>Transaction Status: {status}</div>

            {receipt.isSuccess &&
                <pre className='font-mono text-left'>
                    {JSON.stringify(receipt.data, (_, value) =>
                        typeof value === 'bigint' ? value.toString() : value, 2)}
                </pre>
            }
        </div>
    )
}