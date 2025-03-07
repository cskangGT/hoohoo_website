import i18next from 'i18next';
import React, {useState} from 'react';
import styled from 'styled-components';
import {theme} from '../../style';
import EarthMeraLogo from './components/EarthMeraLogo';
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
const LogoBox = styled.div`
  margin-bottom: ${theme.spacing['3xl']};
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

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const localizedTexts: any = i18next.t('Signup', {
    returnObjects: true,
  });
  const language = i18next.language;

  return (
    <Container>
      <LoginContainer>
        <LoginWrapperBox>
          <InnerBox>
            <LogoBox>
              <EarthMeraLogo size={70} />
            </LogoBox>
            <TitleText language={language}>{localizedTexts.title}</TitleText>
          </InnerBox>
          <LineDivider text={'Sign up with'} />
          <SocialLoginContainer>
            <SocialButton onClick={() => {}}>
              <GoogleLogo text={localizedTexts.signupWithGoogle} />
            </SocialButton>

            <SocialButton onClick={() => {}}>
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
            </SocialButton>

            <KakaoButton onClick={() => {}}>
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
          <TextInput
            placeholder={localizedTexts.email}
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <PasswordInput
            placeholder={localizedTexts.password}
            type={'text'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </LoginWrapperBox>
      </LoginContainer>
    </Container>
  );
};

export default Signup;
