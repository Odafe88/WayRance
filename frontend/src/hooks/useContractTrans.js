import { useWriteContract } from 'wagmi';
import { parseEther } from 'ethers';
import WayRanceABI from '../abi/wayrance.json';

export const useContractTrans = (
  receiverAddr,
  senderAddr,
  wasteId,
  wasteAmount
) => {
  const { 
    data, 
    isLoading, 
    isSuccess, 
    write, 
    error 
  } = useWriteContract({
    address: WayRanceABI.address,
    abi: WayRanceABI.abi,
    functionName: 'wastePayment',
    args: [receiverAddr, senderAddr, wasteId, wasteAmount],
    onError: (err) => {
      console.error('Contract transaction error:', err);
    }
  });

  return { data, isLoading, isSuccess, write, error };
};