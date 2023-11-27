import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';

import { useContractApprove, useContractTrans } from '../hooks/useContractTrans';
import ERC20 from '../abi/torotokenerc20.json';

import { useAccount, useBalance } from 'wagmi';

const PayDisposer = () => {
  const [loading, setLoading] = useState(false);

  const [disposerId, setDisposerId] = useState("");
  const [wasteId, setWasteId] = useState(Number);
  const [adminAddress, setAdminAddress] = useState("");
  const [amount, setAmount] = useState(Number);

  const [displayBalnce, setDisplayBalnce] = useState(false);

    // check if the form is fill
  const isFormFilled = disposerId && wasteId && adminAddress && amount;

    // to clear the form after
  const clearForm = () => {
    setDisposerId("");
    setWasteId(Number);
    setAdminAddress("");
    setAmount(Number);
  };

  const [deBounceDisposerId] = useDebounce(disposerId, 500);
  const [deBounceWasteId] = useDebounce(wasteId, 500);
  const [deBounceAdminAddress] = useDebounce(adminAddress, 500);
  const [deBounceAmount] = useDebounce(amount, 500);
    

  //Approve Payment
  const { write: approvePayment } = useContractApprove(deBounceAmount);
  // Pay Disposer
  const {write: payDisposer}  = useContractTrans(deBounceDisposerId, deBounceWasteId, wasteId, deBounceAdminAddress, deBounceAmount)

  const handlePayDisposer = async () => {
      
    if (!approvePayment) {
      throw "Transanction Not Approved"
    };

    // if (!payDisposer) {
    //   throw "Transanction Failed"
    // };
    setLoading(true);
    if (!isFormFilled) throw new Error("Please enter the correct collector wallet address");

    const approveTx = await approvePayment();
    approveTx;
  
    // const transTx = payDisposer();
    // await transTx;
    setLoading(false);
    clearForm();
      
  };

  const disposerPayment = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(handlePayDisposer(), {
        pending: "Payment in Progress",
        success: "Payment Successful",
        error: "Error Paying Disposer."
      })
    } catch (e) {
      console.log({ e });
      toast.error(e?.message || "Something went wrong.")
    }
  };
    
//0x98D5486043F8Be62dB6d3cB2466Ff6339483689C
//0x5Ec93469583ccaa023e32D43F916979eF4A983F7
    
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
                type="text"
                onChange={(e) => setDisposerId(e.target.value)}
                className="border-none w-full px-4 py-2 rounded-sm"
                name="Id"
                id="disposerId"
                placeholder="Disposer Address"
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