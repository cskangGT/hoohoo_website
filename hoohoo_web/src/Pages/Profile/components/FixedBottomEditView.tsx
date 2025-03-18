import React from 'react';
import {LuPlus} from 'react-icons/lu';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import {updateWidgets} from '../../../api/jigulink/jigulink.api';
import {useUserStore} from '../../../storage/userStore';
import {theme} from '../../../style';
import {useProfile} from '../contexts/ProfileContext';
import {ProfileWidgetItemType} from '../types/WidgetItemType';
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
const ActionButton = styled.button<{$isLongButton?: boolean}>`
  background-color: ${theme.mainNeon};
  color: ${theme.darkGray};
  padding: ${theme.spacing.sm}
    ${props => (props.$isLongButton ? theme.spacing['3xl'] : theme.spacing.md)};
  border-radius: 50px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  font-weight: bold;
`;

function FixedBottomEditView() {
  const {setMyWidgets} = useUserStore();
  const navigate = useNavigate();
  const {
    startEditing,
    setIsEditing,
    currentWidgets,
    deletedWidgetIds,
    isEditing,
    setDeletedWidgetIds,
    setOriginalWidgets,
  } = useProfile();
  function handleCreateWidget() {
    setMyWidgets(currentWidgets);
    navigate('/profile/create-widget');
  }
  const handleDone = async () => {
    // 수정하는 api
    if (deletedWidgetIds.length === 0 && currentWidgets.length === 0) {
      return;
    }
    const updatedWidgets = currentWidgets.map(
      (widget: ProfileWidgetItemType) => ({
        ...widget,
        coordinate: {
          x: widget.coordinate.x * 3,
          y: widget.coordinate.y,
        },
      }),
    );
    const response = await updateWidgets(updatedWidgets, deletedWidgetIds);
    if (response.result) {
      toast.success('Successfully updated');
      setDeletedWidgetIds([]);
      setOriginalWidgets(currentWidgets);
      setIsEditing(false);
    } else {
      toast.error('Failed to update');
    }
  };

  return (
    <FixedBottomEditViewContainer>
      <ActionButtonContainer>
        {isEditing ? (
          <ActionButton $isLongButton onClick={handleDone}>
            Done
          </ActionButton>
        ) : (
          <>
            <ActionButton onClick={handleCreateWidget}>
              <LuPlus size={16} /> Add
            </ActionButton>
            <ActionButton onClick={startEditing}>Edit</ActionButton>
          </>
        )}
      </ActionButtonContainer>
    </FixedBottomEditViewContainer>
  );
}

export default FixedBottomEditView;
