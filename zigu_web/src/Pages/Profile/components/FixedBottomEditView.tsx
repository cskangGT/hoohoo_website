import i18next from 'i18next';
import React from 'react';
import {FiEdit} from 'react-icons/fi';
import {LuPlus} from 'react-icons/lu';
import {MdOutlineDarkMode, MdOutlineLightMode} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import {updateWidgets} from '../../../api/jigulink/jigulink.api';
import useWindowResize from '../../../components/hooks/useWindowResize';
import {useUserStore} from '../../../storage/userStore';
import {theme} from '../../../style';
import {useProfile} from '../contexts/ProfileContext';
import {ProfileWidgetItemType} from '../types/WidgetItemType';
const Container = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
  display: flex;
  height: 0px;
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
  position: absolute;
  bottom: 0px;
  right: 0px;
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
  background-color: ${props => (props.$isDone ? theme.white : theme.white)};
  color: ${theme.darkGray};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 30px;
  height: 60px;
  width: 60px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  font-weight: bold;
  font-size: ${theme.fontSize.lg};
  z-index: 103;
  @media (max-width: 600px) {
    height: 50px;
    width: 50px;
    padding: ${theme.spacing.sm} 8px;
    font-size: ${theme.fontSize.md};
    border-radius: 25px;
  }
  @media (max-width: 400px) {
    height: 40px;
    padding: ${theme.spacing.sm} 4px;
    font-size: ${theme.fontSize.rg};
    width: 40px;
    border-radius: 20px;
  }
`;

const DarkModeButton = styled(ActionButton)<{$isDarkMode: boolean}>`
  background-color: ${props =>
    props.$isDarkMode ? theme.white : theme.darkGray};
  color: ${props => (props.$isDarkMode ? theme.darkGray : theme.white)};
  border: none;
  cursor: pointer;
  display: none;
  @media (max-width: 750px) {
    display: block;
  }
`;
function FixedBottomEditView() {
  const {width: resizedWidth} = useWindowResize({
    maxWidth: 600,
  });
  const localizedTexts: any = i18next.t('ProfileLinkPage', {
    returnObjects: true,
  });
  const {isSyncedWithEM, setMyWidgets} = useUserStore();

  const navigate = useNavigate();
  const {
    currentWidgets,
    isDarkMode,
    setIsDarkMode,
    originalWidgets,
    deletedWidgetItems,
    isEditing,
    setIsEditing,
    setCurrentWidgets,
    setDeletedWidgetItems,
    setOriginalWidgets,
    startEditing,
    isMyLink,

    userData,
    showSave,
    setShowSave,
  } = useProfile();

  function handleCreateWidget() {
    setMyWidgets(originalWidgets);
    navigate('/' + userData?.nameTag + '/set-widget', {
      state: {
        isEditMode: false,
      },
    });
  }
  function handleGoSync() {
    navigate('/' + userData?.nameTag + '/settings/sync');
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
      (widget: ProfileWidgetItemType) => {
        // widget에서 필요한 속성들만 추출
        const {id, isExchangedWidget, coordinate, ...restWidget} = widget;

        return {
          ...restWidget,
          ...(isExchangedWidget ? {} : {id}), // isExchangedWidget이 false일 때만 id 포함
          coordinate: {
            x: coordinate.x * 3,
            y: coordinate.y,
          },
        };
      },
    );
    console.log('updatedWidgets', updatedWidgets);

    const response = await updateWidgets(updatedWidgets, deletedWidgetItems);
    if (response.result) {
      toast.success(localizedTexts.toast.updateSuccess);
      const updatedData = response.data;
      setDeletedWidgetItems([]);

      setIsEditing(false);
      // update currentWidgets, myWidgets, originalWidgets

      setCurrentWidgets(updatedData);
      setMyWidgets(updatedData);
      setOriginalWidgets(updatedData);
    } else {
      toast.error(localizedTexts.toast.failedToUpdate);
    }
  };
  function handleDarkMode() {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('isDarkMode', !isDarkMode ? 'true' : 'false');
  }
  const name = userData?.linkedUserInfo?.name?.split('#')[0];
  return (
    <Container>
      <FixedBottomEditViewContainer>
        <ActionButtonContainer>
          {isEditing ? (
            <>
              {
                <ActionButton $isDone onClick={handleDone}>
                  {localizedTexts.save}
                </ActionButton>
              }
              <ActionButton onClick={handleCreateWidget}>
                <LuPlus
                  size={resizedWidth > 600 ? 30 : resizedWidth > 500 ? 25 : 20}
                  color={'black'}
                />
              </ActionButton>
            </>
          ) : (
            <>
              <ActionButton onClick={startEditing}>
                <FiEdit
                  size={resizedWidth > 600 ? 30 : resizedWidth > 500 ? 25 : 20}
                  color={'black'}
                />
              </ActionButton>

              <DarkModeButton onClick={handleDarkMode} $isDarkMode={isDarkMode}>
                {!isDarkMode ? (
                  <MdOutlineDarkMode
                    size={
                      resizedWidth > 600 ? 30 : resizedWidth > 500 ? 25 : 20
                    }
                    color={theme.white}
                  />
                ) : (
                  <MdOutlineLightMode
                    size={
                      resizedWidth > 600 ? 30 : resizedWidth > 500 ? 25 : 20
                    }
                    color={theme.darkGray}
                  />
                )}
              </DarkModeButton>
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
