import { useContractRead } from "wagmi";
import WayranceAbi from '../abi/wayrance.json'

export const useContractCall = (functionName, args, watch) => {

    const resp = useContractRead({

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