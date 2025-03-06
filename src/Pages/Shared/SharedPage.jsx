import Navbar from "./Nav Bar/Navbar";
import { Outlet } from "react-router-dom";
const SharedPage = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default SharedPage;
