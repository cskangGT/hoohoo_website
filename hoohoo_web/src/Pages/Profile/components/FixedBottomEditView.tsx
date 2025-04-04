import i18next from 'i18next';
import React from 'react';
import { FaCheck } from 'react-icons/fa6';

import { FiEdit } from 'react-icons/fi';
import { LuPlus } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { updateWidgets } from '../../../api/jigulink/jigulink.api';
import { useUserStore } from '../../../storage/userStore';
import { theme } from '../../../style';
import { useProfile } from '../contexts/ProfileContext';
import { ProfileWidgetItemType } from '../types/WidgetItemType';
const Container = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
  display: flex;
  width: 100%;
  z-index: 100;
  padding-bottom: env(safe-area-inset-bottom);
  justify-content: center;
  @media (max-width: 600px) {
    position: fixed;
  }
`;
const FixedBottomEditViewContainer = styled.div`
  width: 100%;
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
  padding-bottom: 30px;
  gap: ${theme.spacing.sm};
`;
const ActionButtonContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: ${theme.spacing.sm};
  align-items: flex-end;
  z-index: 103;
  justify-content: flex-end;
`;

const SyncTagView = styled.div`
  position: absolute;

  align-self: center;
  bottom: 30px;
  display: flex;
  text-align: center;
  background-color: #000000;
  padding: ${theme.spacing.rg} ${theme.spacing['3xl']};
  color: ${theme.mainNeon};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  line-height: 1.2;
  font-family: Inter;
  border-radius: 30px;
  z-index: 102;
  border: 1px solid ${theme.mainNeon};
  display: flex;
  align-items: center;
  padding: ${theme.spacing.rg} ${theme.spacing.xl};
  background-color: rgba(0, 0, 0, 1);
  border-radius: 30px;
  margin-top: 8px;
`;

const SyncContent = styled.div`
  display: flex;
  align-items: center;
  font-size: ${theme.fontSize.md};
  color: ${theme.mainNeon};
`;

const EMLogoImage = styled.img`
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
  margin: 0 4px;
  object-fit: contain;
`;

const ActionButton = styled.button<{$isDone?: boolean}>`
  background-color: ${props => (props.$isDone ? theme.white : theme.mainNeon)};
  color: ${theme.darkGray};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 25px;
  height: 50px;
  width: 50px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  font-weight: bold;
  z-index: 103;
  @media (max-width: 600px) {
    height: 50px;
    padding: ${theme.spacing.sm} 8px;
    width: 50px;
    border-radius: 25px;
  }
  @media (max-width: 400px) {
    height: 40px;
    padding: ${theme.spacing.sm} 4px;
    width: 40px;
    border-radius: 20px;
  }
`;

function FixedBottomEditView() {
  const localizedTexts: any = i18next.t('ProfileLinkPage', {
    returnObjects: true,
  });
  const {isSyncedWithEM, setMyWidgets} = useUserStore();

  const navigate = useNavigate();
  const {
    startEditing,
    setIsEditing,
    currentWidgets,
    originalWidgets,
    deletedWidgetItems,
    isEditing,

    setDeletedWidgetItems,
    setOriginalWidgets,
    isMyLink,
    userData,
  } = useProfile();

  function handleCreateWidget() {
    setMyWidgets(originalWidgets);
    navigate('/zigu/' + userData?.nameTag + '/set-widget', {
      state: {
        isEditMode: false,
      },
    });
  }
  function handleGoSync() {
    navigate('/zigu/' + userData?.nameTag + '/settings/sync');
  }
  const handleDone = async () => {
    if (deletedWidgetItems.length === 0 && currentWidgets.length === 0) {
      setIsEditing(false);
      return;
    }
    if (JSON.stringify(currentWidgets) === JSON.stringify(originalWidgets)) {
      setIsEditing(false);
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
    console.log('updatedWidgets', updatedWidgets);

    const response = await updateWidgets(updatedWidgets, deletedWidgetItems);
    if (response.result) {
      toast.success('Successfully updated');
      setDeletedWidgetItems([]);
      setMyWidgets(currentWidgets);
      setOriginalWidgets(currentWidgets);
      setIsEditing(false);
    } else {
      toast.error('Failed to update');
    }
  };
  const name = userData?.linkedUserInfo?.name?.split('#')[0];
  return (
    <Container>
      <FixedBottomEditViewContainer>
        <ActionButtonContainer>
          {isEditing ? (
            <>
              <ActionButton $isDone onClick={handleDone}>
                {/* {localizedTexts.done} */}
                <FaCheck size={20} color={'black'} />
              </ActionButton>
              <ActionButton onClick={handleCreateWidget}>
                <LuPlus size={20} color={'black'} />
              </ActionButton>
            </>
          ) : (
            <>
              <ActionButton onClick={startEditing}>
                <FiEdit size={20} color={'black'} />
              </ActionButton>
            </>
          )}
        </ActionButtonContainer>
      </FixedBottomEditViewContainer>
      {isMyLink && isSyncedWithEM && (
        <SyncTagView onClick={handleGoSync}>
          <SyncContent>
            {localizedTexts.synced[0]}
            <EMLogoImage
              src={'/Images/og_earthmera_logo.png'}
              alt="synced with EM"
            />{' '}
            {name}
            {localizedTexts.synced[1]}
          </SyncContent>
        </SyncTagView>
      )}
    </Container>
  );
}

export default FixedBottomEditView;
