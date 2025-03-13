import React from 'react';

import {toast} from 'react-toastify';
import styled from 'styled-components';
import {deleteWidget} from '../../../api/jigulink/jigulink.api';
import {theme} from '../../../style';
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
const BlurredContainer = styled.div``;
const BlurredWidgetGrid = styled(WidgetGrid)`
  margin-top: 24px;
  margin-bottom: 100px;
`;
const WIDTH = window.innerWidth > 600 ? 600 : window.innerWidth;
const BlurOverlay = styled.div`
  position: absolute;
  top: -10px;
  left: -36px;
  right: -36px;
  opacity: 1;
  width: ${WIDTH}px;
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
  z-index: 10;
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
  isEditMode: boolean;
  setWidgets: React.Dispatch<React.SetStateAction<ProfileWidgetItemType[]>>;
};
function ProfileWidgetGrid({
  widgets,
  isMyLink,
  isEditMode,
  setWidgets,
}: ProfileWidgetGridProps) {
  function linktoApp() {
    // const platform = getDevicePlatform();
    // const appStoreLink =
    //   platform === 'iOS' ? iosAppStoreLink : androidAppStoreLink;
    const link = 'https://www.earthmera.com/redirect?link=earthmera://';
    window.open(link, '_blank');
  }
  async function onDeleteWidget(id: number) {
    const response = await deleteWidget(id);
    if (response.result) {
      toast.success('delete widget success');
      setWidgets((prev: ProfileWidgetItemType[]) => {
        return prev.filter((widget: ProfileWidgetItemType) => widget.id !== id);
      });
    } else {
      toast.error('delete widget failed');
    }
  }
  return (
    <Container>
      <WidgetGrid>
        {widgets?.length > 0
          ? widgets.map(widget => (
              <WidgetItem
                key={widget.id}
                widget={widget}
                isEditMode={isEditMode}
                onDeleteWidget={onDeleteWidget}
              />
            ))
          : !isMyLink && (
              <VacantContainer>
                <VacantText>No widgets found</VacantText>
              </VacantContainer>
            )}
      </WidgetGrid>
      {isMyLink && (
        <>
          <BlurredContainer>
            {widgets?.length === 0 && (
              <BlurredWidgetGrid>
                <WidgetGrid style={{opacity: 0.5}}>
                  {AbEMWidget.slice(0, 5).map(widget => (
                    <WidgetItem key={widget.id} widget={widget} />
                  ))}
                </WidgetGrid>
              </BlurredWidgetGrid>
            )}
          </BlurredContainer>
          <BlurredWidgetGrid>
            {AbEMWidget.slice(5).map(widget => (
              <WidgetItem key={widget.id} widget={widget} />
            ))}
            <BlurOverlay>
              <OverlayText
                dangerouslySetInnerHTML={{
                  __html: `Link your EarthMera app<br />to unlock this feature!`,
                }}
              />
              <OverlayButton onClick={linktoApp}>
                Open EarthMera App
              </OverlayButton>
            </BlurOverlay>
          </BlurredWidgetGrid>
        </>
      )}
    </Container>
  );
}

export default ProfileWidgetGrid;
