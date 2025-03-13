import React from 'react';
import {LuPlus} from 'react-icons/lu';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {theme} from '../../../style';
const FixedBottomEditViewContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${theme.spacing.sm};
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(18, 18, 18, 0.9) 80%,
    rgba(18, 18, 18, 1) 95%
  );
  z-index: 100;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: ${theme.spacing.xm} ${theme.spacing.md};
  height: 50px;
  gap: ${theme.spacing.sm};
`;
const ActionButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing.sm};
  align-items: flex-end;
  justify-content: flex-end;
`;
const ActionButton = styled.button<{isLongButton?: boolean}>`
  background-color: ${theme.mainNeon};
  color: ${theme.darkGray};
  padding: ${theme.spacing.sm}
    ${props => (props.isLongButton ? theme.spacing['3xl'] : theme.spacing.md)};
  border-radius: 50px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  font-weight: bold;
`;

function FixedBottomEditView({
  isEditMode,
  setIsEditMode,
}: {
  isEditMode: boolean;
  setIsEditMode: (isEditMode: boolean) => void;
}) {
  const navigate = useNavigate();
  function handleCreateWidget() {
    navigate('/profile/create-widget');
  }
  return (
    <FixedBottomEditViewContainer>
      <ActionButtonContainer>
        {!isEditMode && (
          <ActionButton onClick={handleCreateWidget}>
            <LuPlus size={16} /> Add
          </ActionButton>
        )}
        <ActionButton
          onClick={() => setIsEditMode(!isEditMode)}
          isLongButton={isEditMode}>
          {isEditMode ? 'Done' : 'Edit'}
        </ActionButton>
      </ActionButtonContainer>
    </FixedBottomEditViewContainer>
  );
}

export default FixedBottomEditView;
