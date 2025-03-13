import { Link } from "react-router-dom";
import BgIMage from "../../assets//Error.svg";
import styled from "styled-components";

const Error = () => {
  return (
    <Wrapper className="flex flex-col items-center justify-center gap-5 h-screen bg-gray-300">
      <img src={BgIMage} alt="Error image" />
      <h2 className="text-red-700 text-3xl capitalize">
        404 error Page Not Found
      </h2>
      <Link
        to={"/"}
        className="px-6 py-3 hover:bg-cyan-500 shadow-lg shadow-cyan-500/50 rounded-xl font-bold text-[1.3rem] border-2 border-cyan-300 capitalize cursor-pointer"
      >
        back to home
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* ==================================================== */
`;

export default Error;
