import { Photos, UnsplashPhoto, Pexabay } from "./Home Folder/main";
import BodyNav from "../Shared/Nav Bar/BodyNav";
import Title from "../Shared/TitleContainer/Title";
import IntroContainer from "../Shared/IntroPage/IntroContainer";

import styled from "styled-components";
import { useSelector } from "react-redux";

const Home = () => {
  const { photos } = useSelector((store) => store.pexel);

  return (
    <Wrapper>
      <IntroContainer photo={photos[10]?.src?.original} />
      <BodyNav />
      <Title title={"pexel"} content={"photos"} />
      <Photos />

      <Title title={"Unsplash"} content={"photos"} />
      <UnsplashPhoto />

      <Title title={"Pexabay"} content={"photos"} />
      <Pexabay />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* ======================================== */
  /* Mobile View */
`;

export default Home;
