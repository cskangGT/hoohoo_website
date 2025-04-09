import React, {useRef, useState} from 'react';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import {updateUserProfile} from '../../../api/jigulink/user.api';
import i18next from '../../../lang/i18n';
import {useUserStore} from '../../../storage/userStore';
import {defaultProfileImage} from '../../../style';
import {
  checkAWSKey,
  compressImage,
  generateUniqueKey,
  uploadImageToS3,
} from '../../../util/MediaUtil';
import {PROFILE_PREFIX} from '../../../util/S3Config';
import {useProfile} from '../contexts/ProfileContext';
const ProfileImageContainer = styled.div`
  margin-bottom: 10px;
  cursor: pointer;
`;
const ProfileImage = styled.img<{size?: number}>`
  width: ${props => props.size || 100}px;
  height: ${props => props.size || 100}px;
  border-radius: 50%;
  object-fit: cover;
`;
const ProfileImageInput = styled.input`
  display: none;
`;
function ProfileImageInProfile({resizedWidth}: {resizedWidth: number}) {
  const {userData, setUserData} = useProfile();
  const localizedTexts: any = i18next.t('ProfileSettingPage', {
    returnObjects: true,
  });
  const {user, setUser} = useUserStore();
  const [profileImage, setProfileImage] = useState(userData.profileImage);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
          setProfileImage(result);
          setUserData(prev => ({...prev, profileImage: result}));
          setUser({...user, profileImage: result});
        }
      }
    }
  };
  return (
    <ProfileImageContainer onClick={() => fileInputRef.current?.click()}>
      <ProfileImageInput
        type="file"
        id="mylink_profileImageInput"
        accept="image/*"
        multiple={false}
        onChange={handleProfileImageChange}
        ref={fileInputRef}
      />

      <ProfileImage
        src={profileImage || defaultProfileImage}
        size={resizedWidth * 0.2}
      />
    </ProfileImageContainer>
  );
}

export default ProfileImageInProfile;
