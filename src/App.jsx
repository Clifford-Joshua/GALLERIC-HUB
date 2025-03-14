import Home from "./Pages/HomePage/Home";
import ScrollToTop from "./ScrollToTop";
import Error from "./Pages/ErrorPage/Error";
import Login from "./Pages/LoginPage/Login";
import Video from "./Pages/VideoPage/Video";
import ProtectedRoute from "./ProtectedRoute";
import AuthWrapper from "./Pages/AuthWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SharedPage from "./Pages/Shared/SharedPage";
import { Pexel, Unsplash, Pexabay } from "./Pages/Photos/main";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <AuthWrapper>
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
            <Route
              path="/unsplash-photo/:id"
              element={
                <ProtectedRoute>
                  <Unsplash />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pexabay-photo/:id"
              element={
                <ProtectedRoute>
                  <Pexabay />
                </ProtectedRoute>
              }
            />
            <Route path="/video" element={<Video />} />
          </Route>
          <Route path="*" element={<Error />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthWrapper>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
