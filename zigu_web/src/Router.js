import React from 'react';

import { createBrowserRouter, Navigate } from 'react-router-dom';
import {
  default as ErrorComponent
} from './components/ErrorComponent/ErrorComponent';
import AppleCallback from './Pages/Login/oauth/AppleCallback';
import GoogleCallback from './Pages/Login/oauth/GoogleCallback';
import KakaoCallback from './Pages/Login/oauth/KakaoCallback';
import Login from './Pages/Login/pages/Login';
import PreSignup from './Pages/Login/pages/PreSignup';
import SelectGoal from './Pages/Login/pages/SelectGoal';
import SelectPurpose from './Pages/Login/pages/SelectPurpose';
import SelectTemplate from './Pages/Login/pages/SelectTemplate';
import SetupProfile from './Pages/Login/pages/SetupProfile';
import Signup from './Pages/Login/pages/Signup';
import VerifyEmail from './Pages/Login/pages/VerifyEmail';
import QuestionnaireLayout from './Pages/Login/QuestionnaireLayout';
import SignupLayout from './Pages/Login/SignupLayout';
import Profile from './Pages/Profile/pages/Profile';
import ProfileCreateWidgetPage from './Pages/Profile/pages/ProfileCreateWidgetPage';
import ProfileLayoutPage from './Pages/Profile/pages/ProfileLayoutPage';
import ProfileLinkPage from './Pages/Profile/pages/ProfileLinkPage';
import ProfileSettingPage from './Pages/Profile/pages/ProfileSettingPage';
import ProfileSyncFromAppPage from './Pages/Profile/pages/ProfileSyncFromAppPage';
import ProfileSyncPage from './Pages/Profile/pages/ProfileSyncPage';



// 회원가입 관련 라우트를 별도로 분리
const signupRoutes = [
  {
    path: '/signup',
    element: <SignupLayout />,
    children: [
      {
        path: '',
        element: <Signup />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'verify-email',
        element: <VerifyEmail />,
        errorElement: <ErrorComponent />,
      },
    ],
  },
];
const setupRoutes = [
  {
    path: '/setup',
    element: <QuestionnaireLayout />,
    children: [
      {
        path: 'select-goal',
        element: <SelectGoal />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'select-purpose',
        element: <SelectPurpose />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'profile',
        element: <SetupProfile />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'select-template',
        element: <SelectTemplate />,
        errorElement: <ErrorComponent />,
      },
    ],
  },
];

export const noFrameRoutes = [
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/pre-signup',
    element: <PreSignup />,
    errorElement: <ErrorComponent />,
  },
  
  {
    path: '/oauth/kakao',
    element: <KakaoCallback />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/oauth/callback/apple',
    element: <AppleCallback />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/oauth/google',
    element: <GoogleCallback />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/:nameTag/settings/layout',
    element: <ProfileLayoutPage />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/',
    element: <Profile />,
    errorElement: <ErrorComponent />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
    ],
  },
  {
    path: '/:nameTag',
    element: <Profile />,
    errorElement: <ErrorComponent />,
    children: [
      {
        index: true, 
        element: <ProfileLinkPage />,
      },
      {
        path: ':nameTag/settings',
        element: <ProfileSettingPage />,
        errorElement: <ErrorComponent />,
      },
      {
        path: ':nameTag/set-widget',
        element: <ProfileCreateWidgetPage />,
        errorElement: <ErrorComponent />,
      },
      {
        path: ':nameTag/settings/sync',
        element: <ProfileSyncPage />,
        errorElement: <ErrorComponent />,
      },
      {
        path: ':nameTag/settings/sync-earthmera',
        element: <ProfileSyncFromAppPage />,
        errorElement: <ErrorComponent />,
      },
    ],
  },
];

const Router = createBrowserRouter([
  ...signupRoutes,
  ...setupRoutes,

  // 프레임 없는 경로들
  ...noFrameRoutes,
  
]);

export default Router;
