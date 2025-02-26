import { Navbar, IntroContainer } from "./Home Folder";

import styled from "styled-components";

const Home = () => {
  return (
    <Wrapper>
      <Navbar />
      <IntroContainer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* ======================================== */
  /* Mobile View */
`;

export default Home;
