import React, { useState } from "react";
import { styled } from "styled-components";
import { GoogleSignIn, UserSignIn } from "../api/ApiCalls";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/UserSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;
const Title = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.text};
`;
const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
  color: ${({ theme }) => theme.text};
`;
const Input = styled.input`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  outline: none;
  padding: 10px;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  font-weight: 500;
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;
const Links = styled.div`
  margin-left: 50px;
`;
const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogIn = (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      UserSignIn(email, password).then((res) => {
        localStorage.setItem('token', res.authToken)
        dispatch(loginSuccess(res.data));
      });
    } catch (error) {
      dispatch(loginFailure());
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user)
        GoogleSignIn(
          result.user.displayName,
          result.user.email,
          result.user.photoURL
        )
        .then((res) => {
          dispatch(loginSuccess(res.data));
          localStorage.setItem('token', res.authToken)
        })
      })
      .catch((err) => {
        dispatch(loginFailure());
      });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>to continue to S Tube</SubTitle>
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogIn}>Sign in</Button>
        <Title>Or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Title>Or</Title>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignUp}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
