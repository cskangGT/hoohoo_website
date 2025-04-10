import React, {useEffect} from 'react';
import {LuArrowLeft} from 'react-icons/lu';
import {useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {theme} from '../../../style';
import {useProfile} from '../contexts/ProfileContext';
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px ${20}px;
  margin-bottom: 60px;
  color: ${theme.white};
  position: relative;
`;
const TopHeaderContainer = styled.div`
  width: calc(100% - ${theme.spacing.xm} * 2);
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.sm} ${theme.spacing.xm};
`;
const TopHeaderLeft = styled.div``;
const BackButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
function TopHeaderBackButtonWrapperView({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const {isDarkMode} = useProfile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate(-1);
  };

  return (
    <>
      <TopHeaderContainer>
        <TopHeaderLeft>
          <BackButton onClick={handleBack}>
            <LuArrowLeft
              size={22}
              color={isDarkMode ? theme.white : theme.black}
            />
          </BackButton>
        </TopHeaderLeft>
      </TopHeaderContainer>
      <ProfileContainer>{children}</ProfileContainer>
    </>
  );
}

export default TopHeaderBackButtonWrapperView;
