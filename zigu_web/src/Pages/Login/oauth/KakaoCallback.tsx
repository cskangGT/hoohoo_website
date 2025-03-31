import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import i18next from 'i18next';
import {sendKakaoLogin} from '../../../api/login/auth';
import {useUserStore} from '../../../storage/userStore';
import OAuthCallback from './OAuthCallback';

function KakaoCallback() {
  const localizedText: any = i18next.t('KakaoCallback', {
    returnObjects: true,
  });
  const {setUser} = useUserStore();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get('code');
  useEffect(() => {
    if (!code) {
      alert(localizedText.error);
      return;
    }
    setLoading(true);
    const storedNameTag = sessionStorage.getItem('storedNameTag');
    console.log('storedNameTag in Kakao', storedNameTag);
    // 백엔드에 인증 코드 전송

    sendKakaoLogin(code, storedNameTag || '')
      .then(response => {
        console.log('response', response);

        if (response.result) {
          // getAPIKey();
          setUser(response?.data?.user);
          sessionStorage.removeItem('storedNameTag');

          if (response.data?.user?.isNeedsQuestionnaire) {
            navigate('/setup/select-goal', {replace: true});
          } else {
            const redirectAfterAuth =
              sessionStorage.getItem('redirectAfterAuth');
            if (redirectAfterAuth) {
              sessionStorage.removeItem('redirectAfterAuth');
              navigate(redirectAfterAuth, {replace: true});
            } else {
              navigate(`/${response.data.user.nameTag}`, {replace: true});
            }
          }
        } else if (response.status === 409) {
          alert(
            storedNameTag
              ? localizedText.hasAccount
              : localizedText.anotherMethod,
          );
          navigate('/login');
        } else {
          alert(localizedText.error);
          navigate('/pre-signup');
        }
      })
      .catch(err => {
        console.error(err);
        alert(localizedText.error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return <OAuthCallback provider="kakao" isLoading={loading} />;
}

export default KakaoCallback;
