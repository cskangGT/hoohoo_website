import {CircularProgress} from '@mui/material';
import {motion} from 'framer-motion';
import i18next from 'i18next';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled, {css} from 'styled-components';
import {checkNameTag} from '../../../api/login/signup.api';
import useWindowResize from '../../../components/hooks/useWindowResize';
import {useUserStore} from '../../../storage/userStore';
import {theme} from '../../../style';
import EarthMeraLogo from '../components/EarthMeraLogo';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white !important;
`;
const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
`;

const ImageBox = styled.div`
  height: calc(100% - ${theme.spacing.md} * 2);

  width: 80%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: ${theme.spacing.md};
  background-color: transparent;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const UpperBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const LanguageBox = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  column-gap: ${theme.spacing.sm};
  @media screen and (max-width: 1000px) {
    position: relative;
    justify-content: flex-end;
    top: 0px;
    width: 100%;

    right: 0px;
  }
  @media screen and (max-width: 600px) {
    position: relative;
    justify-content: flex-end;
    top: 0px;
    margin-top: 70px;
    width: 100%;

    right: 0px;
  }
  @media screen and (max-width: 500px) {
    position: relative;
    justify-content: flex-end;
    top: 40px;
    width: 100%;
    /* left: 0px; */
    right: 0px;
  }
`;
const LanguageButton = styled.button<{isActive: boolean}>`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: ${theme.fontSize.rg};
  border: 1px solid
    ${props => (!props.isActive ? 'transparent' : theme.darkGray)};
  font-weight: 600;
  color: ${props => (!props.isActive ? theme.gray : theme.darkGray)};
  padding: ${theme.spacing.sm} ${theme.spacing.xl};
  border-radius: 12px;

  @media screen and (max-width: 600px) {
    padding: ${theme.spacing.sm} ${theme.spacing.rg};
  }
  @media screen and (max-width: 500px) {
    padding: ${theme.spacing.sm} ${theme.spacing.rg};
    font-size: ${theme.fontSize.sm};
    font-weight: 500;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;

  object-fit: cover;
`;

const InnerBox = styled.div`
  width: 100%;

  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media screen and (max-width: 600px) {
    align-items: center;
  }
  @media screen and (max-width: 500px) {
    margin: 30px 0px;
  }
`;

const ContentOuterBox = styled.div`
  /* width: calc(50% - ${theme.spacing.xl} * 2); */
  width: calc(60% - 200px);
  padding: 30px 350px 30px 150px;
  /* padding: ${theme.spacing.xl}; */
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: flex-end;
  max-width: 400px;
  min-width: 350px;
  @media screen and (max-width: 1400px) {
    display: block;
    width: calc(60% - 100px);
    max-width: auto;
    padding: 20px 50px;
    padding: 20px 100px 20px 100px;
  }
  @media screen and (max-width: 1000px) {
    display: block;
    width: calc(100% - 300px);
    max-width: auto;
    padding: 20px 150px;
  }
  @media screen and (max-width: 800px) {
    display: block;
    width: calc(100% - 200px);
    padding: 20px 100px;
  }
  @media screen and (max-width: 600px) {
    display: block;
    width: calc(100% - 48px);
    padding: 20px 24px;
  }
  @media screen and (max-width: 500px) {
    display: block;
    width: calc(100% - 30px);
    min-width: auto;

    padding: 20px 15px;
  }
  @media screen and (max-width: 400px) {
    display: block;
    width: calc(100% - 20px);
    min-width: auto;
    padding: 20px 10px;
  }
`;
const TitleText = styled.h2<{language: string}>`
  font-size: ${theme.fontSize['3xl']};
  line-height: 30px;
  font-weight: 700;
  color: ${theme.darkGray};

  margin-top: 0px;
  margin-bottom: ${theme.spacing.lg};
  font-family: ${props =>
    props.language === 'ko' ? 'TmoneyRoundWind' : 'Fredoka'};
  @media screen and (max-width: 600px) {
    text-align: center;
  }
`;

const NextButton = styled.button`
  width: 100%;
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

const DescriptionText = styled.div`
  font-size: ${theme.fontSize.lg};
  line-height: 1.5;
  font-weight: 400;
  color: ${theme.darkGray};
  padding-bottom: ${theme.spacing.xl};
  @media screen and (max-width: 600px) {
    text-align: center;
  }
  @media screen and (max-width: 500px) {
    font-size: ${theme.fontSize.md};
  }
  @media screen and (max-width: 400px) {
    font-size: ${theme.fontSize.rg};
  }
`;

const LinkTitleText = styled.div`
  font-size: ${theme.fontSize.lg};
  line-height: 1.5;
  font-weight: 600;
  color: ${theme.darkGray};
  @media screen and (max-width: 600px) {
    text-align: center;
  }
  @media screen and (max-width: 500px) {
    font-size: ${theme.fontSize.md};
  }
`;
const LoginButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.md};
  background-color: ${theme.green};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: ${theme.fontSize.md};
  font-weight: 600;
  cursor: pointer;
  margin-top: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;
const LogoBox = styled.button`
  margin-bottom: ${theme.spacing.lg};
  padding: 0px;
  background-color: transparent;
  border: none;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    margin-top: ${theme.spacing.xl};
  }
`;
const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.rg};
  width: 100%;
`;
const LinkBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${theme.spacing.xs};
`;
const LinkInputContainer = styled.div<{
  hasError: boolean;
  isValid: boolean;
  isFocused: boolean;
}>`
  width: calc(100% - ${theme.spacing.md} * 2);
  border: 1px solid ${theme.gray};
  border-radius: 4px;
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;
  ${props =>
    props.hasError &&
    css`
      border: 1px solid ${theme.red};
    `}
  ${props =>
    props.isValid &&
    css`
      border: 1px solid ${theme.green};
    `}
  ${props =>
    props.isFocused &&
    css`
      border: 2px solid ${theme.darkGray};
    `}
`;
const LinkInputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const LinkPlaceholder = styled.div`
  font-size: ${theme.fontSize.md};
  color: ${theme.darkGray};
  font-weight: 400;
  white-space: nowrap;
`;
const LinkInput = styled.input`
  font-size: ${theme.fontSize.md};
  border: none;
  padding: 0px;
  outline: none;
  width: 100%;
  flex: 1;
`;
const CheckmarkContainer = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ErrorText = styled.p`
  color: ${theme.red};
  font-size: ${theme.fontSize.rg};
  font-weight: 400;
  width: 100%;
  margin: 2px 0px;
`;
const PolicyText = styled.p`
  font-size: ${theme.fontSize.rg};
  color: ${theme.inActiveGray};
  font-weight: 400;
  font-family: Inter;
  line-height: 2;
`;
const PolicyLink = styled.span`
  color: ${theme.inActiveGray};
  font-weight: 400;
  font-family: Inter;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
  }
`;
const SignInText = styled.p`
  font-size: ${theme.fontSize.rg};
  color: ${theme.darkGray};
  font-weight: 400;
  font-family: Inter;
  margin-top: ${theme.spacing['3xl']};
  @media screen and (max-width: 600px) {
    margin-top: ${theme.spacing.xl};
  }
`;
const PowerByBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.rg};
`;
const PowerByImage = styled.img`
  width: 120px;
  height: 100%;
  object-fit: contain;
  margin-top: ${theme.spacing['3xl']};
`;
const SignInLink = styled.span`
  color: ${theme.darkGray};
  font-weight: 400;
  font-family: Inter;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
  }
`;
interface ErrorType {
  alreadyExists: boolean;
  invalidLetters: boolean;
  startsEndsWithPeriod: boolean;
  limitExceeded: boolean;
}
function PreSignup() {
  const navigate = useNavigate();
  const {width} = useWindowResize({maxWidth: 1400});
  const [language, setLanguage] = useState<string>(i18next.language);

  const localizedTexts: any = i18next.t('PreSignup', {
    returnObjects: true,
  });
  const [error, setError] = useState<ErrorType>({
    alreadyExists: false,
    invalidLetters: false,
    startsEndsWithPeriod: false,

    limitExceeded: false,
  });
  const {user} = useUserStore();

  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLinkValid, setIsLinkValid] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [link, setLink] = useState<string>('');
  function clearValidation() {
    setHasError(false);
    setIsLinkValid(false);
    setError({
      alreadyExists: false,
      invalidLetters: false,
      startsEndsWithPeriod: false,
      limitExceeded: false,
    });
  }
  const validateLink = async () => {
    clearValidation();
    setIsLoading(true);

    const validCharsRegex = /^[a-z0-9_.]+$/;
    const startsWithSpecial = /^[.]|\.$/;
    if (link.length > 20 || link.length < 3) {
      setError({...error, limitExceeded: true});
      setHasError(true);
      setIsLoading(false);
      return;
    }
    if (!validCharsRegex.test(link)) {
      setError({...error, invalidLetters: true});
      setHasError(true);
      setIsLoading(false);
      return;
    }

    if (startsWithSpecial.test(link)) {
      setError({...error, startsEndsWithPeriod: true});
      setHasError(true);
      setIsLoading(false);
      return;
    }
    const response = await checkNameTag(link);

    if (response?.data?.isAvailable) {
      setIsLinkValid(true);
      sessionStorage.setItem('storedNameTag', link);
      setTimeout(() => {
        navigate('/signup', {state: {link}});
      }, 1200);
      return;
    } else {
      setError({...error, alreadyExists: true});
      setHasError(true);
    }
    setIsLoading(false);
    return '';
  };
  useEffect(() => {
    const storedNameTag = sessionStorage.getItem('storedNameTag');
    if (storedNameTag) {
      console.log('storedNameTag removed', storedNameTag);

      sessionStorage.removeItem('storedNameTag');
    }
  }, []);

  const handleNextClick = () => {
    validateLink();
  };
  const handleTermsClick = () => {
    window.open('https://earthmera.com/terms_of_use', '_blank');
  };
  const handlePrivacyClick = () => {
    window.open('https://earthmera.com/privacy', '_blank');
  };
  const handleSignInClick = () => {
    navigate('/login');
  };
  const handleLogoClick = () => {};
  const handlePowerByClick = () => {
    window.open('https://earthmera.com', '_blank');
  };
  const handleKoreanClick = () => {
    i18next.changeLanguage('ko');
    setLanguage('ko');
    localStorage.setItem('language', 'ko');
  };
  const handleEnglishClick = () => {
    i18next.changeLanguage('en');

    setLanguage('en');
    localStorage.setItem('language', 'en');
  };

  return (
    <Container>
      <LoginContainer>
        <ImageBox>
          <Image src={'/Images/earth_image.jpeg'} />
        </ImageBox>
        <ContentOuterBox>
          <LanguageBox>
            <LanguageButton
              isActive={language === 'ko'}
              onClick={handleKoreanClick}>
              {localizedTexts.languageKO}
            </LanguageButton>
            <LanguageButton
              isActive={language === 'en'}
              onClick={handleEnglishClick}>
              {localizedTexts.languageEN}
            </LanguageButton>
          </LanguageBox>
          <InnerBox>
            <LogoBox onClick={handleLogoClick}>
              <EarthMeraLogo size={100} />
            </LogoBox>
            <TitleText language={language}>{localizedTexts.title}</TitleText>
            <DescriptionText
              dangerouslySetInnerHTML={{
                __html: localizedTexts.description,
              }}
            />

            <LinkContainer>
              <LinkTitleText>{localizedTexts.linkTitle}</LinkTitleText>
              <LinkBox>
                <LinkInputContainer
                  hasError={hasError}
                  isValid={isLinkValid}
                  isFocused={isFocused}>
                  <LinkInputBox>
                    <LinkPlaceholder>{localizedTexts.link[0]}</LinkPlaceholder>
                    <LinkInput
                      placeholder={localizedTexts.link[1]}
                      type="text"
                      itemType=""
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      value={link}
                      onChange={e => setLink(e.target.value)}
                      onKeyDown={e => {
                        // 허용된 키 목록
                        const allowedKeys = [
                          'Backspace',
                          'Delete',
                          'ArrowLeft',
                          'ArrowRight',
                          'Tab',
                          'Home',
                          'End',
                          'Enter',
                        ];
                        const validCharsRegex = /^[a-zA-Z0-9_.]$/;
                        if (
                          !(
                            allowedKeys.includes(e.key) ||
                            validCharsRegex.test(e.key)
                          )
                        ) {
                          e.preventDefault();
                        }
                      }}
                      required
                    />
                  </LinkInputBox>
                  <CheckmarkContainer>
                    {isLinkValid && (
                      <motion.svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <motion.circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="#4CAF50"
                          strokeWidth="2"
                          initial={{pathLength: 0}}
                          animate={{pathLength: 1}}
                          transition={{duration: 0.5}}
                        />
                        <motion.path
                          d="M8 12L11 15L16 9"
                          stroke="#4CAF50"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                          initial={{pathLength: 0}}
                          animate={{pathLength: 1}}
                          transition={{duration: 0.5, delay: 0.3}}
                        />
                      </motion.svg>
                    )}
                  </CheckmarkContainer>
                </LinkInputContainer>
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
                            : ''}
                  </ErrorText>
                )}
              </LinkBox>
              <NextButton
                onClick={handleNextClick}
                disabled={isLoading || link.length === 0}>
                {isLoading ? (
                  <CircularProgress size={25} />
                ) : (
                  localizedTexts.next
                )}
              </NextButton>
              <PolicyText>
                {localizedTexts.guideText[0]}
                <PolicyLink onClick={handleTermsClick}>
                  {localizedTexts.terms}
                </PolicyLink>
                {localizedTexts.guideText[1]}
                <PolicyLink onClick={handlePrivacyClick}>
                  {localizedTexts.privacy}
                </PolicyLink>
                {localizedTexts.guideText[2]}
              </PolicyText>
            </LinkContainer>
            <SignInText>
              {localizedTexts.alreadyAccount}
              <SignInLink onClick={handleSignInClick}>
                {localizedTexts.signin}
              </SignInLink>
            </SignInText>
            <PowerByBox onClick={handlePowerByClick}>
              <PowerByImage src={'/Images/pow.png'} />
            </PowerByBox>
          </InnerBox>
        </ContentOuterBox>
      </LoginContainer>
    </Container>
  );
}

export default PreSignup;
