import i18next from 'i18next';
import React, {useEffect} from 'react';
import {FiLayout} from 'react-icons/fi';
import {IoEyeOutline} from 'react-icons/io5';
import {LuSettings} from 'react-icons/lu';
import {RiShare2Line} from 'react-icons/ri';
import {useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import useWindowResize from '../../../components/hooks/useWindowResize';
import CustomTooltip from '../../../components/Tooltip/CustomTooltip';
import {useUserStore} from '../../../storage/userStore';
import {theme} from '../../../style';
import {useProfile} from '../contexts/ProfileContext';
import ShareProfileModal from './ShareProfileModal';
const TopHeaderContainer = styled.div`
  width: calc(100% - ${theme.spacing.xm} * 2);
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.sm} ${theme.spacing.xm};
`;
const TopHeaderLeft = styled.div``;
const TopHeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.lg};
  @media (max-width: 1200px) {
    gap: ${theme.spacing.lg};
  }
  @media (max-width: 800px) {
    gap: ${theme.spacing.rg};
  }
  @media (max-width: 400px) {
    gap: ${theme.spacing.sm};
  }
`;
const CopyButton = styled.button`
  border-radius: 10px;
  padding: 4px ${theme.spacing.rg};
  border: 1px solid ${theme.white};
  background-color: transparent;
  cursor: pointer;
  color: ${theme.white};
  font-size: ${theme.fontSize.rg};
  font-family: Inter;
  font-weight: 300;
`;

const IconButton = styled.button`
  padding: 0px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${theme.white};
`;
const LogoButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LogoImage = styled.img`
  width: 40px;
  height: 40px;

  object-fit: cover;
`;
const TooltipContent = styled.div<{title: string}>`
  position: absolute;
  bottom: calc(100% + 15px);
  left: 50%;
  transform: translateX(-50%);
  padding: 16px 24px;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  border-radius: 16px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &::after {
    content: ${props => props.title};
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 8px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.9) transparent transparent transparent;
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
    padding: 12px 18px;
    bottom: calc(100% + 10px);
  }
`;
function ProfileTopHeader({
  isMyLink,
  nameTag,
}: {
  isMyLink: boolean;
  nameTag: string;
}) {
  const {state} = useLocation();
  const showTooltip = state?.showTooltip;
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(showTooltip);
  const {width} = useWindowResize({maxWidth: 600});
  const {
    setIsEditing,
    isEditing,
    setIsDarkMode,
    isDarkMode,
    showSave,
    setShowSave,
  } = useProfile();
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);
  const localizedTexts: any = i18next.t('ProfileLinkPage', {
    returnObjects: true,
  });

  const {user, isAuthenticated} = useUserStore();
  const navigate = useNavigate();

  function handleSetting() {
    navigate('/' + user?.nameTag + '/settings');
  }

  function handleLogo() {
    if (isAuthenticated) {
      const link = '/' + user?.nameTag;
      window.location.href = link;
    } else {
      navigate('/login');
    }
  }
  function handleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }
  function handleShare() {
    setIsShareModalOpen(true);
  }
  const handleLayout = () => {
    setIsTooltipOpen(false);

    navigate('/' + user?.nameTag + '/settings/layout');
  };
  function handleCloseModal() {
    setIsShareModalOpen(false);
  }
  function handlePreview() {
    setIsEditing(!isEditing);
  }
  useEffect(() => {
    const handleClick = () => {
      if (showTooltip) {
        window.history.replaceState({}, '', location.pathname);
        setIsTooltipOpen(false);
      }
    };

    // 전체 document에 클릭 이벤트 리스너 추가
    document.addEventListener('click', handleClick);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [showTooltip]);

  const iconSize = width > 500 ? 26 : 22;
  return (
    <>
      <TopHeaderContainer>
        <TopHeaderLeft>
          <LogoButton onClick={handleLogo}>
            <LogoImage src={'/Images/zigulink.png'} />
          </LogoButton>
        </TopHeaderLeft>
        <TopHeaderRight>
          {isMyLink ? (
            <>
              {/* <IconButton onClick={handleDarkMode}>
                <MdOutlineDarkMode size={iconSize} color={theme.white} />
              </IconButton> */}
              <IconButton onClick={handlePreview}>
                <IoEyeOutline size={iconSize} color={theme.white} />
              </IconButton>
              <IconButton onClick={handleLayout}>
                {isTooltipOpen ? (
                  <CustomTooltip content={localizedTexts.tooltip}>
                    <FiLayout size={iconSize} color={theme.white} />
                  </CustomTooltip>
                ) : (
                  <FiLayout size={iconSize} color={theme.white} />
                )}
              </IconButton>
              <IconButton onClick={handleShare}>
                <RiShare2Line size={iconSize} color={theme.white} />
              </IconButton>
              <IconButton onClick={handleSetting}>
                <LuSettings size={iconSize} color={theme.white} />
              </IconButton>
            </>
          ) : (
            <IconButton onClick={handleShare}>
              <RiShare2Line size={iconSize} color={theme.white} />
            </IconButton>
          )}
        </TopHeaderRight>
      </TopHeaderContainer>

      <ShareProfileModal
        isShareModalOpen={isShareModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}

export default ProfileTopHeader;
