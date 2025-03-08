import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { IoNotifications } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaUser, FaUserAltSlash } from "react-icons/fa";
import { IoNotificationsOffSharp } from "react-icons/io5";

const getProfile = () => {
  let savedProfileImg = localStorage.getItem("userProfile");
  return savedProfileImg ? savedProfileImg : "";
};

const Navbar = () => {
  const refContainer = useRef(null);
  const [scroll, setScroll] = useState(false);
  const [notification, setNotification] = useState(false);
  const [userProfile, setUserProfile] = useState(getProfile());

  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  console.log(user);

  const handleUpload = () => {
    refContainer.current.click();
  };

  window.addEventListener("scroll", () => {
    window.scrollY > 0 ? setScroll(true) : setScroll(false);
  });

  const isUser = isAuthenticated && user;

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      if (
        fileName.endsWith(".jpg") ||
        fileName.endsWith(".jpeg") ||
        fileName.endsWith(".png")
      ) {
        const file_Reader = new FileReader();
        file_Reader.onload = () => {
          const gottenImage = file_Reader.result;
          setUserProfile(gottenImage);
          localStorage.setItem("userProfile", gottenImage);
        };
        file_Reader.readAsDataURL(file);
        toast.success("Profile image uploaded successfully!");
      } else {
        setUserProfile("");
        toast.error(
          "Invalid file selected, only .jpg, .jpeg, or .png allowed."
        );
      }
    }
  };

  useEffect(() => {
    if (isUser) {
      toast.success("User Login Successfully");
    }
  }, [isUser]);

  return (
    <Wrapper>
      <nav
        className={`flex justify-between items-center p-4 w-full fixed ${
          scroll ? "bg-white" : "bg-transparent"
        } z-50`}
      >
        <Link to="/" className={`logo ${scroll ? "text-black" : "text-white"}`}>
          GALLERIC HUB{" "}
        </Link>
        <div className="flex  gap-2 sm:gap-5 items-center">
          <button
            className={`text-2xl sm:text-3xl  cursor-pointer ${
              notification
                ? "text-red-600"
                : scroll
                ? "text-black"
                : "text-white"
            }`}
            onClick={() => {
              setNotification(!notification);

              notification
                ? toast.error("Notification Is Off")
                : toast.success("Notification Is On");
            }}
          >
            {notification ? <IoNotificationsOffSharp /> : <IoNotifications />}
          </button>

          {isUser ? (
            <img
              src={(isUser && userProfile) || user.picture}
              alt={user.name}
              title="profile picture"
              className="w-[40px] h-[40px]  md:w-[50px] md:h-[50px]  rounded-full cursor-pointer"
            />
          ) : (
            <div
              title="profile picture"
              className="bg-blue-600 w-[40px] h-[40px]  md:w-[50px] md:h-[50px]  rounded-full text-white text-2xl md:text-2xl font-normal  font-sans flex justify-center items-center cursor-pointer"
            >
              U
            </div>
          )}

          <button
            className="w-[40px] h-[40px] bg-white rounded-2xl text-2xl flex justify-center items-center sm:hidden"
            onClick={handleUpload}
          >
            <MdOutlineFileUpload />
          </button>

          <div className="  cursor-pointer flex gap-4 items-center justify-center">
            {!isUser ? (
              <FaUser
                className={` text-[1.6rem] md:text-[2rem] ${
                  scroll ? "text-blue-700" : "text-white"
                }`}
                title="Login"
                onClick={loginWithRedirect}
              />
            ) : (
              <FaUserAltSlash
                className={`  text-[2rem] md:text-[2.4rem] ${
                  scroll ? "text-red-700" : "text-red-500"
                }`}
                title="LogOut"
                onClick={() => {
                  logout({ returnTo: window.location.origin });
                }}
              />
            )}
          </div>

          <button
            className={`hidden md:block ${
              !scroll ? "bg-white " : "bg-black text-white"
            }  rounded-2xl  p-3 md:px-[3.5rem] lg:py-[0.7rem] md:text-[1.2rem] lg:text-[1rem]  cursor-pointer hover:bg-gray-200 md:font-bold`}
            onClick={handleUpload}
          >
            Upload
          </button>

          <input
            type="file"
            name="file"
            ref={refContainer}
            className="hidden"
            onChange={onFileChange}
          />
        </div>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* ======================================== */
  /* Mobile View */
  .logo {
    cursor: pointer;
    font-weight: 900;
    font-size: 1.1rem;
    font-optical-sizing: auto;
    font-family: "Pacifico", serif;
  }

  .logo:hover {
    color: lightgray;
  }

  /* ============================================= */
  /* Ipad View */
  @media screen and (width >= 764px) {
    .logo {
      font-size: 1.6rem;
    }
  }
`;

export default Navbar;
