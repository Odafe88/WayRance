import FirstImg from '../assets/BD583E5A-C0FA-444F-989C-F8633DBF8D75.png'
import firstIcon from '../assets/first_icon.png'
import secIcon from '../assets/second_icon.png'
import thirdIcon from '../assets/third_icon.png'
import CustomButton from '../components/CustomButton'
import AddDisposerModal from '../components/modals/AddDisposerModal'
import { useGlobalState, setGlobalState, getGlobalState } from '../hooks/globalState'

export default function Home() {
  const [regModal] = useGlobalState('regModal')
  const [regiteredUser] = useGlobalState('registeredUser')

  const handleUserReg = () => {
    setGlobalState('regModal', true)
  }
  return (
    <div className="
      mx-auto px-[10px] md:px-[70px] py-[100px] md:py-[123px]
      bg-[#040D12]
      ">
      
      <section className="flex flex-col sm:flex-row">
        <div className="px-4 sm:px-8">
          {/* text-[#282e82] */}
          <h1 className="text-white sm:pb-4 text-3xl sm:text-6xl font-semibold sm:leading-normal">
            Decentralizing <br /><span className="text-[#64CCC5]">Waste</span> Management
            Empowering <span className="text-[#64CCC5]">People</span><br />
          </h1>
          <div className="pt-4 pb-[60px]  sm:pt-0 pb-0">
            <CustomButton content={regiteredUser ? `Go to Dashboard` : `Register as Disposer`} type="submit" onClick={handleUserReg} />
          </div>
        </div>
        <div className="flex justify-center items-center w-100 md:w-2/3">
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

        <div className="border-none my-8 grid grid-cols-2 gap-2 md:grid md:grid-cols-3 md:gap-3">

          {/**step 1 */}
          <div className="bg-white rounded-sm">
            <div className="p-[10px] md:p-[60px] flex gap-8">
              <div className="
              rounded-full text-white
              flex justify-center items-center
              bg-[#282e82]  w-[18px] h-[18px] md:w-[30px]  md:h-[30px] text-center
              ">
                1
              </div>
              <h3 className="text-center text-[#282e82] text-md md:text-xl font-bold leading-7">Register as a Disposer on the WayRance Website</h3>
            </div>
            <div className="w-[100px]  md:w-[200px] mx-[80px] ">
              <img alt="first-icon" src={firstIcon} />
            </div>
          </div>

          {/**step 2 */}
          <div className="bg-white rounded-sm">
            <div className="p-[10px] md:p-[60px] flex gap-8">
              <div className="
              rounded-full text-white
              flex justify-center items-center
              bg-[#282e82] w-[18px] h-[18px] md:w-[30px]  md:h-[30px] text-center
              ">
                2
              </div>
              <h3 className="text-center text-[#282e82] text-md md:text-xl font-bold leading-7">Record and Submit your waste for collection</h3>
            </div>
            <div className="w-[100px]  sm:w-[200px] mx-[80px] ">
              <img alt="first-icon" src={secIcon} />
            </div>
          </div>

          {/**step 3 */}
          <div className="bg-white rounded-sm">
            <div className="p-[10px] md:p-[60px] flex gap-8">
              <div className="
              rounded-full text-white
              flex justify-center items-center
              bg-[#282e82] w-[18px] h-[18px] md:w-[30px]  md:h-[30px] text-center ">
                3
              </div>
              <h3 className="text-center text-[#282e82] text-md md:text-xl font-bold leading-7">Get your Waste Validated and Picked Up</h3>
            </div>
            <div className="w-[100px]  md:w-[200px] mx-[80px] ">
              <img alt="first-icon" src={thirdIcon} />
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-sm">
            <div className="p-[10px] md:p-[60px] flex gap-8">
              <div className="
              rounded-full text-white
              flex justify-center items-center
              bg-[#282e82] w-[18px] h-[18px] md:w-[30px]  md:h-[30px] text-center ">
                4
              </div>
              <h3 className="text-center text-[#282e82] text-md md:text-xl font-bold leading-7">Get Paid!</h3>
            </div>
            <div className="w-[100px]  md:w-[200px] mx-[80px] ">
              <img alt="first-icon" src={thirdIcon} />
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
