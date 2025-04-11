import { useReadContract } from "wagmi";
import WayranceAbi from '../abi/new-wayrance.json'

export const useContractCall = (functionName, args, watch) => {

    const resp = useReadContract({

        address: WayranceAbi.address,
        abi: WayranceAbi.abi,
        functionName: functionName,
        args,
        watch,
        onError: (err) => {
            console.log({ err })
        }

    })
    
    return resp
}