import styled from "styled-components";
import login from "../../assets/login.svg";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Wrapper className="w-full h-screen flex flex-col items-center justify-center gap-9">
      <img src={login} alt="Login illustration" />
      <button
        className="capitalize p-2  hover:text-white rounded-lg font-bold cursor-pointer text-[1.3rem] border border-blue-500 hover:bg-cyan-500 shadow-lg shadow-cyan-500/50"
        onClick={loginWithRedirect}
      >
        Login/Signup
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* ============================================================ */
  /* Mobile View */
`;

export default Login;
