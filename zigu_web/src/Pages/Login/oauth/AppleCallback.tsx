import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAPIKey, sendAppleLogin } from '../../../api/login/auth';
import { useUserStore } from '../../../storage/userStore';
import OAuthCallback from './OAuthCallback';

function AppleCallback() {
  const [loading, setLoading] = useState(true);
  const {setUser} = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');
  const state = queryParams.get('state');

  const hashParams = new URLSearchParams(location.hash.replace('#', ''));
  const idToken = queryParams.get('id_token');

  useEffect(() => {
    console.log('Apple 로그인 콜백 데이터:', {code, state, idToken});

    const fetchAuth = async () => {
      setLoading(true);
      if (!code || !idToken) {
        setLoading(false);
        return;
      }
      const storedNameTag = sessionStorage.getItem('storedNameTag');
      console.log('storedNameTag in Apple', storedNameTag);

      const response = await sendAppleLogin(code, idToken, storedNameTag || '');
      if (response.result) {
        setUser(response.data.user);
        sessionStorage.removeItem('storedNameTag');
        getAPIKey();
        if (response.data?.user?.isNeedsQuestionnaire) {
          navigate('/setup/select-goal', {replace: true});
        } else {
          navigate(`/${response.data.user.nameTag}`, {replace: true});
        }
      }
      setLoading(false);
    };
    fetchAuth();
  }, [location, navigate]);

  return <OAuthCallback provider="apple" isLoading={loading} />;
}

export default AppleCallback;
