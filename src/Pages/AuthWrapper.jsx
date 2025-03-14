import PropTypes from "prop-types";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "./Shared/Animation/Spinner";

const AuthWrapper = ({ children }) => {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return (
      <Wrapper className="w-full h-screen flex items-center justify-center">
        <Spinner />;
      </Wrapper>
    );
  }
  if (error) {
    return (
      <Wrapper>
        <h1 className="font-bold text-red-600 text-2xl">{error.message} </h1>
      </Wrapper>
    );
  }

  return <>{children}</>;
};
AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

const Wrapper = styled.div`
  /* ============================================= */
`;

export default AuthWrapper;
