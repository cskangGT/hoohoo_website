import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import i18next from 'i18next';
import React, {useEffect, useState} from 'react';

import {useGoogleLogin} from '@react-oauth/google';
import {FaCheckCircle} from 'react-icons/fa';
import {IoEyeOffSharp, IoEyeSharp} from 'react-icons/io5';
import {useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {
  getAPIKey,
  redirectUri,
  sendAppleLogin,
  sendGoogleLogin,
} from '../../../api/login/auth';
import {checkEmail} from '../../../api/login/signup.api';
import {useSignup} from '../../../context/SignupContext';
import {useUserStore} from '../../../storage/userStore';
import {theme} from '../../../style';
import {isValidEmail, isValidPassword} from '../../../util/validation';
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
const LogoBox = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;
const InnerBox = styled.div`
  width: calc(100%);

  border-radius: 8px;
`;
const SocialLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;
const TextFieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
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

const TitleText = styled.h2<{language: string}>`
  font-size: ${theme.fontSize['3xl']};
  line-height: 30px;
  font-weight: 600;
  color: ${theme.darkGray};
  margin-top: 15px;
  margin-bottom: ${theme.spacing.lg};
  font-family: ${props => (props.language === 'ko' ? 'Inter' : 'Fredoka')};
`;

const LoginButton = styled.button<{inActive: boolean}>`
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
  opacity: ${props => (props.inActive ? 0.5 : 1)};
  pointer-events: ${props => (props.inActive ? 'none' : 'auto')};
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
const LinkBox = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: ${theme.spacing.sm};
  font-size: ${theme.fontSize.md};
  font-weight: 400;
  color: ${theme.inActiveGray};
`;
const ErrorText = styled.p`
  color: ${theme.red};
  font-size: ${theme.fontSize.rg};
  font-weight: 400;
  margin: 0px;
  margin-left: ${theme.spacing.rg};
`;
const Signup = () => {
  const navigate = useNavigate();
  const {updateSignupData} = useSignup();
  const {state} = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    alreadyExists: false,
    inValidPassword: false,
    inValidEmail: false,
  });
  const localizedTexts: any = i18next.t('Signup', {
    returnObjects: true,
  });
  const usernameTag = state?.link;
  useEffect(() => {
    console.log('usernameTag', usernameTag);
    if (usernameTag) {
      sessionStorage.setItem('storedNameTag', usernameTag);
    } else {
      navigate('/pre-signup');
    }
  }, [usernameTag]);
  const language = i18next.language;

  const handleGoogleLogin = useGoogleLogin({
    redirect_uri: 'postmessage',

    onSuccess: async tokenResponse => {
      const response = await sendGoogleLogin(tokenResponse.code, usernameTag);
      console.log('response', response);

      if (response.result) {
        sessionStorage.removeItem('storedNameTag');
        getAPIKey();
        setUser(response.data.user);
        if (response.data?.user?.isNeedsQuestionnaire) {
          navigate('/setup/select-goal');
        } else {
          navigate(`/zigu/${response.data.user.nameTag}`);
        }
      } else {
        if (response.status === 409) {
          alert(localizedTexts.errorText.alreadyAccount);
          sessionStorage.removeItem('storedNameTag');
          navigate('/pre-signup');
        } else {
          alert(localizedTexts.errorText.errorOccured);
          sessionStorage.removeItem('storedNameTag');
          navigate('/pre-signup');
        }
      }
    },
    onError: error => console.log(error),
    flow: 'auth-code',
  });

  const handleAppleLogin = async () => {
    (window as any)?.AppleID?.auth?.init({
      clientId: 'earthmera.web',
      scope: 'email',
      redirectURI: `${redirectUri}/oauth/callback/apple`,
      state: '1234567890',
      nonce: '1234567890',
      usePopup: true,
    });
    try {
      const res = await (window as any)?.AppleID?.auth?.signIn();
      console.log(res);
      if (res?.authorization?.id_token && res?.authorization?.code) {
        const response = await sendAppleLogin(
          res.authorization.code,
          res.authorization.id_token,
          usernameTag,
        );
        console.log('response', response);

        if (response.result) {
          setUser(response.data.user);
          sessionStorage.removeItem('storedNameTag');
          getAPIKey();
          if (response.data?.user?.isNeedsQuestionnaire) {
            navigate('/setup/select-goal', {replace: true});
          } else {
            navigate(`/zigu/${response.data.user.nameTag}`, {replace: true});
          }
        } else {
          if (response.status === 409) {
            alert(localizedTexts.errorText.alreadyAccount);
            sessionStorage.removeItem('storedNameTag');
            navigate('/login');
          } else {
            alert(localizedTexts.errorText.errorOccured);
            sessionStorage.removeItem('storedNameTag');
            navigate('/pre-signup');
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
  const handleSignup = async () => {
    console.log('signup');
    setError({
      alreadyExists: false,
      inValidEmail: false,
      inValidPassword: false,
    });
    if (!isValidEmail(email)) {
      setError({...error, inValidEmail: true});
      return;
    }
    if (!isValidPassword(password)) {
      setError({...error, inValidPassword: true});
      return;
    }
    const response = await checkEmail(email, false);
    if (response.result) {
      if (response.data.isRegistered) {
        setError({...error, alreadyExists: true});
        return;
      }

      updateSignupData({email, password, nameTag: usernameTag});

      navigate('/signup/verify-email', {state: {email}});
    }
  };
  return (
    <Container>
      <LoginContainer>
        <LoginWrapperBox>
          <InnerBox>
            <LogoBox>
              <EarthMeraLogo size={100} />
            </LogoBox>
            {usernameTag && (
              <LinkBox>
                <FaCheckCircle size={20} color={theme.darkGray} />{' '}
                {localizedTexts.linkAvailable[0] +
                  usernameTag +
                  localizedTexts.linkAvailable[1]}
              </LinkBox>
            )}
            <TitleText language={language}>{localizedTexts.title}</TitleText>
          </InnerBox>
          <LineDivider text={localizedTexts.signupLiner} />
          <SocialLoginContainer>
            <SocialButton onClick={handleGoogleLogin}>
              <GoogleLogo text={localizedTexts.signupWithGoogle} />
            </SocialButton>

            {/* <SocialButton onClick={handleAppleLogin}>
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
                <span>{localizedTexts.signupWithApple}</span>
              </SocialInnerBox>
            </SocialButton> */}

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
                <span>{localizedTexts.signupWithKakao}</span>
              </SocialInnerBox>
            </KakaoButton>
          </SocialLoginContainer>
          <LineDivider text={localizedTexts.emailLiner} />
          <TextFieldContainer>
            <TextField
              label={localizedTexts.email}
              type="text"
              value={email}
              inputMode="email"
              onChange={e => setEmail(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
            {error.alreadyExists && (
              <ErrorText>{localizedTexts.errorText.alreadyExists}</ErrorText>
            )}
            {error.inValidEmail && (
              <ErrorText>{localizedTexts.errorText.invalidEmail}</ErrorText>
            )}
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
              />
            </FormControl>
            {error.inValidPassword && (
              <ErrorText>{localizedTexts.errorText.invalidPassword}</ErrorText>
            )}
          </TextFieldContainer>
          <LoginButton
            onClick={handleSignup}
            disabled={email.length === 0 || password.length === 0}
            inActive={email.length === 0 || password.length === 0}>
            {localizedTexts.continue}
          </LoginButton>
        </LoginWrapperBox>
      </LoginContainer>
    </Container>
  );
};

export default Signup;
