import styled from "styled-components";
import { NavLink } from "react-router-dom";

const BodyNav = () => {
  return (
    <Wrapper className="w-full lg:p-[1rem]">
      <div className="flex justify-center items-center gap-4 p-4 capitalize font-bold lg:gap-8">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `${
              isActive ? "bg-black text-white" : "bg-white text-black"
            } p-4 rounded-xl shadow-xl`
          }
        >
          home
        </NavLink>
        <NavLink
          to={"/video"}
          className={({ isActive }) =>
            `${
              isActive ? "bg-black text-white" : "bg-white text-black"
            } p-3 rounded-xl shadow-xl`
          }
        >
          video
        </NavLink>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default BodyNav;
