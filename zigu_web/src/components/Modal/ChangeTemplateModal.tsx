import {CircularProgress} from '@mui/material';
import i18next from 'i18next';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import {applyTemplate} from '../../api/jigulink/jigulink.api';
import i18n from '../../lang/i18n';
import {useUserStore} from '../../storage/userStore';
import {theme} from '../../style';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  width: 90%;
  max-width: 400px;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.h2`
  font-size: ${theme.fontSize['2xl']};
  font-weight: 600;
  color: ${theme.red};
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: ${theme.fontSize.md};
  color: ${theme.inActiveGray};
  margin: 30px 0px;
  line-height: 1.5;
`;

const SubDescription = styled.p`
  font-size: ${theme.fontSize.rg};
  color: ${theme.gray};
  margin-bottom: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`;

const Button = styled.button<{isPrimary?: boolean}>`
  width: 100%;
  padding: ${theme.spacing.md};
  border-radius: 10px;
  font-size: ${theme.fontSize.md};
  font-weight: 700;
  cursor: pointer;
  border: none;

  transition: opacity 0.2s ease;

  ${({isPrimary}) =>
    isPrimary
      ? `
    background-color: ${theme.red};
    color: ${theme.white};
  `
      : `
    background-color: #f5f5f5;
    color: ${theme.darkGray};
  `}

  &:hover {
    opacity: 0.8;
  }
`;

interface ChangeTemplateModalProps {
  isOpen: boolean;
  selectedTemplate: string;
  onCancel: () => void;
}

function ChangeTemplateModal({
  isOpen,
  selectedTemplate,
  onCancel,
}: ChangeTemplateModalProps) {
  if (!isOpen) return null;
  const [isLoading, setIsLoading] = useState(false);
  const localizedTexts: any = i18next.t('ProfileLayoutPage', {
    returnObjects: true,
  });
  const {user} = useUserStore();

  const navigate = useNavigate();
  const handleChangeTemplate = async () => {
    setIsLoading(true);
    const response = await applyTemplate(selectedTemplate, i18n.language);
    console.log(response);
    if (response.result) {
      onCancel();
      navigate(`/${user?.nameTag}`, {state: {isEditing: true}});
      setIsLoading(false);
    } else {
      toast.error(localizedTexts.ConfirmModal.error);
      setIsLoading(false);
    }
  };
  return (
    <ModalOverlay onClick={onCancel}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <Title>{localizedTexts.ConfirmModal.title}</Title>
        <Description
          dangerouslySetInnerHTML={{
            __html: localizedTexts.ConfirmModal.description,
          }}
        />

        <ButtonContainer>
          <Button isPrimary onClick={handleChangeTemplate}>
            {isLoading ? <CircularProgress /> : localizedTexts.ConfirmModal.yes}
          </Button>
          <Button onClick={onCancel}>{localizedTexts.ConfirmModal.no}</Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default ChangeTemplateModal;
