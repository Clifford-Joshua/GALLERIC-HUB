import styled from "styled-components";

const Title = () => {
  return (
    <Wrapper className="w-full md:w-[85%] lg:w-[55%]">
      <h2 className="text-white font-[600] lg:font-[500] text-[2rem]  md:text-[2.1rem] lg:text-[2.2rem] leading-[2.3rem] lg:leading-[2.8rem] ">
        The best free stock photos, royalty free images & videos shared by
        creators.
      </h2>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Title;
