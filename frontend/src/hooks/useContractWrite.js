import { useWriteContract } from 'wagmi';
import abi from '../abi/new-wayrance.json';

export const useContractSend = (functionName, args = []) => {
  const { data, isLoading, isSuccess, write, error } = useWriteContract({
    address: abi.address,
    abi: abi.abi,
    functionName,
    args,
    onError: (err) => {
      console.log(err);
    }
  });

  return { data, isLoading, isSuccess, write, error };
};