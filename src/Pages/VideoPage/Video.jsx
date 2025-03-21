import styled from "styled-components";
import { useSelector } from "react-redux";
import BodyNav from "../Shared/Nav Bar/BodyNav";
import Title from "../Shared/TitleContainer/Title";
import IntroContainer from "../Shared/IntroPage/IntroContainer";

import { PexelVideo, PexabayVideo } from "./VideoFolder/main";

const Video = () => {
  const { photos } = useSelector((store) => store.pexel);

  return (
    <Wrapper>
      <IntroContainer photo={photos[5]?.src?.original} />

      <BodyNav />
      <Title title={"pexel"} content={"videos"} />
      <PexelVideo />

      <Title title={"Pexabay"} content={"videos"} />
      <PexabayVideo />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* ======================================== */
`;

export default Video;
