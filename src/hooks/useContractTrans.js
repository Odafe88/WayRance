import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useSendTransaction, usePrepareSendTransaction } from 'wagmi'

import ERC20 from '../abi/torotokenerc20.json'
import WayRanceABI from '../abi/wayrance.json'
import { parseEther } from "ethers";

export const useContractApprove = (wasteAmount) => {

    const { config } = usePrepareContractWrite({
        address: ERC20.address,
        abi: ERC20.abi,
        functionName: "approve",
        args: [WayRanceABI.address, wasteAmount],
        onError: (err) => {
            console.log({ err });
        }
    })

    const { data, isSuccess, write, error,  isLoading} = useContractWrite(config)
    return { data, isSuccess, write, isLoading}
}


export const useContractTrans = (recieverAddr, senderAddr, wasteId, wasteAmount) => {

    const { config } = usePrepareContractWrite({
        address: WayRanceABI.address,
        abi: WayRanceABI.abi,
        functionName: "wastePayment",
        args: [recieverAddr, senderAddr, wasteId, wasteAmount],
        onError: (err) => {
            console.log({ err });
        }
    })

    const { data, isSuccess, write, error,  isLoading} = useContractWrite(config)
    return { data, isSuccess, write, isLoading}
}

//args: [WayRanceABI.address, wasteAmount],