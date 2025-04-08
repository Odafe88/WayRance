import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import { useContractTrans } from '../hooks/useContractTrans';
import { useAccount, useBalance } from 'wagmi';

const PayDisposer = () => {
  const [loading, setLoading] = useState(false);
  const [disposerId, setDisposerId] = useState("");
  const [wasteId, setWasteId] = useState("");
  const [adminAddress, setAdminAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [displayBalance, setDisplayBalance] = useState(false);

  // Form validation
  const isFormFilled = Boolean(
    disposerId &&
    wasteId &&
    adminAddress &&
    amount
  );

  // Clear form
  const clearForm = () => {
    setDisposerId("");
    setWasteId("");
    setAdminAddress("");
    setAmount("");
  };

  // Debounced values
  const [debouncedDisposerId] = useDebounce(disposerId, 500);
  const [debouncedWasteId] = useDebounce(wasteId, 500);
  const [debouncedAdminAddress] = useDebounce(adminAddress, 500);
  const [debouncedAmount] = useDebounce(amount, 500);

  // Contract hooks
  const { write: payDisposer, isLoading: isTransferring } = useContractTrans(
    debouncedDisposerId,
    debouncedWasteId,
    wasteId,
    debouncedAdminAddress,
    debouncedAmount
  );

  const handlePayDisposer = async () => {
    if (!isFormFilled) {
      throw new Error("Please enter all required fields");
    }

    setLoading(true);
    try {
      const transTx = await payDisposer();
      await toast.promise(
        async () => {
          await transTx;
        },
        {
          pending: "Payment in progress",
          success: "Payment successful",
          error: "Error paying disposer"
        }
      );
      clearForm();
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const disposerPayment = async (e) => {
    e.preventDefault();
    try {
      await handlePayDisposer();
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex bg-[#040D12] h-screen">
      <div className="flex flex-col mx-auto rounded-md
        bg-black bg-opacity-20 backdrop-blur-md
        w-[300px] md:w-[600px] h-fit px-[10px] md:px-[20px] py-[20px]">
        <h3 className="font-bold text-xl mt-[20px] md:mt-[50px] md:text-2xl text-white mb-4">
          Transfer to Disposer
        </h3>
        <form onSubmit={disposerPayment}>
          <div className="mb-8">
            <input
              type="text"
              value={disposerId}
              onChange={(e) => setDisposerId(e.target.value)}
              className="border-none w-full px-4 py-2 rounded-sm bg-black bg-opacity-50"
              name="Id"
              id="disposerId"
              placeholder="Disposer Address"
              disabled={loading}
            />
          </div>
          <div className="mb-8">
            <input
              type="text"
              value={adminAddress}
              onChange={(e) => setAdminAddress(e.target.value)}
              className="border-none w-full px-4 py-2 rounded-sm bg-black bg-opacity-50"
              name="adminAddress"
              id="adminAddress"
              placeholder="Admin Address"
              disabled={loading}
            />
          </div>
          <div className="mb-8">
            <input
              type="text"
              value={wasteId}
              onChange={(e) => setWasteId(e.target.value)}
              className="border-none w-full px-4 py-2 rounded-sm bg-black bg-opacity-50"
              name="WasteId"
              id="wasteID"
              placeholder="Waste ID"
              disabled={loading}
            />
          </div>
          <div className="mb-8">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-none w-full px-4 py-2 rounded-sm bg-black bg-opacity-50"
              name="amount"
              id="amount"
              placeholder="Amount"
              disabled={loading}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-yellow-500 rounded-sm px-4 py-2 font-bold
                text-lg md:text-xl font-semibold cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !isFormFilled}
            >
              {loading ? "Loading" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayDisposer;