import Title from "./Title";
import Search from "./Search";
import styled from "styled-components";
import Bg from "../../../assets/BackGround.jpg";
const IntroContainer = () => {
  return (
    <Wrapper
      className={`w-full min-h-[70vh] md:min-h-[50vh] p-4 flex flex-col gap-[2rem] justify-center items-center `}
    >
      <Title />
      <Search />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* ======================================== */
  /* Mobile View */
  background: linear-gradient(to left, #00000086, #0000008b, #0000006f),
    url(${Bg}) center/cover no-repeat;
`;

export default IntroContainer;
