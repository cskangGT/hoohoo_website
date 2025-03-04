import {useGoogleLogin} from '@react-oauth/google';
import React, {useState} from 'react';
import {IoEyeOffSharp, IoEyeSharp} from 'react-icons/io5';
import styled from 'styled-components';
import Wrapper from '../../components/Wrapper/Wrapper';
import {theme} from '../../style';
import GoogleLogo from './components/GoogleLogo';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 82px;
  background-color: #f2f2f7 !important;
`;
const LoginContainer = styled.div`
  width: 100%;

  height: 800px;
  display: flex;
  justify-content: center;
`;
const LoginWrapperBox = styled.div`
  margin-top: 64px;
  width: 400px;
  display: block;
  @media screen and (max-width: 500px) {
    width: calc(100% - 20px);
    padding: 20px 10px;
  }
`;
const InnerBox = styled.div`
  width: 100%;

  background-color: white;
  border-radius: 8px;
  padding: ${theme.spacing.xl};
  box-shadow: 
    /* 외부 그림자 */
    0px 4px 8px 0px rgba(0, 0, 0, 0.15),
    /* 내부 그림자 - 위쪽과 왼쪽은 밝게 */ inset 2px 2px 5px 0px
      rgba(255, 255, 255, 0.3),
    /* 내부 그림자 - 아래쪽과 오른쪽은 어둡게 */ inset -2px -2px 5px 0px
      rgba(0, 0, 0, 0.1);
`;
const TitleText = styled.h2`
  font-size: ${theme.fontSize.xl};
  line-height: 30px;
  font-weight: 700;
  color: ${theme.darkGray};
  margin-top: 0px;
  margin-bottom: ${theme.spacing.lg};
  /* font-family: Inter; */
`;
const TextInput = styled.input`
  width: calc(100% - ${theme.spacing.md} * 2);
  padding: ${theme.spacing.md};
  border-radius: 4px;
  border: 1px solid ${theme.gray};
  margin-bottom: ${theme.spacing.md};
  font-size: ${theme.fontSize.md};
`;
const PasswordInput = styled.input`
  width: calc(100% - ${theme.spacing.md} * 2);
  padding: ${theme.spacing.md};
  border-radius: 4px;
  border: 1px solid ${theme.gray};

  font-size: ${theme.fontSize.md};
`;
const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;

  justify-content: center;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;
const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${theme.spacing.lg} 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid rgba(13, 12, 34, 0.05);
  }

  span {
    margin: 0 ${theme.spacing.sm};
    color: #6e6d7a;
    opacity: 0.5;
    font-size: ${theme.fontSize.sm};
  }
`;
const SocialLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const SocialButton = styled.a`
  width: 100%;
  height: 48px;

  border: 1px solid ${theme.gray};
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: 8px;
  &:hover {
    box-shadow:
      0 1px 2px rgba(60, 64, 67, 0.3),
      0 1px 3px 1px rgba(60, 64, 67, 0.15);
  }
`;
const SocialInnerBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EyeIcon = styled.div`
  position: absolute;
  right: ${theme.spacing.md};
  height: 20px;
  width: 20px;
  cursor: pointer;

  color: ${theme.gray};
`;

const LoginButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.md};
  background-color: ${theme.green};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: ${theme.fontSize.md};
  font-weight: 600;
  cursor: pointer;
  margin-top: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const ForgotPassword = styled.div`
  text-align: center;
  margin-top: ${theme.spacing.sm};
  font-size: ${theme.fontSize.sm};
  color: ${theme.blue};
  cursor: pointer;
  margin-bottom: ${theme.spacing.md};
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const googleLogin = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
    onError: error => console.log(error),
    flow: 'auth-code',
  });
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직 구현
    console.log('로그인 시도:', userId, password);
  };

  return (
    <Container>
      <Wrapper>
        <LoginContainer>
          <LoginWrapperBox>
            <InnerBox>
              <TitleText>로그인</TitleText>
              <form onSubmit={handleLogin}>
                <TextInput
                  placeholder="아이디"
                  type="text"
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
                  required
                />
                <PasswordContainer>
                  <PasswordInput
                    placeholder="비밀번호"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <EyeIcon onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <IoEyeSharp size={20} color={theme.gray} />
                    ) : (
                      <IoEyeOffSharp size={20} color={theme.gray} />
                    )}
                  </EyeIcon>
                </PasswordContainer>
                <LoginButton type="submit">로그인</LoginButton>
                <ForgotPassword>비밀번호를 잊으셨나요?</ForgotPassword>
                <Divider>
                  <span>Or</span>
                </Divider>

                <SocialLoginContainer>
                  <SocialButton onClick={googleLogin}>
                    <GoogleLogo text="Continue with Google" />
                  </SocialButton>
                  <SocialButton>
                    <img
                      src="/images/kakao.png"
                      alt="카카오 로그인"
                      width="24"
                      height="24"
                    />
                  </SocialButton>
                  <SocialButton>
                    <img
                      src="/images/naver.png"
                      alt="네이버 로그인"
                      width="24"
                      height="24"
                    />
                  </SocialButton>
                </SocialLoginContainer>
              </form>
            </InnerBox>
          </LoginWrapperBox>
        </LoginContainer>
      </Wrapper>
    </Container>
  );
};

export default Login;
