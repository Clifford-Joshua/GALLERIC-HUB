import styled from "styled-components";
import BodyNav from "../Shared/Nav Bar/BodyNav";
import Title from "../Shared/TitleContainer/Title";
import IntroContainer from "../Shared/IntroPage/IntroContainer";

const Video = () => {
  return (
    <Wrapper>
      <IntroContainer />
      <BodyNav />
      <Title title={"pexel"} content={"video"} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* ======================================== */
`;

export default Video;
