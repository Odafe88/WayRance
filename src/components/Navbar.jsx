import ConnectWallet from "./element/connectWallet";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="mx-auto bg-[#040D12]">
      <nav className=" flex py-4 px-8 items-center justify-between ">
        <div className="w-[60px] sm:w-[80px]  cursor-pointer">
          <h1 className="text-[#fff] text-[20px] font-bold ">
            <Link to="/">WayRance</Link>
          </h1>
        </div>
        <div className="hidden sm:flex sm:items-center sm:justify-between gap-6">
          <h3 className="
          text-[#fff] cursor-pointer text-[16px] font-bold leading-none
          hover:text-yellow-500
          ">
            <Link to="/dashboard">Dashboard</Link>
          </h3>
          <h3 className="
          text-[#fff] text-[16px] font-bold leading-none
          hover:text-yellow-500
          ">
            <Link to="/disposer">Disposer</Link>
          </h3>
        </div>
        <div className="hidden  sm:flex">
          <ConnectWallet />
        </div>

        <div className="md:hidden  mt-3">
          <button className="text-white" onClick={toggleMenu}>
            {isOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed z-20 top-0 bg-[#040D12] 
         right-0 bottom-0 left-0 flex flex-col 
         items-center gap-6 justify-center">
          <button
            className="text-white absolute top-4 right-4"
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
