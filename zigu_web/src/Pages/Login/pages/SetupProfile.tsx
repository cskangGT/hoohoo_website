import {TextField} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import i18next from 'i18next';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import {applyTemplate} from '../../../api/jigulink/jigulink.api';
import {updateUserProfile} from '../../../api/jigulink/user.api';
import {sendQuestionnaire} from '../../../api/login/signup.api';
import Wrapper from '../../../components/Wrapper/Wrapper';
import {useQuestionnaire} from '../../../context/QuestionnaireContext';
import i18n from '../../../lang/i18n';
import {useUserStore} from '../../../storage/userStore';
import {theme} from '../../../style';
import {
  checkAWSKey,
  compressImage,
  generateUniqueKey,
  uploadImageToS3,
} from '../../../util/MediaUtil';
import {PROFILE_PREFIX} from '../../../util/S3Config';
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  background-color: white !important;
  scrollbar-width: none;
  margin-top: 60px;
  overflow-y: scroll;
  @media screen and (max-width: 900px) {
    height: 100%;
    padding: ${theme.spacing.md};
    margin-top: 20px;
    width: calc(100% - ${theme.spacing.md} * 2);
  }
  @media screen and (max-width: 600px) {
    margin-bottom: 100px;
  }
`;
const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 500px) {
    margin-bottom: 130px;
  }
`;
const TitleText = styled.h2`
  font-size: ${theme.fontSize['3xl']};
  font-weight: 600;
  color: ${theme.darkGray};
  text-align: center;
  margin-bottom: 0px;
  @media screen and (max-width: 500px) {
    font-size: ${theme.fontSize['2xl']};
  }
`;
const ProfileImageContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;

  overflow: hidden;
  cursor: pointer;
  margin-bottom: ${theme.spacing['4xl']};
  @media screen and (max-width: 500px) {
    margin-bottom: ${theme.spacing['2xl']};
  }
`;
const ProfileNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-width: 350px;
  @media screen and (max-width: 600px) {
    width: calc(100% - ${theme.spacing.md} * 2);
  }
`;
const ProfileNameText = styled.p`
  font-size: ${theme.fontSize.md};
  font-weight: 400;
  color: ${theme.inActiveGray};
  margin: ${theme.spacing.lg} 0px;
  text-align: left;
`;
const ProfileImageInput = styled.input`
  display: none;
`;
const PreviewProfileImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
`;
const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
`;
const DescriptionText = styled.p`
  font-size: ${theme.fontSize.md};
  font-weight: 400;
  color: ${theme.inActiveGray};
  margin: ${theme.spacing['2xl']};
  text-align: center;
`;

const ContinueButtonContainer = styled.div`
  width: calc(100% - ${theme.spacing.md} * 2);

  padding: ${theme.spacing['3xl']} ${theme.spacing.md};
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 900px) {
    padding: ${theme.spacing.md};
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;
const ContinueButton = styled.button`
  width: 100%;
  max-width: 350px;
  padding: ${theme.spacing.md};
  border-radius: 8px;
  color: ${theme.white};

  background-color: ${theme.darkGray};
  display: flex;
  font-weight: 500;
  font-size: ${theme.fontSize.md};
  font-family: Inter;
  justify-content: center;
  align-items: center;
  margin-top: ${theme.spacing.md};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    box-shadow:
      0 1px 2px rgba(60, 64, 67, 0.3),
      0 1px 3px 1px rgba(60, 64, 67, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
const ErrorText = styled.p`
  color: ${theme.red};
  font-size: ${theme.fontSize.rg};
  font-weight: 400;
  width: 100%;
  margin: 2px 0px;
`;
interface ErrorType {
  alreadyExists: boolean;
  invalidLetters: boolean;
  startsEndsWithPeriod: boolean;
  limitExceeded: boolean;
  serverError: boolean;
}
function SetupProfile() {
  const {user, setUser} = useUserStore();
  const {setProgress, questionnaireData, resetQuestionnaireData} =
    useQuestionnaire();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>({
    alreadyExists: false,
    invalidLetters: false,
    startsEndsWithPeriod: false,
    limitExceeded: false,
    serverError: false,
  });
  const localizedTexts: any = i18next.t('SetupProfile', {
    returnObjects: true,
  });
  function clearValidation() {
    setHasError(false);
    setError({
      alreadyExists: false,
      invalidLetters: false,
      startsEndsWithPeriod: false,
      limitExceeded: false,
      serverError: false,
    });
  }
  useEffect(() => {
    setProgress(100);
  }, []);

  function handleRedirect() {
    resetQuestionnaireData();
    const redirectAfterAuth = sessionStorage.getItem('redirectAfterAuth');
    if (redirectAfterAuth) {
      sessionStorage.removeItem('redirectAfterAuth');
      navigate(redirectAfterAuth, {replace: true});
    } else {
      navigate('/setup/plan', {replace: true});
    }
  }

  const handleSendQuestionnaire = async () => {
    const data = [
      {
        questionType: 'ROLE',
        questionResponse: questionnaireData.role,
      },
    ];
    questionnaireData.purposes.map(async (purpose: string) => {
      data.push({
        questionType: 'PURPOSE',
        questionResponse: purpose,
      });
    });
    // const response = {result: true};
    const response = await sendQuestionnaire(data);
    if (response.result) {
      if (questionnaireData.template) {
        const res = await applyTemplate(
          questionnaireData.template,
          i18n.language,
        );
        if (res.result) {
          handleRedirect();
        } else {
          alert(localizedTexts.errorText.error);
          setError({...error, serverError: true});
          setHasError(true);
          setIsLoading(false);
          return;
        }
      } else {
        handleRedirect();
      }
    } else {
      alert(localizedTexts.errorText.error);
      setError({...error, serverError: true});
      setHasError(true);
      setIsLoading(false);
      return;
    }
  };
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const compressedImage = await compressImage(file, 1080);
      const uriKey = generateUniqueKey(PROFILE_PREFIX, 'png');
      const response = await checkAWSKey();
      if (response.result) {
        const result = await uploadImageToS3(compressedImage, true, uriKey);
        console.log('result', result);
        if (result) {
          setProfileImage(result);
        }
      } else {
        toast.error(localizedTexts.failUploadImage);
        return;
      }
    }
  };
  const handleSubmit = async () => {
    clearValidation();
    setIsLoading(true);

    // 한국어, 영어, 숫자, 밑줄, 마침표만 허용하는 정규식
    const validCharsRegex = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ_. ]+$/;
    const startsOrEndsWithSpecial = /^[ .]|[. ]$/;
    handleSendQuestionnaire();
    console.log('name', name);

    if (name.length > 20 || name.length < 2) {
      setError({...error, limitExceeded: true});
      setHasError(true);
      setIsLoading(false);
      return;
    }

    // 유효한 문자만 포함되어 있는지 체크
    if (!validCharsRegex.test(name)) {
      setError({...error, invalidLetters: true});
      setHasError(true);
      setIsLoading(false);
      return;
    }

    // 시작이나 끝에 마침표가 있는지 체크
    if (startsOrEndsWithSpecial.test(name)) {
      setError({...error, startsEndsWithPeriod: true});
      setHasError(true);
      setIsLoading(false);
      return;
    }

    console.log('name, profileImage', name, profileImage);

    const response = await updateUserProfile({name, profileImage});
    if (response.result) {
      const userData = {
        username: name,
        profileImage: profileImage,
        nameTag: user?.nameTag || '',
        email: user?.email || '',
      };
      setUser(userData);

      // handleSendQuestionnaire();
    } else {
      alert(localizedTexts.errorText.error);
      setError({...error, serverError: true});
      setHasError(true);
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  return (
    <Container>
      <Wrapper>
        <InnerWrapper>
          <TitleText>{localizedTexts.title}</TitleText>
          <DescriptionText>{localizedTexts.description}</DescriptionText>
          <ProfileImageContainer>
            <ProfileImageInput
              type="file"
              id="profileImageInput"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            <label htmlFor="profileImageInput">
              {!!profileImage ? (
                <ProfileImage src={profileImage} />
              ) : (
                <PreviewProfileImage src={'/Images/setup_profile.png'} />
              )}
            </label>
          </ProfileImageContainer>
          <ProfileNameContainer>
            <ProfileNameText>{localizedTexts.name}</ProfileNameText>
            <TextField
              label={''}
              type="text"
              placeholder={localizedTexts.placeholder}
              sx={{width: 'calc(100%)'}}
              value={name}
              onChange={e => setName(e.target.value)}
              required
              inputMode="text"
            />
            {hasError && (
              <ErrorText>
                {error.alreadyExists
                  ? localizedTexts.errorText.alreadyExists
                  : error.invalidLetters
                    ? localizedTexts.errorText.invalidLetters
                    : error.startsEndsWithPeriod
                      ? localizedTexts.errorText.startsEndsWithPeriod
                      : error.limitExceeded
                        ? localizedTexts.errorText.limitExceeded
                        : error.serverError
                          ? localizedTexts.errorText.error
                          : ''}
              </ErrorText>
            )}
          </ProfileNameContainer>
          <ContinueButtonContainer>
            <ContinueButton onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <CircularProgress size={25} />
              ) : (
                localizedTexts.button
              )}
            </ContinueButton>
          </ContinueButtonContainer>
        </InnerWrapper>
      </Wrapper>
    </Container>
  );
}

export default SetupProfile;
