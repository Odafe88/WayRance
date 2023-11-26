import React, { useState } from 'react';
import { useGlobalState, setGlobalState } from '../hooks/globalState';
import CustomButton from './CustomButton';
import { Link } from 'react-router-dom';

const DashboardBox = () => {
  const [wasteRecorded] = useGlobalState('wasteRecorded')
  const [wasteValidated] = useGlobalState('wasteValidated');
  const [amountEarned] = useGlobalState('amountEarned');
  const [recordModal, setRecordModal] = useState(false);
  
  const toggleModal = () => {
    setRecordModal(true)
  }


  return (
    <div className="relative flex justify-center items-center mb-10
        w-full h-100
    ">
      <div className='w-full p-4 bg-white border-2 rounded-md'>
        <h1 className=' text-xl font-bold md:text-3xl text-blue-950 mr-5 my-2'>Dashboard</h1>
           
        <div className="grid grid-cols-1 md:grid-cols-3 bg-slate-200 p-2">
          <div className="text-md font-semibold my-2">
          <p>Waste Recorded: {wasteRecorded}</p>
          </div>
          <div className="text-md font-semibold my-2">
          <p>Waste Validated: {wasteValidated}</p>
          </div>
          <div className="text-md font-semibold my-2">
          <p>Amount Earned: {amountEarned} Toro</p>
          </div>
        </div>
        <div>
          <Link to="/disposer/record-waste" >
            <CustomButton type="submit" content="Record Waste" />
          </Link>
        </div>
      </div>
      
    </div>
  )
}

export default DashboardBox;
