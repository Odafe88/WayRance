import FirstImg from '../assets/BD583E5A-C0FA-444F-989C-F8633DBF8D75.png'
import firstIcon from '../assets/first_icon.png'
import secIcon from '../assets/second_icon.png'
import thirdIcon from '../assets/third_icon.png'
import CustomButton from '../components/CustomButton'
import AddDisposerModal from '../modals/AddDisposerModal'
import { useGlobalState, setGlobalState } from '../hooks/globalState'
import { useState } from 'react'


export default function Home() {
  const [regModal] = useGlobalState("regModal")
  const [registeredUser] = useGlobalState("registeredUser")

  const handleUserReg = () => {
    setGlobalState("regModal", true);
  }


  // }
  return (
    <div className="
      mx-auto px-[10px] md:px-[70px] py-[50px] md:py-[123px]
      bg-[#040D12]
      ">
      
      <section className="flex flex-col md:flex-row mb-[130px] md:mb-0">
        <div className="px-4 ">
          {/* text-[#282e82] */}
          <h1 className="text-white sm:pb-4 text-4xl md:text-6xl font-semibold sm:leading-normal">
            Decentralizing <br /><span className="text-[#64CCC5]">Waste</span> Management,
            Empowering <span className="text-[#64CCC5]">People</span><br />
          </h1>
          <div className="pt-[20px] pb-[60px] mt-8 md:pt-0 pb-0">
            <CustomButton content={`Register as Disposer`} type="submit" onClick={handleUserReg} />
          </div>
        </div>
        <div className="hidden md:flex md:justify-center md:items-center md:w-2/3">
          <img
            alt="world-logo"
            className=" w-[270px] h-[270px] mb-[120px] md:mb-[90px] md:w-[450px] md:h-[450px]"
            src={FirstImg}
          />
        </div>
      </section>

      <section className="mt-6 md:mt-3 px-4 md:px-8">
        <h1 className=" text-white text-2xl sm:text-4xl 
        font-semibold leading-10"> How it works</h1>

        <div className="border-none my-8 grid grid-cols-1 gap-2">

          {/**step 1 */}
          <div className="flex flex-col-reverse md:flex-row
          w-full rounded-md px-4 py-4
          bg-black bg-opacity-20 backdrop-blur-md
          ">
            <div className="bg-white rounded-md p-0 md:p-[60px] flex gap-8">   
              <div className="w-[100px]  md:w-[200px] mx-[80px] ">
                <img alt="first-icon" src={firstIcon} />
              </div>    
            </div>
            <div className="md:px-[20px] text-white">
              <div className="rounded-md text-[#040D12]
              flex justify-center items-center text-[22px]
              bg-white w-fit px-4 py-2  h-[30px] md:h-[38px] text-center">
                <p className="font-bold">Step 1</p>
              </div>
              <h3 className="text-start my-4 text-xl md:text-2xl font-bold leading-7">Register as a Disposer on the WayRance Website</h3>
              <p className="text-lg md:text-xl mb-2">
                Click the Register as Disposer button on the Homepage to get Started
              </p>
            </div>
            
          </div>

          {/**step 2 */}
          <div className="flex flex-col-reverse md:flex-row-reverse justify-between mt-8
          w-full rounded-md px-4 py-4
          bg-black bg-opacity-20 backdrop-blur-md
          ">
            <div className="bg-white rounded-md p-0 md:p-[60px] flex gap-8">   
              <div className="w-[100px]  md:w-[200px] mx-[80px] ">
                <img alt="first-icon" src={firstIcon} />
              </div>    
            </div>
            <div className="md:px-[20px] text-white">
              <div className="rounded-md text-[#040D12]
              flex justify-center items-center text-[22px]
              bg-white w-fit px-4 py-2  h-[30px] md:h-[38px] text-center">
              <p className="font-bold">Step 2</p>
              </div>
              <h3 className="text-start my-4 text-xl md:text-2xl font-bold leading-7">
              Record and Submit your waste for collection 
              </h3>
              <p className="text-lg md:text-xl mb-2">
                Record and Submit your waste for Validation in the Disposer's dashboard
              </p>
            </div>
          </div>

          {/**step 3 Get your Waste Validated and Picked Up*/}
          <div className="flex flex-col-reverse md:flex-row mt-8
          w-full rounded-md px-4 py-4
          bg-black bg-opacity-20 backdrop-blur-md
          ">
            <div className="bg-white rounded-md p-0 md:p-[60px] flex gap-8">   
              <div className="w-[100px]  md:w-[200px] mx-[80px] ">
                <img alt="first-icon" src={firstIcon} />
              </div>    
            </div>
            <div className="md:px-[20px] text-white">
              <div className="rounded-md text-[#040D12]
              flex justify-center items-center text-[22px]
              bg-white w-fit px-4 py-2  h-[30px] md:h-[38px] text-center">
              <p className="font-bold">Step 3</p>
              </div>
              <h3 className="text-start my-4 text-xl md:text-2xl font-bold leading-7">
              Get your Waste Validated and Picked Up 
              </h3>
              <p className="text-lg md:text-xl mb-2">
                Waste's are Validated and calculated by a Wayrance Admin
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col-reverse md:flex-row-reverse  justify-between mt-8
          w-full rounded-md px-4 py-4
          bg-black bg-opacity-20 backdrop-blur-md
          ">
            <div className="bg-white rounded-md md:p-[60px] flex gap-8">   
              <div className="w-[100px]  md:w-[200px] mx-[80px] ">
                <img alt="first-icon" src={firstIcon} />
              </div>    
            </div>
            <div className="md:px-[20px] text-white">
              <div className="rounded-md text-[#040D12]
              flex justify-center items-center text-[22px]
              bg-white w-fit px-4 py-2  h-[30px] md:h-[38px] text-center">
              <p className="font-bold">Step 4</p>
              </div>
              <h3 className="text-start my-4 text-xl md:text-2xl font-bold leading-7">
              Get Paid!
              </h3>
              <p className="text-lg md:text-xl mb-2">
                Funds are disbursed to your account once they are validated
              </p>
            </div>
          </div>
        </div>
      </section>
      {
        regModal ? (
          <AddDisposerModal />
        ) : null
      }
    </div>
  );
}
