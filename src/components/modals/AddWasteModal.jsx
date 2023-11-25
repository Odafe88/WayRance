import React, { useState } from 'react';
import {  IoCloseCircle } from "react-icons/io5";
import { useContractSend } from '../../hooks/useContractWrite';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';

const AddWasteModal = () => {
  const [wallet, setWallet] = useState()
  const [wasteType, setWasteType] = useState('')
  const [collectionLocation, setCollectionLocation] = useState('')
  const [weight, setWeight] = useState('')
  const [wasteAmount, setWasteAmount] = useState('')
  
  const [toggle, setToggle ] = useState(false)
  const [loading, setLoading] = useState(true)

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
    } catch (e) {
      console.log({ e });
      toast.error(e?.message || "Something Went wrong. Try record waste")
    }
  }


  return (
    <div className='flex mb-10'>

            <div id='modalBioData' className='flex justify-center items-center w-3/4 h-3/4 mt-6'>
              <div className='w-[600px] rounded-md bg-slate-100 p-5'>
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
                        <button type='submit' className=' border-none text-whitebg-[#06102b] px-4 py-2 rounded-md' disabled={!!loading || !isFormFilled || !recordWaste} >
                          {loading ? "Loading" : 'Recording Waste'}
                        </button>
                        <button type='button' onClick={() => setToggle(false)}><IoCloseCircle  size={30} color="#06102b"/></button>
                      </div>
                </form>
              </div>
            </div>

      </div>
  )
}

export default AddWasteModal
