import React, {useState} from 'react'
import { useAccount } from 'wagmi'
import { useContractSend } from '../hooks/useContractWrite';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import CustomButton from '../components/CustomButton';

const Admin = () => {
    const router = useNavigate()
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState();
    

    // const isFormFilled = id;

    const [debounceId] = useDebounce(id, 500)

    const {write: validateWaste} = useContractSend('validateWaste', [debounceId])

    const handleVerify = async () => {
        if(!validateWaste) {
            throw "Failed To Register User"
          }
        setLoading(true)
        // if(!isFormFilled) {
        // toast.warn("Please fill the correct details")
        // throw new Error("Please fill the correct details")
        // }

        const transactTx = validateWaste()
        setLoading(false)

        transactTx;
    }

    const handleValidated = async (e) => {
        e.preventDefault();

        try {
            await toast.promise(
                () => handleVerify(),
                {
                   pending: "Validating Waste",
                   success: "Waste Validated successfully",
                   error: "Error Validating Waste",
                }
            )
            router("/admin/pay_disposer")
        } catch (e) {
            console.log({ e });
            toast.error(e?.message || "Something went wrong.")
        }
    }

    return (
        <div className="h-screen w-full flex flex-col md:flex-row justify-arouns bg-[#040D12]">
            <div className="absolute ml-[20px] top-[70px] px-[10px] py-[10px] ">
                <h2 className="font-bold text-xl md:text-3xl text-yellow-500 mb-4">
                    Welcome, Admin
                </h2>
            </div>
        <div className="flex flex-col rounded-mg bg-black bg-opacity-20 backdrop-blur-md justify-center w-1/2 my-auto mx-auto  w-[300px] md:w-[600px] h-[300px] px-[10px] md:px-[20px] py-[10px]">
            <h3 className="font-bold text-xl md:text-2xl text-white mt-0 mb-4">Validate Waste</h3>
            <form  onSubmit={handleValidated}>
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
                <CustomButton type="submit" content="Submit"/> 
            </form>
        </div>
        
    </div>
    )
}



export default Admin