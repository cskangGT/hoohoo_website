import i18next from 'i18next';
import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styled, {keyframes} from 'styled-components';

// 스타일드 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  font-family: 'Noto Sans KR', sans-serif;
`;

const Title = styled.h2`
  margin-bottom: 16px;
  color: #333;
`;

const Message = styled.p`
  color: #666;
  margin-bottom: 24px;
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div<{provider: string}>`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: ${props =>
    props.provider === 'kakao'
      ? '#FEE500'
      : props.provider === 'apple'
        ? '#000000'
        : '#4285F4'}; /* 각 서비스별 색상 */
  animation: ${spin} 1s ease-in-out infinite;
  margin-bottom: 20px;
`;

const ErrorIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const ErrorContainer = styled(Container)`
  color: #e74c3c;
`;

const RetryButton = styled.button<{provider: string}>`
  background-color: ${props =>
    props.provider === 'kakao'
      ? '#FEE500'
      : props.provider === 'apple'
        ? '#000000'
        : '#4285F4'};
  border: none;
  color: ${props => (props.provider === 'kakao' ? '#3C1E1E' : '#FFFFFF')};
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 16px;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const ProviderLogo = styled.div<{provider: string}>`
  font-size: 32px;
  margin-bottom: 16px;

  &::before {
    content: ${props =>
      props.provider === 'kakao'
        ? '"🟡"'
        : props.provider === 'apple'
          ? '"🍎"'
          : '"🔑"'};
  }
`;

interface OAuthCallbackProps {
  provider: 'kakao' | 'apple' | string;
  isLoading: boolean;
}

function OAuthCallback({provider, isLoading}: OAuthCallbackProps) {
  const localizedTexts: any = i18next.t('OAuthCallback', {
    returnObjects: true,
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const providerName =
    provider === 'kakao' ? localizedTexts.kakao : localizedTexts.apple;
  if (isLoading) {
    return (
      <Container>
        <LoadingSpinner provider={provider} />
        <Title>
          {localizedTexts.title[0]} {providerName} {localizedTexts.title[1]}
        </Title>
        <Message>{localizedTexts.message}</Message>
      </Container>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <Title>{localizedTexts.errorTitle}</Title>
        <Message>{localizedTexts.errorMessage}</Message>
        <RetryButton
          provider={provider}
          onClick={() => (window.location.href = '/login')}>
          {localizedTexts.retryButton}
        </RetryButton>
      </ErrorContainer>
    );
  }

  return null;
}

export default OAuthCallback;
