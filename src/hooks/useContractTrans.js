import { useContractWrite, usePrepareContractWrite } from "wagmi";
import ERC20 from '../abi/torotokenerc20.json'
import WayRanceABI from '../abi/wayrance.json'
import { BigNumber } from "ethers";

export const useContractTrans = (wasteAmount) => {
    const gasLimit = BigNumber.from(1000000)

    const { config } = usePrepareContractWrite({
        address: ERC20.address,
        abi: ERC20.abi,
        functionName: 'approve',
        args: [WayRanceABI.address, wasteAmount],
        overrides: {
            gasLimit
        },
        onError: (err) => {
            console.log({ err });
        }
    })

    const { data, isSuccess, writeAsync, write, error,  isLoading} = useContractWrite(config)
    return { data, isSuccess, writeAsync, write, isLoading}
}