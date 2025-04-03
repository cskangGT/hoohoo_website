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
import React, {useEffect, useState} from 'react';
import {IoEyeOffSharp, IoEyeSharp} from 'react-icons/io5';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {
  getAPIKey,
  redirectUri,
  sendAppleLogin,
  sendGoogleLogin,
  validateLogin,
  validateSession,
} from '../../../api/login/auth';
import {useLanguage} from '../../../components/hooks/LanguageContext';
import Wrapper from '../../../components/Wrapper/Wrapper';
import {useUserStore} from '../../../storage/userStore';
import {theme} from '../../../style';
import {isValidEmail} from '../../../util/validation';
import EarthMeraLogo from '../components/EarthMeraLogo';
import GoogleLogo from '../components/GoogleLogo';
import LineDivider from '../components/LineDivider';

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
const ErrorText = styled.p`
  color: ${theme.red};
  font-size: ${theme.fontSize.rg};
  font-weight: 400;
  margin: 0px;
  margin-left: ${theme.spacing.rg};
`;
const TitleText = styled.h2<{language: string}>`
  font-size: ${theme.fontSize['3xl']};
  line-height: 30px;
  font-weight: 600;
  color: ${theme.darkGray};
  text-align: center;
  margin-top: 0px;
  margin-bottom: ${theme.spacing.rg};
  font-family: ${props => (props.language === 'ko' ? 'Inter' : 'Fredoka')};
`;
const NewUserText = styled.h4<{language: string}>`
  font-size: ${theme.fontSize.rg};
  color: ${theme.inActiveGray};
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
  font-family: ${props => (props.language === 'ko' ? 'Inter' : 'Fredoka')};
  font-weight: 400;
`;
const SignupText = styled.span`
  cursor: pointer;
  text-decoration: underline;
`;
const TextFieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
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

const LogoBox = styled.div`
  margin-bottom: ${theme.spacing['xl']};
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
`;
const LoginButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.md};
  background-color: ${theme.darkGray};
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
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ForgotPasswordButton = styled.button`
  text-align: center;
  margin: 0px;
  padding: 0px;

  font-size: ${theme.fontSize.rg};
  color: ${theme.inActiveGray};
  border: none;
  background-color: transparent;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
const Login = () => {
  const localizedTexts: any = i18next.t('Login', {
    returnObjects: true,
  });
  const {language} = useLanguage();

  const {setUser, user, isAuthenticated} = useUserStore();

  const navigateNameTag = (nameTag: string) => {
    const redirectAfterAuth = sessionStorage.getItem('redirectAfterAuth');
    if (redirectAfterAuth) {
      sessionStorage.removeItem('redirectAfterAuth');
      navigate(redirectAfterAuth, {replace: true});
    } else {
      navigate(`/${nameTag}`, {replace: true});
    }
  };
  const checkSession = async () => {
    const response = await validateSession();
    if (response.result) {
      console.log('response.data', response.data);
      if (response.data.user?.nameTag) {
        setUser(response.data.user);
        if (response.data?.user?.isNeedsQuestionnaire) {
          navigate('/setup/select-goal');
        } else {
          navigateNameTag(response.data.user.nameTag);
        }
      }
    } else {
      // logoutProfile();
      // toast.error(localizedTexts.sessionExpired);
    }
  };
  useEffect(() => {
    if (user?.nameTag && isAuthenticated) {
      console.log('user', user);
      navigateNameTag(user.nameTag);
    } else {
      checkSession();
    }
  }, []);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    invalidEmail: false,
    wrongPassword: false,
  });

  const handleGoogleLogin = useGoogleLogin({
    redirect_uri: 'postmessage',
    onSuccess: async tokenResponse => {
      const response = await sendGoogleLogin(tokenResponse.code);
      if (response.result) {
        getAPIKey();
        console.log('response.data', response.data);

        setUser(response.data.user);
        if (response.data?.user?.isNeedsQuestionnaire) {
          navigate('/setup/select-goal');
        } else {
          navigateNameTag(response.data.user.nameTag);
        }
      } else {
        if (response.status === 400) {
          alert(localizedTexts.errorText.noAccount);
          navigate('/pre-signup');
        } else if (response.status === 409) {
          alert(localizedTexts.errorText.anotherMethod);
        } else {
          alert(localizedTexts.errorText.errorOccured);
        }
      }
    },

    flow: 'auth-code',
  });
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직 구현

    if (email.length === 0 || password.length === 0) {
      return;
    }
    if (!isValidEmail(email)) {
      setError({...error, invalidEmail: true});
      return;
    }
    const response = await validateLogin(email, password);
    if (response.result) {
      getAPIKey();
      setUser(response.data.user);
      if (response.data?.user?.isNeedsQuestionnaire) {
        navigate('/setup/select-goal');
      } else {
        navigateNameTag(response.data.user.nameTag);
      }
    } else {
      if (response.status === 400) {
        setError({...error, wrongPassword: true});
      } else if (response.status === 409) {
        alert(localizedTexts.errorText.anotherMethod);
      } else {
        alert(localizedTexts.errorText.errorOccured);
      }
    }
  };
  const handleAppleLogin = async () => {
    (window as any)?.AppleID?.auth?.init({
      clientId: 'earthmera.web',
      scope: 'email',
      redirectURI: `${window.location.origin}/oauth/callback/apple`,
      state: '1234567890',
      nonce: '1234567890',
      usePopup: true,
    });
    try {
      const res = await (window as any)?.AppleID?.auth?.signIn();

      if (res?.authorization?.id_token && res?.authorization?.code) {
        const response = await sendAppleLogin(
          res.authorization.code,
          res.authorization.id_token,
        );
        console.log('response', response);
        if (response.result) {
          setUser(response.data.user);
          getAPIKey();
          if (response.data?.user?.isNeedsQuestionnaire) {
            navigate('/setup/select-goal', {replace: true});
          } else {
            navigateNameTag(response.data.user.nameTag);
          }
        } else {
          if (response.status === 400) {
            alert(localizedTexts.errorText.noAccount);
            navigate('/pre-signup');
          } else if (response.status === 409) {
            alert(localizedTexts.errorText.anotherMethod);
          } else {
            alert(localizedTexts.errorText.errorOccured);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleKakaoLogin = () => {
    const REST_API_KEY = '3646b1cf0a0594f198c66529c902ff1d';
    const REDIRECT_URI = `${redirectUri}/oauth/kakao`;
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.location.href = link;
  };

  return (
    <Container>
      <Wrapper>
        <LoginContainer>
          <LoginWrapperBox>
            <InnerBox>
              <LogoBox onClick={() => navigate('/')}>
                <EarthMeraLogo size={70} />
              </LogoBox>
              <TitleText language={language}>{localizedTexts.title}</TitleText>
              <NewUserText language={language}>
                {localizedTexts.new}
                <SignupText onClick={() => navigate('/signup')}>
                  {localizedTexts.signup}
                </SignupText>
              </NewUserText>
              <form onSubmit={handleLogin}>
                <TextFieldContainer>
                  <TextField
                    label={localizedTexts.email}
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                {error.wrongPassword && (
                  <ErrorText>
                    {localizedTexts.errorText.wrongPassword}
                  </ErrorText>
                )}
                {error.invalidEmail && (
                  <ErrorText>{localizedTexts.errorText.invalidEmail}</ErrorText>
                )}
                <LoginButton type="submit">{localizedTexts.login}</LoginButton>

                <ForgotPassword>
                  <ForgotPasswordButton onClick={() => {}}>
                    {localizedTexts.forgotPassword}
                  </ForgotPasswordButton>
                </ForgotPassword>
                <LineDivider text={'or'} />

                <SocialLoginContainer>
                  <SocialButton onClick={handleGoogleLogin}>
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
