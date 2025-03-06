import Title from "./Title";
import Search from "./Search";
import PropTypes from "prop-types";
import backgroundImage from "../../../assets/BackGround.jpg";
import styled from "styled-components";

const bgStyle = (Bg) => ({
  background: `linear-gradient(to left, #00000086, #0000008b, #0000006f), url(${Bg}) center/cover no-repeat`,
});

const IntroContainer = ({ photo }) => {
  return (
    <Wrapper
      className={`w-full min-h-[70vh] md:min-h-[40vh] lg:min-h-[90vh] p-4 flex flex-col gap-[2rem] justify-center items-center `}
      style={bgStyle(photo ? photo?.src?.original : backgroundImage)}
    >
      <Title />
      <Search />
    </Wrapper>
  );
};

IntroContainer.propTypes = {
  photo: PropTypes.shape({
    src: PropTypes.shape({
      original: PropTypes.string,
    }),
  }),
};

const Wrapper = styled.div`
  /* ======================================== */
  /* Mobile View */
`;

export default IntroContainer;
