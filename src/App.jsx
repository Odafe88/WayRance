import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Disposer from "./pages/Disposer";
import AddWasteModal from "./components/modals/AddWasteModal";



export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index  element={<Home />} />
        <Route index path="/dashboard" element={<Dashboard />} />
        <Route index path="/disposer" element={<Disposer />} />
        <Route path="/disposer/record-waste" element={<AddWasteModal />} />
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