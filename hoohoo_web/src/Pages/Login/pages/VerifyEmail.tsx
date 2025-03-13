import React, {useState} from 'react';

import {CircularProgress, TextField} from '@mui/material';
import i18next from 'i18next';
import {useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {
  checkEmail,
  sendVerifyEmailCode,
  signupProfile,
} from '../../../api/login/signup.api';
import Wrapper from '../../../components/Wrapper/Wrapper';
import {useSignup} from '../../../context/SignupContext';
import {useUserStore} from '../../../storage/userStore';
import {theme} from '../../../style';
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white !important;
`;
const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const WrapperBox = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 500px) {
    width: calc(100% - 20px);
    padding: 20px 10px;
  }
`;
const ContinueButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.md};
  border-radius: 8px;
  color: ${theme.white};
  background-color: ${theme.darkGray};
  display: flex;
  font-weight: 500;
  font-size: ${theme.fontSize.md};
  font-family: Inter;
  justify-content: center;
  align-items: center;
  margin-top: ${theme.spacing.md};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    box-shadow:
      0 1px 2px rgba(60, 64, 67, 0.3),
      0 1px 3px 1px rgba(60, 64, 67, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
const ResendButton = styled.button<{language: string}>`
  font-size: ${theme.fontSize.md};
  line-height: 20px;
  font-weight: 300;
  color: ${theme.darkGray};
  margin-top: 0px;
  margin-bottom: ${theme.spacing.xl};
  font-family: ${props => (props.language === 'ko' ? 'Inter' : 'Fredoka')};
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  padding: ${theme.spacing.lg};
`;
const TitleText = styled.h2<{language: string}>`
  font-size: ${theme.fontSize['3xl']};
  line-height: 30px;
  font-weight: 600;
  color: ${theme.darkGray};
  margin-top: 0px;
  margin-bottom: ${theme.spacing.lg};
  font-family: ${props => (props.language === 'ko' ? 'Inter' : 'Fredoka')};
`;
const DescriptionText = styled.p<{language: string}>`
  font-size: ${theme.fontSize.md};
  line-height: 20px;
  font-weight: 300;
  color: ${theme.inActiveGray};
  margin-top: 0px;
  margin-bottom: ${theme.spacing['3xl']};
  font-family: ${props => (props.language === 'ko' ? 'Inter' : 'Fredoka')};
`;
const ErrorText = styled.p`
  color: ${theme.red};
  font-size: ${theme.fontSize.sm};
  line-height: 20px;
  font-weight: 300;
  margin-top: ${theme.spacing.sm};
  margin-bottom: 0px;
  width: 100%;
  text-align: left;
  font-family: Inter;
`;
function VerifyEmail() {
  const {signupData} = useSignup();
  const navigate = useNavigate();
  const {setUser} = useUserStore();
  const {state} = useLocation();
  const email = state?.email;
  const localizedTexts: any = i18next.t('VerifyEmail', {
    returnObjects: true,
  });
  const [isError, setIsError] = useState<boolean>(true);
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resent, setResent] = useState<boolean>(false);
  const handleResend = async () => {
    const res = await checkEmail(email, false);
    if (res.result) {
      setResent(true);
    }
  };
  const handleVerify = async () => {
    setIsLoading(true);
    // send verification code to server
    const response = await sendVerifyEmailCode(email, code);
    if (response.data?.verified) {
      // login 처리
      if (!signupData.nameTag) {
        alert('No user name tag');
        return;
      } else if (!signupData.password) {
        alert('No password');
        return;
      } else if (!email) {
        alert('No email');
        return;
      }
      const res = await signupProfile(
        email,
        signupData.password,
        signupData.nameTag,
      );
      console.log('res', res);

      if (res.result) {
        // user 정보 저장
        setUser(res.data.user);
        if (res.data?.user?.isNeedsQuestionnaire) {
          navigate('/setup/select-goal');
        } else {
          navigate(`/zigu/${res.data.user.nameTag}`);
        }
      }
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  };
  const language = i18next.language;
  return (
    <Container>
      <Wrapper>
        <InnerWrapper>
          <WrapperBox>
            <TitleText language={language}>{localizedTexts.title}</TitleText>
            <DescriptionText language={language}>
              {localizedTexts.description[0]}
              {email}
              {localizedTexts.description[1]}
            </DescriptionText>
            <TextField
              label={localizedTexts.email}
              type="text"
              placeholder={localizedTexts.placeholder}
              sx={{width: '100%'}}
              value={code}
              onChange={e => setCode(e.target.value)}
              required
              inputMode="text"
              autoFocus
            />
            {isError && <ErrorText>{localizedTexts.invalidCode}</ErrorText>}
            <ContinueButton
              onClick={handleVerify}
              disabled={isLoading || code.length === 0}>
              {isLoading ? (
                <CircularProgress size={20} />
              ) : (
                localizedTexts.continue
              )}
            </ContinueButton>
            <ResendButton language={language} onClick={handleResend}>
              {resent ? localizedTexts.resent : localizedTexts.resend}
            </ResendButton>
          </WrapperBox>
        </InnerWrapper>
      </Wrapper>
    </Container>
  );
}

export default VerifyEmail;
