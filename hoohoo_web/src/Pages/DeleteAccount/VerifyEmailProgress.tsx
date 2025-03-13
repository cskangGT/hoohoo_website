import i18next from 'i18next';
import React, {useState} from 'react';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import {getAccStatus, sendCode, validateCode} from '../../api/deleteAcc';
import {theme} from '../../style';
import DeleteConfirmModal from './DeleteConfirmModal';
import {EmailInput, GreenLongNextButton} from './EmailProgress';
import OwnGroupModal from './OwnGroupModal';
const CodeInput = styled(EmailInput)`
  text-align: center;
`;
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
const ErrorText = styled.p`
  font-size: 16px;
  width: 100%;
  text-align: center;
  padding: 7px 0px;
  color: ${theme.red};
  @media screen and (max-width: 800px) {
    padding: 6px 0px;
    font-size: 14px;
  }
  @media screen and (max-width: 600px) {
    padding: 4px 0px;
    font-size: 12px;
  }
`;
const UnderlineButton = styled.a`
  font-size: 16px;
  width: 100%;
  text-align: center;
  padding: 10px 5px;
  text-decoration-color: ${theme.gray};
  text-decoration-line: underline;
  color: ${theme.gray};
  cursor: pointer;
  @media screen and (max-width: 800px) {
    padding: 6px 5px;
    font-size: 14px;
  }
  @media screen and (max-width: 600px) {
    padding: 4px 5px;
    font-size: 12px;
  }
`;
type Props = {
  email: string;
  reason: string;
  category: string;
  closeModal: () => void;
};
function VerifyEmailProgress({email, reason, category, closeModal}: Props) {
  const [code, setCode] = useState<string>('');
  const [errorText, setErrorText] = useState<string>('');
  const [confirmModalVisible, setConfirmModalVisible] =
    useState<boolean>(false);
  const [ownGroupModalVisible, setOwnGroupModalVisible] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const data: any = i18next.t('ManageAccModal', {returnObjects: true});
  const verifyEmail = async () => {
    setIsLoading(true);
    const {verified, blockedAccess, error} = await validateCode(code, email);
    if (verified) {
      const result = await getAccStatus(email);
      if (result.canDelete) {
        setConfirmModalVisible(true);
      } else {
        setOwnGroupModalVisible(true);
      }
    } else {
      if (error) {
        setErrorText(data.VerifyEmailProgress.error[2]);
      } else if (blockedAccess) {
        setErrorText(data.VerifyEmailProgress.error[1]);
      } else {
        setErrorText(data.VerifyEmailProgress.error[0]);
      }
    }
    setIsLoading(false);
  };
  const resendVerificationCode = async () => {
    const {isRegistered} = await sendCode(email);
    if (isRegistered) {
      toast.success(data.VerifyEmailProgress.sentToast);
    }
  };
  const handleCodeChange = (event: any) => {
    const newCode = event.target.value;
    setCode(newCode);
  };
  return (
    <>
      <InfoHintText>{data.VerifyEmailProgress.title}</InfoHintText>
      <InfoHintText>{email}</InfoHintText>
      <CodeInput onChange={handleCodeChange} value={code} maxLength={4} />
      {errorText && <ErrorText>{errorText}</ErrorText>}
      <InfoHintText>{data.VerifyEmailProgress.info}</InfoHintText>
      <UnderlineButton onClick={resendVerificationCode}>
        {data.VerifyEmailProgress.resend}
      </UnderlineButton>
      <GreenLongNextButton
        unable={isLoading || code.length !== 4}
        onClick={verifyEmail}>
        {data.VerifyEmailProgress.delete}
      </GreenLongNextButton>
      {confirmModalVisible && (
        <DeleteConfirmModal
          isOpen={confirmModalVisible}
          setIsOpen={setConfirmModalVisible}
          reason={reason}
          category={category}
          email={email}
          closeModal={closeModal}
        />
      )}
      {ownGroupModalVisible && (
        <OwnGroupModal
          isOpen={ownGroupModalVisible}
          setIsOpen={setOwnGroupModalVisible}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

export default VerifyEmailProgress;
