import React from 'react';

import {CircularProgress} from '@mui/material';
import i18next from 'i18next';
import styled from 'styled-components';
import {theme} from '../../../style';
import {useProfile} from '../contexts/ProfileContext';
import {
  ProfileEMWidgetType,
  ProfileWidgetItemType,
  ProfileWidgetTypeEnum,
} from '../types/WidgetItemType';
import MainProfileGrid from './MainProfileGrid';
import WidgetItem from './WidgetItem';

const WidgetGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;

  justify-content: space-between;
  position: relative;
`;
const Container = styled.div`
  width: 100%;
  position: relative;
`;
const BlurredContainer = styled.div``;
const BlurredWidgetGrid = styled(WidgetGrid)`
  margin-top: 24px;
  margin-bottom: 100px;
  gap: 16px;
`;
const CircularProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  flex: 1;
`;
const WIDTH = window.innerWidth > 600 ? 600 : window.innerWidth;
const BlurOverlay = styled.div`
  position: absolute;
  top: -10px;
  left: -36px;
  right: -36px;
  opacity: 1;
  /* width: ${WIDTH}px; */
  height: 105%;

  background: linear-gradient(
    180deg,
    rgba(30, 30, 30, 0.6) 0%,
    rgba(75, 75, 75, 0.9) 48.5%,
    rgba(45, 45, 45, 0) 78.32%
  );
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  row-gap: ${theme.spacing.xm};
`;
const VacantText = styled.p`
  color: ${theme.white};
  font-size: ${theme.fontSize.xl};
  font-weight: 400;
  text-align: center;
  margin: 0 20px;
  line-height: 1.5;
`;
const OverlayText = styled.p`
  color: ${theme.white};
  font-size: ${theme.fontSize.xl};
  font-weight: 400;
  text-align: center;
  margin: 0 20px;
  line-height: 1.5;
`;
const VacantContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OverlayButton = styled.button`
  background-color: transparent;

  cursor: pointer;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: 1px solid ${theme.white};
  border-radius: 20px;
  color: ${theme.white};
  font-size: ${theme.fontSize.xl};
  font-weight: 400;
  text-align: center;
`;
const AbEMWidget: ProfileWidgetItemType[] = [
  {
    id: 1,
    sizeType: 'BIG',
    bgType: 'COLOR',
    bgColor: 'transparent',
    hasBorder: true,
    description: '',
    coordinate: {x: 0, y: 0},
  },
  {
    id: 2,
    sizeType: 'BIG',
    bgType: 'COLOR',
    bgColor: 'transparent',
    hasBorder: false,
    description:
      'Customize your profile freely with your favorite link, colors, and shapes, make it truly yours! ',
    coordinate: {x: 0, y: 0},
  },
  {
    id: 3,
    sizeType: 'LONG',

    bgType: 'COLOR',
    bgColor: 'transparent',
    hasBorder: true,
    coordinate: {x: 0, y: 0},
  },
  {
    id: 4,
    sizeType: 'LONG',

    bgType: 'COLOR',
    bgColor: 'transparent',
    hasBorder: true,
    coordinate: {x: 0, y: 0},
  },
  {
    id: 5,
    sizeType: 'LONG',

    bgType: 'COLOR',
    bgColor: 'transparent',
    hasBorder: true,
    coordinate: {x: 0, y: 0},
  },
  {
    id: 10,
    sizeType: 'BIG',
    bgType: 'COLOR',
    bgColor: 'transparent',
    type: ProfileWidgetTypeEnum.AppRank,
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
    type: ProfileWidgetTypeEnum.AppRecycle,
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
    type: ProfileWidgetTypeEnum.AppGroup,
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
    type: ProfileWidgetTypeEnum.AppShop,
    isEmWidget: true,
    emWidgetType: ProfileEMWidgetType.MyStore,
    hasBorder: false,
    coordinate: {x: 0, y: 0},
    description: '',
  },
];

function ProfileWidgetGrid() {
  const localizedTexts: any = i18next.t('ProfileLinkPage', {
    returnObjects: true,
  });
  const {currentWidgets, isMyLink, isLoading, isSyncedWithEM} = useProfile();
  function linktoApp() {
    // const platform = getDevicePlatform();
    // const appStoreLink =
    //   platform === 'iOS' ? iosAppStoreLink : androidAppStoreLink;
    const link = 'https://www.earthmera.com/redirect?link=earthmera://';
    window.open(link, '_blank');
  }

  return (
    <Container>
      {isLoading ? (
        <CircularProgressContainer>
          <CircularProgress />
        </CircularProgressContainer>
      ) : (
        isMyLink && (
          <>
            <MainProfileGrid />
            <BlurredContainer>
              {currentWidgets?.length === 0 && (
                <BlurredWidgetGrid>
                  <WidgetGrid style={{opacity: 0.5}}>
                    {AbEMWidget.slice(0, 5).map(widget => (
                      <WidgetItem key={widget.id} widget={widget} />
                    ))}
                  </WidgetGrid>
                </BlurredWidgetGrid>
              )}
            </BlurredContainer>
            {!isSyncedWithEM && (
              <BlurredWidgetGrid>
                {AbEMWidget.slice(5).map(widget => (
                  <WidgetItem key={widget.id} widget={widget} />
                ))}
                <BlurOverlay>
                  <OverlayText
                    dangerouslySetInnerHTML={{
                      __html: localizedTexts.suggestSync,
                    }}
                  />
                  <OverlayButton onClick={linktoApp}>
                    {localizedTexts.openEarthMeraApp}
                  </OverlayButton>
                </BlurOverlay>
              </BlurredWidgetGrid>
            )}
          </>
        )
      )}
    </Container>
  );
}

export default ProfileWidgetGrid;
