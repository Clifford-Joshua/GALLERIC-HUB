import styled from "styled-components";

const Spinner = () => {
  return (
    <Wrapper className="w-screen">
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-[150px] h-[150px] border-t-[0.8rem] border-cyan-400 rounded-full animate-spin  duration-[1000ms]"></div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* ================================================== */
`;

export default Spinner;
