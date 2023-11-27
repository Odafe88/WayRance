import { useContractWrite, usePrepareContractWrite } from "wagmi";
import ERC20 from '../abi/torotokenerc20.json'
import WayRanceABI from '../abi/wayrance.json'

export const useContractTrans = (wasteAmount) => {

    const { config } = usePrepareContractWrite({
        address: ERC20.address,
        abi: ERC20.abi,
        functionName: 'approve',
        args: [WayRanceABI.address, wasteAmount],
        onError: (err) => {
            console.log({ err });
        }
    })

    const { data, isSuccess, write, error,  isLoading} = useContractWrite(config)
    return { data, isSuccess, write, isLoading}
}