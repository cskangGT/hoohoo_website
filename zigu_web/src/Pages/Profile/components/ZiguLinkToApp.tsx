import i18next from 'i18next';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {getSyncUserId} from '../../../api/jigulink/user.api';
import {useUserStore} from '../../../storage/userStore';
import {theme} from '../../../style';
import {getAbEMWidget} from './ProfileWidgetGrid';
import WidgetItem from './WidgetItem';
const BlurredWidgetGrid = styled.div`
  margin-top: 24px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;

  justify-content: space-between;
  position: relative;
`;
const BlurOverlay = styled.div`
  position: absolute;
  top: -10px;
  left: -60px;
  right: -60px;
  opacity: 1;
  height: 105%;

  background: linear-gradient(
    180deg,
    rgba(30, 30, 30, 0) 0%,

    rgba(75, 75, 75, 0.9) 48.5%,

    rgba(45, 45, 45, 0) 100%
  );
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  row-gap: ${theme.spacing.xm};
`;

const OverlayText = styled.p`
  color: ${theme.white};
  font-size: ${theme.fontSize.lg};
  font-weight: 400;
  text-align: center;
  margin: 0 20px;
  line-height: 1.5;
`;
const OverlayButton = styled.button`
  background-color: transparent;

  cursor: pointer;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: 1px solid ${theme.white};
  border-radius: 20px;
  color: ${theme.white};
  font-size: ${theme.fontSize.lg};
  font-weight: 400;
  text-align: center;
`;
function ZiguLinkToApp() {
  const localizedTexts: any = i18next.t('ProfileLinkPage', {
    returnObjects: true,
  });
  const AbEMWidget = getAbEMWidget();
  const {user} = useUserStore();
  const [deepLinkUrl, setDeepLinkUrl] = useState<string>('');
  useEffect(() => {
    const fetchSyncUserId = async () => {
      const response = await getSyncUserId();

      if (response.result) {
        const linkUrl = `https://earthmera.com/redirect?link=earthmera://emsync?webUserId=${response.data.webUserId}&name=${encodeURIComponent(
          user?.username || '',
        )}&profileImage=${encodeURIComponent(user?.profileImage || '')}`;
        setDeepLinkUrl(linkUrl);
      }
    };
    fetchSyncUserId();
  }, []);
  function linktoApp() {
    window.open(deepLinkUrl, '_blank');
  }
  return (
    <BlurredWidgetGrid>
      {AbEMWidget.slice(4).map(widget => (
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
  );
}

export default ZiguLinkToApp;
