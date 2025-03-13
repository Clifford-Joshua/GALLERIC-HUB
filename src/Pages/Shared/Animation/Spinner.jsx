import styled from "styled-components";

const Spinner = () => {
  return (
    <Wrapper>
      <div type="button" className="bg-indigo-500 ..." disabled>
        <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>
        Processing…
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* ================================================== */
`;

export default Spinner;
