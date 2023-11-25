import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import WayRanceAbi from '../abi/wayrance.json';


export const useContractSend = (functionName) => {

    // const {config} = usePrepareContractWrite({
    //     // the address of the waste contract
    //     address: WayRanceAbi.address,
    //     abi: WayRanceAbi.abi,
    //     functionName,
    //     args,
    //     onError: (err) => {
    //         console.log(err);
    //     }
    // })

    const { data, isLoading, isSuccess, write } = useContractWrite({
          address: WayRanceAbi.address,
          abi: WayRanceAbi.abi,
          functionName,
        })
        

    //const {data, isSuccess, write, writeAsync, error, isLoading} = useContractWrite(config)
    return { data, isSuccess, write, isLoading}
}