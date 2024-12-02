import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import styled from 'styled-components';
import Wrapper from '../../Component/Wrapper/Wrapper';
import {BgImage, theme} from '../../style';
const SectionContainer = styled.section`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  width: 100%;
  align-items: center;
  margin-top: 82px;
  @media screen and (max-width: 1100px) {
    height: auto;
  }
`;
const LoginContainer = styled.div`
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 310px;
`;

const Input = styled.input`
  padding: 5px;
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  height: 2.75rem;
`;
const HeaderBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HeaderText = styled.h1`
  font-size: 28px;
`;
const Label = styled.label`
  /* color: ${theme.white}; */
`;

const Button = styled.button`
  font-size: 20px;
  cursor: pointer;
  text-decoration: none;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  margin-top: 0.75rem;
  background-color: ${theme.mainNeon};
  text-align: center;
  max-width: 100%;
  padding: 10px 20px;
  border: none;
  outline: none;
  transition: background-color 0.3s;
  &:hover {
    background-color: darken(${theme.mainNeon}, 10%);
  }
`;

function AdminLogin() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');
  const [cookies, setCookie] = useCookies(['token', 'username']);
  const token: string = 'jisanpark';
  const [logIn, setLogIn] = useState<boolean>(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post('/api/login', { username, password });
    console.log('logIn', logIn);
    //   if (response.data && response.data.token) { // 만약 토큰이 응답에 있다면
    setCookie('token', token, {
      path: '/',
      maxAge: 3600,
      httpOnly: true,
      secure: true,
    }); // 60분 유지
    setCookie('username', username, {
      path: '/',
      maxAge: 3600,
    });
    setLogIn(true);
  };
  useEffect(() => {}, [logIn]);
  return (
    <BgImage>
      <Wrapper>
        <SectionContainer>
          <LoginContainer>
            <HeaderBox>
              {logIn ? (
                <>
                  <HeaderText>Hello {username},</HeaderText>
                </>
              ) : (
                <HeaderText>LOGIN</HeaderText>
              )}
            </HeaderBox>
            {!logIn && (
              <Form onSubmit={handleSubmit}>
                <Label>ID</Label>
                <Input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                {error && <p>{error}</p>}
                <Button type="submit">Login</Button>
              </Form>
            )}
          </LoginContainer>
        </SectionContainer>
      </Wrapper>
    </BgImage>
  );
}
export default AdminLogin;
