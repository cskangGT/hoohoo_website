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
            navigate(`/zigu/${response.data.user.nameTag}`, {replace: true});
          }
        } else if (response.status === 400) {
          alert(localizedText.noAccount);
          navigate('/pre-signup');
        } else {
          alert(localizedText.error);
          navigate('/login');
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
