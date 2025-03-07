import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {kakaoLogin} from '../../../api/auth';
import OAuthCallback from './OAuthCallback';

function KakaoCallback() {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    console.log('code', code);

    if (!code) {
      setLoading(false);
      return;
    }

    // 백엔드에 인증 코드 전송
    kakaoLogin(code)
      .then(response => {
        // 로그인 성공 처리
        localStorage.setItem('token', response.data.token);
        navigate('/login');
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  return <OAuthCallback provider="kakao" isLoading={loading} />;
}

export default KakaoCallback;
