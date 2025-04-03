import React, {useEffect, useState} from 'react';

import {CircularProgress} from '@mui/material';
import styled from 'styled-components';
import i18next from '../../../lang/i18n';
import {useUserStore} from '../../../storage/userStore';
import {theme} from '../../../style';
import {useProfile} from '../contexts/ProfileContext';
import {
  ProfileEMWidgetType,
  ProfileWidgetItemType,
} from '../types/WidgetItemType';
import MainProfileGrid from './MainProfileGrid';
import PowerByEM from './PowerByEM';
import WidgetItem from './WidgetItem';
import ZiguLinkToApp from './ZiguLinkToApp';

const WidgetGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;

  justify-content: space-between;
  position: relative;
`;
const Container = styled.div<{isMyLink: boolean}>`
  width: 100%;
  position: relative;
  margin-bottom: ${props => (props.isMyLink ? '100px' : '20px')};
`;
const BlurredContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const SyncedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 100px 0px;
  text-align: center;
  font-size: ${theme.fontSize.md};
  font-weight: 400;
  color: ${theme.gray};
`;

const BlurredWidgetGrid = styled(WidgetGrid)`
  margin-top: 24px;
  margin-bottom: 0px;
  gap: 16px;
`;
const CircularProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
  flex: 1;
`;

const WIDTH = window.innerWidth > 600 ? 600 : window.innerWidth;

export const getAbEMWidget = (): ProfileWidgetItemType[] => {
  const localizedTexts: any = i18next.t('ProfileLinkPage', {
    returnObjects: true,
  });
  return [
    {
      id: 1,
      sizeType: 'BIG',
      bgType: 'COLOR',
      bgColor: 'transparent',
      hasBorder: false,
      description: '',
      coordinate: {x: 0, y: 0},
    },
    {
      id: 2,
      sizeType: 'BIG',
      bgType: 'COLOR',
      bgColor: 'transparent',
      hasBorder: false,
      description: localizedTexts.customize,
      coordinate: {x: 0, y: 0},
    },
    {
      id: 3,
      sizeType: 'LONG',

      bgType: 'COLOR',
      bgColor: 'transparent',
      hasBorder: false,
      coordinate: {x: 0, y: 0},
    },
    {
      id: 4,
      sizeType: 'LONG',

      bgType: 'COLOR',
      bgColor: 'transparent',
      hasBorder: false,
      coordinate: {x: 0, y: 0},
    },

    {
      id: 10,
      sizeType: 'BIG',
      bgType: 'COLOR',
      bgColor: 'transparent',

      isEmWidget: true,
      emWidgetType: ProfileEMWidgetType.CO2Saved,
      widgetData: {
        annualEcoActionCount: 50,
        annualCarbonReduction: 1020,
        treeEffect: 10,
      },
      hasBorder: false,
      description: '',
      coordinate: {x: 0, y: 0},
    },
    {
      id: 11,
      sizeType: 'BIG',
      bgType: 'COLOR',
      bgColor: 'transparent',

      isEmWidget: true,
      emWidgetType: ProfileEMWidgetType.MyItems,
      hasBorder: false,
      coordinate: {x: 0, y: 0},
      description: '',
    },
    {
      id: 12,
      sizeType: 'BIG',
      bgType: 'COLOR',
      bgColor: 'transparent',

      isEmWidget: true,
      emWidgetType: ProfileEMWidgetType.Groups,
      hasBorder: false,
      coordinate: {x: 0, y: 0},
      description: '',
    },
    {
      id: 13,
      sizeType: 'BIG',
      bgType: 'COLOR',
      bgColor: 'transparent',
      isEmWidget: true,
      emWidgetType: ProfileEMWidgetType.MyStore,
      hasBorder: false,
      coordinate: {x: 0, y: 0},
      description: '',
    },
  ];
};

function ProfileWidgetGrid() {
  const localizedTexts: any = i18next.t('ProfileLinkPage', {
    returnObjects: true,
  });
  const AbEMWidget = getAbEMWidget();
  const {currentWidgets, isMyLink, isLoading, isEditing} = useProfile();
  const {isSyncedWithEM} = useUserStore();
  const [hasEMWidget, setHasEMWidget] = useState(false);
  useEffect(() => {
    setHasEMWidget(currentWidgets?.some(widget => widget.isEmWidget));
  }, [currentWidgets]);
  return (
    <Container isMyLink={isMyLink}>
      {isLoading ? (
        <CircularProgressContainer>
          <CircularProgress />
        </CircularProgressContainer>
      ) : (
        <>
          <MainProfileGrid />
          {isMyLink ? (
            <BlurredContainer>
              <>
                {currentWidgets?.length === 0 && (
                  <BlurredWidgetGrid>
                    <WidgetGrid style={{opacity: 0.5}}>
                      {AbEMWidget.slice(0, 4).map(widget => (
                        <WidgetItem key={widget.id} widget={widget} />
                      ))}
                    </WidgetGrid>
                  </BlurredWidgetGrid>
                )}
              </>
              {isEditing &&
                (!isSyncedWithEM ? (
                  <ZiguLinkToApp />
                ) : (
                  !hasEMWidget && (
                    <SyncedContainer
                      dangerouslySetInnerHTML={{
                        __html: localizedTexts.syncedWithEM,
                      }}
                    />
                  )
                ))}
            </BlurredContainer>
          ) : (
            <PowerByEM />
          )}
        </>
      )}
    </Container>
  );
}

export default ProfileWidgetGrid;
