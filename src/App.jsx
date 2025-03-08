import Home from "./Pages/HomePage/Home";
import Pexel from "./Pages/Photos/Pexel";
import Error from "./Pages/ErrorPage/Error";
import Login from "./Pages/LoginPage/Login";
import Video from "./Pages/VideoPage/Video";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SharedPage from "./Pages/Shared/SharedPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedPage />}>
          <Route index element={<Home />} />
          <Route
            path="/pexel-photo/:id"
            element={
              <ProtectedRoute>
                <Pexel />
              </ProtectedRoute>
            }
          />
          <Route path="/video" element={<Video />} />
        </Route>
        <Route path="*" element={<Error />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
