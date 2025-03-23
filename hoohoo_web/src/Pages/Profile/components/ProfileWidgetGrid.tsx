import React from 'react';

import {CircularProgress} from '@mui/material';
import styled from 'styled-components';
import {useUserStore} from '../../../storage/userStore';
import {useProfile} from '../contexts/ProfileContext';
import {
  ProfileEMWidgetType,
  ProfileWidgetItemType,
  ProfileWidgetTypeEnum,
} from '../types/WidgetItemType';
import MainProfileGrid from './MainProfileGrid';
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

export const AbEMWidget: ProfileWidgetItemType[] = [
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
  const {currentWidgets, isMyLink, isLoading} = useProfile();
  const {isSyncedWithEM} = useUserStore();

  return (
    <Container>
      {isLoading ? (
        <CircularProgressContainer>
          <CircularProgress />
        </CircularProgressContainer>
      ) : (
        <>
          <MainProfileGrid />
          {isMyLink && (
            <>
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
              {!isSyncedWithEM && <ZiguLinkToApp />}
            </>
          )}
        </>
      )}
    </Container>
  );
}

export default ProfileWidgetGrid;
