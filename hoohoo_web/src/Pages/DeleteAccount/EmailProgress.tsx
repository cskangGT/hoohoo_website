import i18next from 'i18next';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {lookupEmail} from '../../api/deleteAcc';
import {theme} from '../../style';
import {throttle} from '../../util/throttle';

const InfoHintText = styled.p`
  font-size: 16px;
  width: 100%;
  text-align: center;
  padding: 10px 0px;
  color: ${theme.gray};
  @media screen and (max-width: 800px) {
    padding: 6px 0px;
    font-size: 14px;
  }
  @media screen and (max-width: 600px) {
    padding: 4px 0px;
    font-size: 12px;
  }
`;
const InfoErrorText = styled.p`
  font-size: 16px;
  width: 100%;
  text-align: center;
  padding: 10px 0px;
  color: ${theme.red};
  @media screen and (max-width: 800px) {
    padding: 6px 0px;
    font-size: 12px;
  }
  @media screen and (max-width: 600px) {
    padding: 4px 0px;
    font-size: 10px;
  }
`;
export const EmailInput = styled.input`
  border-radius: 10px;
  border-color: ${theme.white};
  width: 70%;
  height: 55px;
  font-size: 20px;
  color: ${theme.white};
  padding: 10px;
  background-color: rgba(79, 79, 79, 0.4);
  outline: none;
  border-width: 1px;
  box-shadow: 0px 4px 20px 0px transparent;
  transition:
    0.3s background-color ease-in-out,
    0.3s box-shadow ease-in-out,
    0.1s padding ease-in-out;
  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
  &:focus {
    border-color: #21ff37;
  }
  @media screen and (max-width: 800px) {
    font-size: 18px;
    height: 50px;
  }
  @media screen and (max-width: 600px) {
    font-size: 16px;
    height: 45px;
  }
  @media screen and (max-width: 400px) {
    font-size: 16px;
    height: 40px;
  }
`;

export const GreenLongNextButton = styled.a<{unable: boolean}>`
  padding: 10px 20px;
  margin: 10px 10px;
  margin-top: 60px;
  width: 70%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 40px;
  background-color: ${props => (props.unable ? '#054317' : '#0fb83f')};
  border-radius: 10px;
  color: ${props => (props.unable ? '#8b8b8b' : theme.white)};
  text-decoration: none;
  text-align: center;
  font-family: Fredoka;
  align-items: center;
  justify-content: center;
`;
type Props = {
  setDeleteAccProgress: React.Dispatch<React.SetStateAction<number>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  email: string;
};
function EmailProgress({setDeleteAccProgress, email, setEmail}: Props) {
  const data: any = i18next.t('ManageAccModal', {returnObjects: true});
  const [emailError, setEmailError] = useState<string>('');
  const [disable, setDisable] = useState<boolean>(true);

  useEffect(() => {
    const checkEmail = async () => {
      if (email.length > 5) {
        setDisable(false);
      }
    };
    checkEmail();
  }, [email]);
  const handleEmailChange = (event: any) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };
  const validateEmail = async (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError(data.emailProgress.error);
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };
  const sendEmail = throttle(async () => {
    const isValid = await validateEmail(email);
    if (isValid) {
      const {isRegistered} = await lookupEmail(email);
      console.log('isRegistered', isRegistered);
      if (isRegistered) {
        setDeleteAccProgress(2);
      } else {
        setEmailError(data.emailProgress.incorrect);
      }
    }
  }, 500);

  return (
    <>
      <InfoHintText>{data.emailProgress.info}</InfoHintText>
      <EmailInput
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      {emailError && <InfoErrorText>{emailError}</InfoErrorText>}
      <GreenLongNextButton unable={disable} onClick={sendEmail}>
        {data.emailProgress.next}
      </GreenLongNextButton>
    </>
  );
}

export default EmailProgress;
