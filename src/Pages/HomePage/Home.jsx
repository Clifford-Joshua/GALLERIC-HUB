import Photos from "./Home Folder/Photos";
import BodyNav from "../Shared/Nav Bar/BodyNav";
import Title from "../Shared/TitleContainer/Title";
import IntroContainer from "../Shared/IntroPage/IntroContainer";

import styled from "styled-components";
import { useSelector } from "react-redux";

const Home = () => {
  const { photos } = useSelector((store) => store.pexel);

  return (
    <Wrapper>
      <IntroContainer photo={photos[10]} />
      <BodyNav />
      <Title title={"pexel"} content={"photos"} />
      <Photos />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* ======================================== */
  /* Mobile View */
`;

export default Home;
