import {CircularProgress} from '@mui/material';
import i18next from 'i18next';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import {applyPromoCode} from '../../api/jigulink/jigulink.api';
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
  font-size: ${theme.fontSize['3xl']};
  font-weight: 600;
  color: black;
  margin-bottom: 16px;
`;

const TextInput = styled.input`
  width: calc(100% - ${theme.spacing.md} * 2);
  padding: ${theme.spacing.md};
  border-radius: 10px;
  border: 1px solid ${theme.gray};
  margin-bottom: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  margin-top: ${theme.spacing.xl};
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
    background-color: black;
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
type PromoCodeModalProps = {
  visible: boolean;
  onCancel: () => void;
  onApply: () => void;
};
function PromoCodeModal({visible, onCancel, onApply}: PromoCodeModalProps) {
  if (!visible) return null;
  const [isLoading, setIsLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const localizedTexts: any = i18next.t('PlanPage', {
    returnObjects: true,
  });
  const {user} = useUserStore();
  const navigate = useNavigate();
  const handleChangeTemplate = async () => {
    setIsLoading(true);
    const response = await applyPromoCode(promoCode);
    console.log(response);
    if (response.result) {
      onCancel();
      toast.success(localizedTexts.PromoCodeModal.successToast);
      onApply();
      setIsLoading(false);
    } else {
      toast.error(localizedTexts.PromoCodeModal.errorToast);
      setIsLoading(false);
    }
  };
  return (
    <ModalOverlay onClick={onCancel}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <Title>{localizedTexts.PromoCodeModal.title}</Title>
        <TextInput
          placeholder={localizedTexts.PromoCodeModal.placeholder}
          value={promoCode}
          onChange={e => setPromoCode(e.target.value)}
        />

        <ButtonContainer>
          <Button isPrimary onClick={handleChangeTemplate}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              localizedTexts.PromoCodeModal.apply
            )}
          </Button>
          <Button onClick={onCancel}>
            {localizedTexts.PromoCodeModal.cancel}
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default PromoCodeModal;
