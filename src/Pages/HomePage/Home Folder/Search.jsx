import styled from "styled-components";
import { IoSearch } from "react-icons/io5";

const Search = () => {
  return (
    <Wrapper className="w-full md:w-[50%] lg:w-[40%]">
      <div className="bg-white flex justify-between items-center p-2 px-[2rem] rounded-lg text-gray-500 font-[700] text-[1.2rem]">
        <input
          type="text"
          placeholder="Search For Free Photos "
          className="w-[90%] border-none py-[0.3rem] focus:outline-none"
        />
        <IoSearch />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* ================================================== */
  div:has(input:focus) {
    border: 2px solid #000;
  }
`;

export default Search;
