import React, {useState, useEffect } from 'react'
import { toast } from'react-toastify'
import { useDebounce } from 'use-debounce'

import { useContractTrans } from '../hooks/useContractTrans'
import ERC20 from '../abi/torotokenerc20.json' 

import { useAccount, useBalance} from 'wagmi'

const PayDisposer = () => {
  const [loading, setLoading] = useState(false);

  const [disposerId, setDisposerId] = useState()
  const [wasteId, setWasteId] = useState();
  const [adminAddress, setAdminAddress] = useState();
  const [amount, setAmount] = useState();

  const [displayBalnce, setDisplayBalnce] = useState(false)

    // check if the form is fill
  const isFormFilled = disposerId && wasteId && adminAddress && amount;

    // to clear the form after
    const clearForm = () => {
      setDisposerId();
      setWasteId();
      setAdminAddress();
      setAmount();
    }

  const [deBounceDisposerId] = useDebounce(disposerId, 500);
  const [deBounceWasteId] = useDebounce(wasteId, 500);
  const [deBounceAdminAddress] = useDebounce(adminAddress, 500);
  const [deBounceAmount] = useDebounce(amount, 500);
    
    // write to the contract
    const { write: payDisposer } = useContractTrans(amount)

    const handlePayDisposer = async () => {
      if(!payDisposer) {
        throw "Transanction Failed"
      }
      setLoading(true)
      if(!isFormFilled) throw new Error("Please enter the correct collector wallet address");

      const transTx = await payDisposer();
      setLoading(false)
      await transTx


      clearForm()
      
    }

    const disposerPayment = async (e) => {
      e.preventDefault();
      try {
        await toast.promise(handlePayDisposer(), {
          pending: "Payment in Progress",
          success: "Payment Successful",
          error:"Error Paying Disposer, please check the wallet address and try again."
        })
      } catch (e) {
        console.log({e});
        toast.error(e?.message || "Something went wrong. Try Again later. Contact for help")
      }
    }
    
    const { address, isConnected} = useAccount();
    const { data: toroBalance} = useBalance({
        address,
        token: ERC20.address
    });
    
    useEffect(() => {
        if(isConnected && toroBalance) {
            setDisplayBalnce(true)
            return;
        }
        setDisplayBalnce(false)
    }, [toroBalance, isConnected])
    
  return (
    <div className=' flex bg-[#040D12] h-screen'>
      <div className="flex flex-col mx-auto rounded-md
      bg-black bg-opacity-20 backdrop-blur-md 
      w-[300px] md:w-[600px] h-fit px-[10px] md:px-[20px] py-[20px]">
        <h3 className="font-bold text-xl mt-[20px] md:mt-[50px] md:text-2xl text-white mb-4">
            Transfer to Disposer   
        </h3>   
        <div>
          <form onSubmit={disposerPayment}>
            <div className="mb-8">
              <input
                type="number"
                onChange={(e) => setDisposerId(e.target.value)}
                className="border-none w-full px-4 py-2 rounded-sm"
                name="Id"
                id="disposerId"
                placeholder="Disposer Id"
              />
            </div>
            <div className="mb-8">
              <input
                type="number"
                onChange={(e) => setWasteId(e.target.value)}
                className="border-none w-full px-4 py-2 rounded-sm"
                name="WasteId"
                id="wasteID"
                placeholder="Waste ID"
              />
            </div>
            <div className="mb-8">
            <input
                type="text"
                onChange={(e) => setAdminAddress(e.target.value)}
                className="border-none w-full px-4 py-2 rounded-sm"
                name="adminAddress"
              id="adminAddress"
                placeholder="Admin Address"
              />
            </div>
            <div className="mb-8">
              <input
                type="text"
                onChange={(e) => setAmount(e.target.value)}
                className="border-none w-full px-4 py-2 rounded-sm"
                name="amount"
                id="amount"
                placeholder="Amount"
              />
            </div>
            <div className=" flex justify-between">
              <button
                type="submit"
                className="bg-yellow-500 rounded-sm px-4 py-2 font-bold 
                text-lg md:text-xl font-semibold cursor-pointer"
              >
                {loading ? "Loading" : "Submit"}
              </button>
              {/* <button type="button" onClick={() => setToggle(false)}>
                <IoCloseCircle size={30} color="#06102b" />
              </button> */}
            </div>
          </form> 
        </div>
      </div>        
    </div>
  )
}

export default PayDisposer;