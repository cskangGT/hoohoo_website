import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAPIKey, sendGoogleLogin } from '../../../api/login/auth';
import { useUserStore } from '../../../storage/userStore';
import OAuthCallback from './OAuthCallback';

function GoogleCallback() {
  const [loading, setLoading] = useState(true);
  const {setUser} = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');

  useEffect(() => {
    console.log('Google 로그인 콜백 데이터:', {code});

    const fetchAuth = async () => {
      setLoading(true);
      if (!code) {
        setLoading(false);
        return;
      }
      const storedNameTag = sessionStorage.getItem('storedNameTag');
      console.log('storedNameTag in Google', storedNameTag);
      const response = await sendGoogleLogin(code, storedNameTag || '');
      if (response.result) {
        getAPIKey();

        setUser(response.data.user);
        if (response.data?.user?.isNeedsQuestionnaire) {
          navigate('/setup/select-goal', {replace: true});
        } else {
          navigate(`/${response.data.user.nameTag}`, {replace: true});
        }
      }
      setLoading(false);
    };
    fetchAuth();
  }, []);

  return <OAuthCallback provider="google" isLoading={loading} />;
}

export default GoogleCallback;
