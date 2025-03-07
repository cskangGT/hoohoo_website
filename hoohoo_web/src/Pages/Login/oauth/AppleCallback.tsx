import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import OAuthCallback from './OAuthCallback';
function AppleCallback() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, []);

  return <OAuthCallback provider="apple" isLoading={loading} />;
}

export default AppleCallback;
