import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";

const Navbar = () => {
  return (
    <Wrapper>
      <nav className="flex justify-between items-center p-4 w-full fixed">
        <Link to="/" className="logo">
          GALLERIC HUB{" "}
        </Link>
        <div className="flex justify-evenly">
          <button>
            <IoNotifications />
          </button>
          <div className="">C</div>
          <button>
            <MdOutlineFileUpload />
          </button>
          <button className="">Upload</button>
        </div>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* ======================================== */
  /* Mobile View */
  .logo {
    color: #fff;
    cursor: pointer;
    font-weight: 900;
    font-size: 1.1rem;
    font-optical-sizing: auto;
    font-family: "Pacifico", serif;
  }

  .logo:hover {
    color: lightgray;
  }
`;

export default Navbar;
