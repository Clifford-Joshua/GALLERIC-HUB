import Home from "./Pages/HomePage/Home";
import Error from "./Pages/ErrorPage/Error";
import Login from "./Pages/LoginPage/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
