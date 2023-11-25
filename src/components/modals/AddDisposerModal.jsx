import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";
import { useContractSend } from "../../hooks/useContractWrite";
import CustomButton from "../CustomButton";
import { useGlobalState, setGlobalState, getGlobalState } from "../../hooks/globalState";


const AddDisposerModal = () => {

  const router = useNavigate()
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("");
  const [Location, setLocation] = useState();
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  
  const [regModal] = useGlobalState('regModal');
  const [registeredUser] = useGlobalState('registeredUser');

  const isFormFilled =
    name && Location && email && walletAddress;

  const handleClear = () => {
    setName("");
    setLocation("");
    setEmail("");
    setWalletAddress("");
  };

  const toggleClose = () => {
    setGlobalState('regModal', false);
    handleClear();
  }

  const [ debounceName ] = useDebounce(name, 500)
  const [debounceLocation] = useDebounce(Location, 500)
  const [ debounceEmail ] = useDebounce(email, 500)
  const [ debouncewalletAdd ] = useDebounce(walletAddress, 500)

  const { write: registerUser} = useContractSend('registerDisposer', [
    debounceName,
    debounceLocation,
    debounceEmail,
    debouncewalletAdd
  ])


  const handleUser = async () => {
    if(!registerUser) {
      throw "Failed To Register User"
    }
    setLoading(true)
    if(!isFormFilled) {
      toast.warn("Please fill the correct details")
      throw new Error("Please fill the correct details")
    }

    const transactTx = await registerUser();
    setLoading(false)

    await transactTx
    setGlobalState('registeredUser', true)
    setToggle(false)
    handleClear()
    console.log("User Registered:", registeredUser)
      
  }

  const addUser = async (e) => {
    e.preventDefault()

    try {
      await toast.promise(
        () => handleUser(),
        {
           pending: "Registering User",
           success: "User Registered successfully",
           error: "Error registering the User",
        }
      )
      router("/disposer")
    } catch (e) {
      console.log({ e });
      toast.error(e?.message || "Something went wrong. Contact the Admin")
    }
  }

  return (
    <div className={`
    fixed top-0 left-0 w-screen h-screen 
    bg-black bg-opacity-20 backdrop-blur-md ${regModal}`}
    >
  
        <div
          id="modalBioData"
          className="flex justify-center fixed left-0 top-0 items-center w-full h-full mt-6"
      >
        
        <div className="w-[600px] rounded-2xl bg-[#06102b] p-5">
          <IoCloseCircle onClick={toggleClose} className={regModal ? `cursor-pointer w-[40px] text-white my-4` : `scale-0`} />
          <form onSubmit={addUser}>
            <div className="mb-8">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="border-none w-full px-4 py-2 rounded-sm"
                name="name"
                id="disposerName"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-8">
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                className="border-none w-full px-4 py-2 rounded-sm"
                name="email"
                id="disposerEmail"
                placeholder="Email"
              />
            </div>
            <div className="mb-8">
            <input
                type="text"
                onChange={(e) => setLocation(e.target.value)}
                className="border-none w-full px-4 py-2 rounded-sm"
                name="location"
                id="disposerLoc"
                placeholder="Location"
              />
              {/* <Dropdown id="userLocation" type="text" value={Location} onChange={(e) => setLocation(e.value)} options={states} optionLabel="name" 
                editable placeholder="Select a City" className="border-none bg-white outline-none w-full px-4 py-2 rounded-sm"
              /> */}
            </div>

            <div className="mb-8">
              <input
                type="text"
                onChange={(e) => setWalletAddress(e.target.value)}
                className="border-none w-full px-4 py-2 rounded-sm"
                name="disposerWallet"
                id="wallet"
                placeholder="Wallet Address"
              />
            </div>
            <div className=" flex justify-between">
              <button
                type="submit"
                className="bg-yellow-500 rounded-sm px-4 py-2 font-bold 
                text-xl font-semibold cursor-pointer"
              >
                {loading ? "Loading" : "Register"}
              </button>
              {/* <button type="button" onClick={() => setToggle(false)}>
                <IoCloseCircle size={30} color="#06102b" />
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDisposerModal;
