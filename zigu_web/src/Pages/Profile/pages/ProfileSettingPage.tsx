import React, {useRef} from 'react';
import {FaChevronRight} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import {updateUserProfile} from '../../../api/jigulink/user.api';
import {logoutProfile} from '../../../api/login/auth';
import i18next from '../../../lang/i18n';
import {useUserStore} from '../../../storage/userStore';
import {defaultProfileImage, theme} from '../../../style';
import {
  checkAWSKey,
  compressImage,
  generateUniqueKey,
  uploadImageToS3,
} from '../../../util/MediaUtil';
import {PROFILE_PREFIX} from '../../../util/S3Config';
import TopHeaderBackButtonWrapperView from '../components/TopHeaderBackButtonWrapperView';
import {useProfile} from '../contexts/ProfileContext';
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  color: ${theme.white};
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 30px 20px;
  margin-bottom: 20px;
  column-gap: 30px;
  @media (max-width: 500px) {
    column-gap: 25px;
  }
  @media (max-width: 400px) {
    column-gap: 20px;
  }
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;
const ProfileNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
const ProfileName = styled.h2`
  font-size: ${theme.fontSize.xl};
  font-weight: 600;
  font-family: Inter;

  margin: 0;
`;

const ProfileTag = styled.p`
  color: #888;
  font-size: ${theme.fontSize.rg};

  font-family: Inter;
  margin: 5px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  width: calc(100% - 40px);
  padding: 0 20px;
`;

const ProfileButton = styled.button<{inactive?: boolean}>`
  flex: 1;
  border: 1px solid ${theme.white};
  background-color: transparent;
  color: ${theme.white};
  border-radius: 8px;
  padding: 12px;

  cursor: pointer;
  font-family: Inter;
  font-size: ${theme.fontSize.md};
  opacity: ${props => (props.inactive ? 0.5 : 1)};
`;
const Divider = styled.div`
  width: calc(100% - 40px);
  height: 1px;
  background-color: #333;
  margin: 0px 20px;
`;
const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const MenuItem = styled.div<{disabled?: boolean}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  cursor: pointer;
`;
const ProfileImageInput = styled.input`
  display: none;
`;
const MenuText = styled.span`
  font-size: ${theme.fontSize.md};
  font-family: Inter;
`;

const LogoutButton = styled.div`
  padding: 20px;
  color: ${theme.white};

  cursor: pointer;
`;
function ProfileSettingPage() {
  const localizedTexts: any = i18next.t('ProfileSettingPage', {
    returnObjects: true,
  });

  const {setUserData} = useProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {user, logout, isAuthenticated, setUser} = useUserStore();

  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logoutProfile();
    if (response.result) {
      sessionStorage.clear();
      logout();
      setUserData({
        name: '',
        nameTag: '',
        profileImage: '',
        bio: '',
      });

      navigate('/login');
    } else {
      toast.error(localizedTexts.toast.failLogout);
    }
  };
  const handleProfileImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const compressedImage = await compressImage(file, 1080);
    const uriKey = generateUniqueKey(PROFILE_PREFIX, 'png');
    const {accessKey, keyId} = await checkAWSKey();
    if (!accessKey || !keyId) {
      toast.error(localizedTexts.toast.failUploadImage);
      return;
    } else {
      const result = await uploadImageToS3(compressedImage, true, uriKey);
      if (result) {
        console.log('result', result);
        const response = await updateUserProfile({
          profileImage: result,
        });
        if (response.result) {
          setUser({...user, profileImage: result});
        }
      }
    }

    // const compressedImage = await compressImage(file, 1080);
    //   const uriKey = generateUniqueKey(PROFILE_PREFIX + `/`, 'png');
    //   const result = await uploadImageToS3(compressedImage, true, uriKey);
    //   console.log('result', result);
    //   if (result) {
    //     setProfileImage(result);
    //   }
  };

  return (
    <TopHeaderBackButtonWrapperView>
      <SettingsContainer>
        <ProfileHeader>
          <ProfileImage src={user.profileImage || defaultProfileImage} />
          <ProfileNameContainer>
            <ProfileName>{user?.username}</ProfileName>
            <ProfileTag>@{user?.nameTag}</ProfileTag>
          </ProfileNameContainer>
        </ProfileHeader>

        <ButtonGroup>
          <ProfileButton inactive={false}>
            <ProfileImageInput
              type="file"
              id="setting_profileImageInput"
              accept="image/*"
              multiple={false}
              onChange={handleProfileImageChange}
              ref={fileInputRef}
            />
            <label
              htmlFor="setting_profileImageInput"
              style={{cursor: 'pointer', width: '100%', display: 'block'}}>
              {localizedTexts.changeProfilePicture}
            </label>
          </ProfileButton>

          <ProfileButton
            onClick={() => {
              toast.info(localizedTexts.notSupported);
            }}
            inactive={true}>
            {localizedTexts.changeProfileName}
          </ProfileButton>
        </ButtonGroup>

        <MenuList>
          <MenuItem
            onClick={() => {
              toast.info(localizedTexts.notSupported);
            }}
            disabled={true}>
            <MenuText>{localizedTexts.changeURL}</MenuText>
            <FaChevronRight size={20} color="#888" />
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              toast.info(localizedTexts.notSupported);
            }}
            disabled={true}>
            <MenuText>{localizedTexts.changePassword}</MenuText>
            <FaChevronRight size={20} color="#888" />
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => navigate('/' + user?.nameTag + '/settings/sync')}>
            <MenuText>{localizedTexts.syncEarthMeraID}</MenuText>
            <FaChevronRight size={20} color="#888" />
          </MenuItem>
          <Divider />
        </MenuList>

        <LogoutButton onClick={handleLogout}>
          <MenuText>{localizedTexts.logout}</MenuText>
        </LogoutButton>
        <Divider />
      </SettingsContainer>
    </TopHeaderBackButtonWrapperView>
  );
}

export default ProfileSettingPage;
