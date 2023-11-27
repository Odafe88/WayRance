import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Disposer from "./pages/Disposer";
import Admin from "./pages/Admin";
import AddWaste from "./pages/AddWaste";
import PayDisposer from "./pages/PayDisposer.jsx";

import { useDispatch } from "react-redux";

import { useContractCall } from "./hooks/useContractRead.js";
import { useAccount } from "wagmi";

import { setRegisteredUser, setCurrentUser } from "./redux/user/user_actions.js";

export default function App() {

  const {address} = useAccount()
  const resp = useContractCall("getAdminAddress");
  const adMinAddress = resp;
  const dispatch = useDispatch();

  if (address == adMinAddress) {
    dispatch(setCurrentUser("admin"))
  } else {
    dispatch(setCurrentUser("disposer"))
  }

  

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route index path="/admin" element={<Admin />} />
        <Route index path="/admin/pay_disposer" element={<PayDisposer />} />
        <Route index path="/dashboard" element={<Dashboard />} />
        <Route index path="/disposer" element={<Disposer />} />
        <Route path="/disposer/record-waste" element={<AddWaste />} />
      </Route>
    )
  );

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

const Root = () => {
  return (
    <div>
      <Navbar  />
      <div >
        <Outlet />
      </div>
    </div>
  );
};