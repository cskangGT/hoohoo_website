import i18next from 'i18next';
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
const Container = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  display: flex;
  width: 100%;
  padding-bottom: env(safe-area-inset-bottom);
  justify-content: center;
`;
const FixedBottomEditViewContainer = styled.div`
  padding: ${theme.spacing.sm};
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
  z-index: 100;
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

const ActionButton = styled.button<{$isLongButton?: boolean}>`
  background-color: ${theme.mainNeon};
  color: ${theme.darkGray};
  padding: ${theme.spacing.sm}
    ${props => (props.$isLongButton ? theme.spacing['3xl'] : theme.spacing.md)};
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
  @media (max-width: 600px) {
    height: 50px;
    padding: ${theme.spacing.sm} 8px;
    width: 50px;
    border-radius: 20px;
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
  const {setMyWidgets} = useUserStore();

  const navigate = useNavigate();
  const {
    startEditing,
    setIsEditing,
    currentWidgets,
    deletedWidgetItems,
    isEditing,
    isSyncedWithEM,
    setDeletedWidgetItems,
    setOriginalWidgets,
    isMyLink,
    userData,
  } = useProfile();
  function handleCreateWidget() {
    setMyWidgets(currentWidgets);
    navigate('/profile/create-widget', {
      state: {
        isSyncedWithEM: isSyncedWithEM,
      },
    });
  }
  function handleGoSync() {
    navigate('/profile/settings/sync');
  }
  const handleDone = async () => {
    // 수정하는 api
    if (deletedWidgetItems.length === 0 && currentWidgets.length === 0) {
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
    const response = await updateWidgets(updatedWidgets, deletedWidgetItems);
    if (response.result) {
      toast.success('Successfully updated');
      setDeletedWidgetItems([]);
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
            <ActionButton $isLongButton onClick={handleDone}>
              {localizedTexts.done}
            </ActionButton>
          ) : (
            <>
              <ActionButton onClick={handleCreateWidget}>
                <LuPlus size={16} />
              </ActionButton>
              {currentWidgets.length > 0 && (
                <ActionButton onClick={startEditing}>
                  {localizedTexts.edit}
                </ActionButton>
              )}
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
