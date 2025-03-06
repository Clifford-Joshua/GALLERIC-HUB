import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";

import { setQuery } from "../../../Features/pexelSlice";

const Search = () => {
  const dispatch = useDispatch();
  const { query } = useSelector((store) => store.pexel);
  return (
    <Wrapper className="w-full md:w-[80%] lg:w-[55%]">
      <div className="bg-white flex justify-between items-center p-2 px-[2rem] rounded-lg text-gray-500 font-[700] text-[1.2rem] md:w-[95%] lg:w-[90%]">
        <input
          type="text"
          value={query}
          placeholder="Search For Free Photos "
          onChange={(e) => {
            dispatch(setQuery(e.target.value));
          }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
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
