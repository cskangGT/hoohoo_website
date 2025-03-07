import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import {useGoogleLogin} from '@react-oauth/google';
import i18next from 'i18next';
import React, {useState} from 'react';
import {IoEyeOffSharp, IoEyeSharp} from 'react-icons/io5';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Wrapper from '../../components/Wrapper/Wrapper';
import {theme} from '../../style';
import GoogleLogo from './components/GoogleLogo';
import LineDivider from './components/LineDivider';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white !important;
`;
const LoginContainer = styled.div`
  width: 100%;

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
  width: calc(100% - ${theme.spacing.xl} * 2);

  border-radius: 8px;
  padding: ${theme.spacing.xl};
`;
const TitleText = styled.h2`
  font-size: ${theme.fontSize.xl};
  line-height: 30px;
  font-weight: 700;
  color: ${theme.darkGray};
  margin-top: 0px;
  margin-bottom: ${theme.spacing.lg};
  font-family: Inter;
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
const TextFieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
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
  border-radius: 8px;
  border: 1px solid ${theme.gray};
  background-color: white;
  display: flex;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

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
  font-size: 0.875rem;
  font-weight: 600;
  font-family: Inter;
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
const KakaoButton = styled(SocialButton)`
  background-color: #fee500;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  width: 100%;
  border: none;
  &:hover {
    background-color: #f6dd00;
  }
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
  const localizedTexts: any = i18next.t('Login', {
    returnObjects: true,
  });
  const navigate = useNavigate();
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
    navigate('/signup');
    console.log('로그인 시도:', userId, password);
  };
  const handleAppleLogin = async () => {
    (window as any)?.AppleID?.auth?.init({
      clientId: 'earthmera.web',
      scope: 'email',
      redirectURI: 'https://www.earthmera.com/oauth/callback/apple',
      state: '1234567890',
      nonce: '1234567890',
      usePopup: true,
    });
    try {
      const res = await (window as any)?.AppleID?.auth?.signIn();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleKakaoLogin = () => {
    const REST_API_KEY = '3646b1cf0a0594f198c66529c902ff1d';
    const REDIRECT_URI = 'http://localhost:3000/oauth/kakao';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.location.href = link;
  };
  return (
    <Container>
      <Wrapper>
        <LoginContainer>
          <LoginWrapperBox>
            <InnerBox>
              <TitleText>{localizedTexts.title}</TitleText>
              <form onSubmit={handleLogin}>
                <TextFieldContainer>
                  <TextField
                    label={localizedTexts.email}
                    type="text"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                      },
                    }}
                  />
                  <FormControl
                    sx={{
                      width: '100%',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                      },
                    }}
                    variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      {localizedTexts.password}
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      label={localizedTexts.password}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword
                                ? 'hide the password'
                                : 'display the password'
                            }
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end">
                            {showPassword ? (
                              <IoEyeOffSharp size={20} color={theme.gray} />
                            ) : (
                              <IoEyeSharp size={20} color={theme.gray} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                  </FormControl>
                </TextFieldContainer>
                <LoginButton type="submit">{localizedTexts.title}</LoginButton>
                <ForgotPassword>{localizedTexts.forgotPassword}</ForgotPassword>
                <LineDivider text={'or'} />

                <SocialLoginContainer>
                  <SocialButton onClick={googleLogin}>
                    <GoogleLogo text={localizedTexts.continueWithGoogle} />
                  </SocialButton>

                  <SocialButton onClick={handleAppleLogin}>
                    <SocialInnerBox>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style={{marginRight: '8px'}}>
                        <path
                          d="M17.0349 11.0001C17.0202 9.41394 17.7569 8.19144 19.2429 7.27227C18.3509 5.95394 16.9569 5.23644 15.0969 5.12727C13.3329 5.02060 11.3969 6.18727 10.7969 6.18727C10.1569 6.18727 8.39694 5.18227 7.01694 5.18227C4.40694 5.22227 1.60694 7.28394 1.60694 11.4826C1.60694 12.6973 1.81694 13.9533 2.23694 15.2479C2.79694 16.9733 4.91694 21.0493 7.13694 20.9826C8.23694 20.9533 9.01694 20.1626 10.4969 20.1626C11.9369 20.1626 12.6569 20.9826 13.8969 20.9826C16.1369 20.9493 18.0569 17.2733 18.5769 15.5426C15.5169 14.0826 17.0349 11.0706 17.0349 11.0001V11.0001ZM14.3369 3.81394C15.5969 2.31394 15.4769 0.946602 15.4569 0.466602C14.3169 0.526602 13.0169 1.17227 12.2369 2.01394C11.3769 2.92227 10.8969 4.04227 10.9769 5.12727C12.2169 5.21394 13.3369 4.97227 14.3369 3.81394Z"
                          fill="#000000"
                        />
                      </svg>
                      <span>{localizedTexts.continueWithApple}</span>
                    </SocialInnerBox>
                  </SocialButton>

                  <KakaoButton onClick={handleKakaoLogin}>
                    <SocialInnerBox>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style={{marginRight: '8px'}}>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2.272C6.26 2.272 1.5 6.074 1.5 10.714c0 2.967 1.964 5.568 4.91 7.025-.213.786-.784 2.842-.897 3.285-.141.554.203.548.427.398.175-.118 2.79-1.89 3.91-2.657.706.101 1.426.153 2.15.153 5.74 0 10.5-3.802 10.5-8.204 0-4.64-4.76-8.442-10.5-8.442"
                          fill="#000000"
                        />
                      </svg>
                      <span>{localizedTexts.continueWithKakao}</span>
                    </SocialInnerBox>
                  </KakaoButton>
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
