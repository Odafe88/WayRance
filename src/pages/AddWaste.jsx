import React, { useState } from 'react';
import {  IoCloseCircle } from "react-icons/io5";
import { useContractSend } from "../hooks/useContractWrite";
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import { useNavigate } from "react-router-dom";
import { setGlobalState, useGlobalState } from '../hooks/globalState';

const AddWaste = () => {
  const router = useNavigate();
  const [wallet, setWallet] = useState()
  const [wasteType, setWasteType] = useState('')
  const [collectionLocation, setCollectionLocation] = useState('')
  const [weight, setWeight] = useState('')
  const [wasteAmount, setWasteAmount] = useState()
  
  const [toggle, setToggle ] = useState(false)
  const [loading, setLoading] = useState(false)

  let [wasteRecorded] = useGlobalState("wasteRecorded")

  let newRecord = wasteRecorded

  // to check if the form is filled
  const isFormFilled = wallet && wasteType && collectionLocation && weight && wasteAmount 

  // clear the form when the form is filed 
  const handleClear = () => {
    setWallet();
    setWasteType('')
    setCollectionLocation('')
    setWeight('');
    setWasteAmount(0);
  }

 
  
  const [ debouncedWallet ] = useDebounce(wallet,500)
  const [ debouncedWasteType ] = useDebounce(wasteType,500)
  const [ debouncedCollectionLocation] = useDebounce(collectionLocation,500)
  const [ debounceWeight ] = useDebounce(weight,500)
  const [ debounceWasteAmount ] = useDebounce(wasteAmount,500)
  

  // function to write to the contract
  const {write : recordWaste } = useContractSend('recordWaste', [
    debouncedWallet,
    debouncedWasteType,
    debouncedCollectionLocation,
    debounceWeight,
    debounceWasteAmount
  ])

  // handle the redcord waste 

  const handleRecordWaste = async () => {
    if(!recordWaste) {
      throw "Failed To Record Waste"
    }
    setLoading("Record.....")
    if(!isFormFilled) throw new Error("Please fill the correct details")
    

    const transactTx = await recordWaste();
    setLoading("Waiting For Confirmation")
    newRecord++;
    setGlobalState("wasteRecorded", newRecord)
    await transactTx
    setToggle(false);
    handleClear()
  }

  const addwaste = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(handleRecordWaste(), {
        pending: "Recording waste",
        success: "Waste Recorded",
        error: "Error Recording Waste, you are not a Collector"
      })
      router("/disposer")
    } catch (e) {
      console.log({ e });
      toast.error(e?.message || "Something Went wrong. Try record waste")
    }
  }


  return (
    <div className='flex w-screen h-screen bg-[#040D12]'>

            <div id='modalBioData' className='flex justify-center items-center w-full h-full px-[20px] py-[20px]'>
              <div className='w-full md:w-[600px] bg-black rounded-md bg-slate-100 px-[10px] py-[10px] md:px-5 md:py-5'>
                <h3 className="font-bold text-xl md:text-2xl text-[#040D12] mb-4">
                  Record Waste
                </h3>
          
                <form onSubmit={addwaste}>
                      <div className='mb-8'>
                          <input onChange={(e) => setWallet(e.target.value)} className='border-none w-full px-4 py-2 rounded-sm' name='wasteType' id="wasteType" placeholder='Disposers Name' />
                      </div>
                      <div className='mb-8'>
                          <input type="text" onChange={(e) => setWasteType(e.target.value)} className='border-none w-full px-4 py-2 rounded-sm' name='wasteType' id="wasteType" placeholder='Waste Type' />
                      </div>

                      <div className='mb-8'>
                          <input type="text" onChange={(e) => setCollectionLocation(e.target.value)} className=' border-none w-full px-4 py-2 rounded-sm' name='collectionLocation' id="collectionLocation" placeholder='Your Location(Address)' />
                      </div>

                      <div className='mb-8'>
                          <input type="number" onChange={(e) => setWeight(e.target.value)} className=' border-none w-full px-4 py-2 rounded-sm' name='wasteKg' id="wasteKg" placeholder='Waste Kg' />
                      </div>
                      <div className='mb-8'>
                          <input type="number" onChange={(e) => setWasteAmount(e.target.value)} className=' border-none w-full px-4 py-2 rounded-sm' name='wasteAmount' id="wasteAmount" placeholder='Waste Amount' />
                      </div>
                      <div className='flex justify-between'>
                        <button type='submit' className='bg-yellow-500 border-none text-whitebg-[#06102b] text-[16px] md:text-[20px] font-semibold rounded-sm px-2 md:px-4 py-2 md:font-bold' disabled={!!loading || !isFormFilled || !recordWaste} >
                          {loading ? "Loading" : 'Submit'}
                        </button>
                        <button type='button' onClick={() => setToggle(false)}><IoCloseCircle  size={30} color="#06102b"/></button>
                      </div>
          </form>
          <div className="py-4">
            <p className="text-black font-bold mb-4 text-xl">Plastic: 500Naira/Kg</p>
            <p className="text-black font-bold mb-4 text-xl">Plastic: 750Naira/Kg</p>
            <p className="text-red-500">*We only accept Plastics and Metals Wastes/Scraps</p>
          </div>
              </div>
            </div>

      </div>
  )
}

export default AddWaste
