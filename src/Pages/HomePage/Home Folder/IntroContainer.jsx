import styled from "styled-components";
import Bg from "../../../assets/BackGround.jpg";

const IntroContainer = () => {
  return (
    <Wrapper
      className={`w-full min-h-[70vh] p-8 flex justify-center items-center`}
    >
      BgImageContainer
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
