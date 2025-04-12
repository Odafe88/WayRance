import ConnectWallet from "./element/connectWallet";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useGlobalState} from "../hooks/globalState"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [admin] = useGlobalState("admin")

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed h-[5rem] t-0 r-0 l-0 w-full mx-auto bg-[#040D12]">
      <nav className=" flex items-center justify-between px-[2.5rem] py-[1rem] md:px-[5rem]">
        <div className="w-[60px] md:w-[80px] cursor-pointer">
          <h1 className="text-[#fff] text-[1.2rem] md:text-[1.8rem] font-bold ">
            <Link to="/">Dumprr</Link>
          </h1>
        </div>
        {
          admin ?
          
            <div className="hidden md:flex md:items-center md:justify-between gap-6">
              <h3 className="
                text-[#fff] text-[1.2rem] md:text-[1.8rem] font-bold leading-none
                hover:text-yellow-500
              ">
                <Link to="/admin">Admin</Link>
              </h3>
            </div>
          :
        <div className="hidden md:flex md:items-center md:justify-between gap-6">
          <h3 className="
          text-[#fff] text-[1.2rem] md:text-[1.6rem] font-bold leading-none
          hover:text-yellow-500
          ">
            <Link to="/disposer">Disposer</Link>
          </h3>
        </div>
        }
        <div className="hidden md:flex md:items-center md:justify-between">
          <ConnectWallet />
        </div>

        <div className="md:hidden md:flex md:items-center md:justify-between">
          <button className="text-white" onClick={toggleMenu}>
            {isOpen ? (
              <FaTimes className="text-[1.5rem]" />
            ) : (
              <FaBars className="text-[1.5rem]" />
            )}
          </button>
        </div>
        
      </nav>

      {isOpen && (
        <div className="fixed z-20 top-0 bg-[#040D12] h-3/4
         right-0 bottom-0 left-0 px-[2.5rem] py-[1rem] md:px-[5rem] flex flex-col 
         gap-6 items-center justify-center">
          <button
            className="text-white absolute top-0 right-0 px-[2.5rem] py-[1rem]"
            onClick={toggleMenu}
          >
            <FaTimes className="text-2xl" />
          </button>

          <h3 className="text-white text-lg font-semibold leading-none">
            <Link to="/">Home</Link>
          </h3>
          <h3 className="text-white text-lg font-semibold leading-none">
            <Link to="/dashboard">Dashboard</Link>
          </h3>
          <h3 className="text-white text-lg font-semibold leading-none">
            <Link to="/disposer">Disposer</Link>
          </h3>


          <div className="flex">
          <ConnectWallet />
        </div>
        </div>
      )}
    </header>
  );
}
