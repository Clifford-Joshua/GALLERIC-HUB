import styled from "styled-components";
import PropTypes from "prop-types";

const Title = ({ title, content }) => {
  return (
    <Wrapper>
      <h2 className="p-4 font-semibold text-2xl md:text-3xl lg:text-4xl lg:p-[1.5rem] capitalize">
        Free {title} Stock {content}
      </h2>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* ========================================== */
`;
Title.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Title;
