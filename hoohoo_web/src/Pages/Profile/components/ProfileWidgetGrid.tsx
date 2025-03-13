import React from 'react';

import styled from 'styled-components';
import {theme} from '../../../style';
import {androidAppStoreLink, iosAppStoreLink} from '../../Home/Download';
import {getDevicePlatform} from '../../Info/Redirection/RedirectPage';
import {PROFILE_SCREEN_WIDTH} from '../pages/ProfileLinkPage';
import {
  ProfileWidgetItemType,
  ProfileWidgetTypeEnum,
} from '../types/WidgetItemType';
import WidgetItem from './WidgetItem';

const WidgetGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
  width: 100%;

  justify-content: space-between;
  position: relative;
`;
const Container = styled.div`
  width: 100%;
  position: relative;
`;
const BlurredContainer = styled.div`
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;
const BlurredWidgetGrid = styled(WidgetGrid)`
  margin-top: 24px;
  margin-bottom: 100px;
`;
const BlurOverlay = styled.div`
  position: absolute;
  top: 0;
  left: -50px;
  right: -50px;
  width: ${PROFILE_SCREEN_WIDTH}px;
  height: 100%;
  cursor: pointer;
  background: linear-gradient(
    180deg,
    rgba(30, 30, 30, 0.6) 0%,
    rgba(75, 75, 75, 0.9) 48.5%,
    rgba(45, 45, 45, 0) 78.32%
  );

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const OverlayText = styled.p`
  color: ${theme.white};
  font-size: ${theme.fontSize.xl};
  font-weight: 400;
  text-align: center;
  margin: 0 20px;
  line-height: 1.5;
`;
const AbEMWidget: ProfileWidgetItemType[] = [
  {
    id: 1,
    sizeType: 'BIG',
    bgType: 'COLOR',
    bgColor: 'transparent',
    hasBorder: true,
    description: '',
  },
  {
    id: 2,
    sizeType: 'BIG',
    bgType: 'COLOR',
    bgColor: 'transparent',
    hasBorder: false,
    description:
      'Customize your profile freely with your favorite link, colors, and shapes, make it truly yours! ',
  },
  {
    id: 3,
    sizeType: 'LONG',

    bgType: 'COLOR',
    bgColor: 'transparent',
    hasBorder: true,
  },
  {
    id: 4,
    sizeType: 'LONG',

    bgType: 'COLOR',
    bgColor: 'transparent',
    hasBorder: true,
  },
  {
    id: 5,
    sizeType: 'LONG',

    bgType: 'COLOR',
    bgColor: 'transparent',
    hasBorder: true,
  },
  {
    id: 10,
    sizeType: 'BIG',
    bgType: 'COLOR',
    bgColor: 'transparent',
    type: ProfileWidgetTypeEnum.AppRank,
    hasBorder: true,
    description: '',
  },
  {
    id: 11,
    sizeType: 'BIG',
    bgType: 'COLOR',
    bgColor: 'transparent',
    type: ProfileWidgetTypeEnum.AppRecycle,
    hasBorder: true,
    description: '',
  },
  {
    id: 12,
    sizeType: 'BIG',
    bgType: 'COLOR',
    bgColor: 'transparent',
    type: ProfileWidgetTypeEnum.AppGroup,
    hasBorder: true,
    description: '',
  },
  {
    id: 13,
    sizeType: 'BIG',
    bgType: 'COLOR',
    bgColor: 'transparent',
    type: ProfileWidgetTypeEnum.AppShop,
    hasBorder: true,
    description: '',
  },
];
type ProfileWidgetGridProps = {
  widgets: ProfileWidgetItemType[];
  isMyLink: boolean;
};
function ProfileWidgetGrid({widgets, isMyLink}: ProfileWidgetGridProps) {
  function linktoApp() {
    const platform = getDevicePlatform();
    const appStoreLink =
      platform === 'iOS' ? iosAppStoreLink : androidAppStoreLink;
    window.open(appStoreLink, '_blank');
  }
  return (
    <Container>
      <WidgetGrid>
        {widgets?.length > 0
          ? widgets.map(widget => (
              <WidgetItem key={widget.id} widget={widget} />
            ))
          : !isMyLink && (
              <>
                <OverlayText>No widgets found</OverlayText>
              </>
            )}
      </WidgetGrid>
      {isMyLink && (
        <BlurredContainer>
          <WidgetGrid>
            {AbEMWidget.slice(0, 5).map(widget => (
              <WidgetItem key={widget.id} widget={widget} />
            ))}
          </WidgetGrid>
          <BlurredWidgetGrid>
            {AbEMWidget.slice(5).map(widget => (
              <WidgetItem key={widget.id} widget={widget} />
            ))}
            <BlurOverlay>
              <OverlayText
                onClick={linktoApp}
                dangerouslySetInnerHTML={{
                  __html: `Link your EarthMera app<br />to unlock this feature!`,
                }}
              />
            </BlurOverlay>
          </BlurredWidgetGrid>
        </BlurredContainer>
      )}
    </Container>
  );
}

export default ProfileWidgetGrid;
