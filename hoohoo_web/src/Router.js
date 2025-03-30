import React from 'react';
import {createBrowserRouter, Navigate} from 'react-router-dom';
import {
  default as ErrorComponent,
  default as NotFound,
} from './components/ErrorComponent/ErrorComponent';
import SEOHelmet from './components/SEOHelmet';
import i18n from './lang/i18n';
import OurTeam from './Pages/About/OurTeam/OurTeam';
import EarthMeraVision from './Pages/About/Vision/EarthMeraVision';
import AdminLogin from './Pages/Admin/AdminLogin';
import MainDropB from './Pages/DropB/MainDropB';
import Blog from './Pages/EMMedia/Blog/Blog';
import BlogDetail from './Pages/EMMedia/Blog/BlogDetail';
import NewsDetailPage from './Pages/EMMedia/News/NewsDetailPage';
import NewsPage from './Pages/EMMedia/News/NewsPage';
import Testimonials from './Pages/EMMedia/Testimonials/Testimonials';
import HomeEarthmera from './Pages/Home/HomeEarthmera';
import SupportingPage from './Pages/Info/Contact/SupportingPage';
import RedirectPage from './Pages/Info/Redirection/RedirectPage';
import Privacy from './Pages/Legal/Privacy';
import TandC from './Pages/Legal/T&C';
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
import Partnership from './Pages/Partnership/B2B/Partnership';
import Platform from './Pages/Partnership/B2C/Platform';
import EMTicketeer from './Pages/Partnership/ticketeer/EMTicketeer';
import Profile from './Pages/Profile/pages/Profile';
import ProfileCreateWidgetPage from './Pages/Profile/pages/ProfileCreateWidgetPage';
import ProfileLayoutPage from './Pages/Profile/pages/ProfileLayoutPage';
import ProfileLinkPage from './Pages/Profile/pages/ProfileLinkPage';
import ProfileSettingPage from './Pages/Profile/pages/ProfileSettingPage';
import ProfileSyncFromAppPage from './Pages/Profile/pages/ProfileSyncFromAppPage';
import ProfileSyncPage from './Pages/Profile/pages/ProfileSyncPage';
import Root from './Root';

const createLocalizedRoutes = routes => {
  return routes
    .map(route => [
      {
        path: `/ko${route.path}`,
        element: (
          <>
            <SEOHelmet language="ko" />
            {route.element}
          </>
        ),
        errorElement: route.errorElement,
        loader: ({params}) => {
          // i18n 언어 설정을 한국어로 변경

          i18n.changeLanguage('ko');

          return null;
        },
      },
      {
        path: `/en${route.path}`,
        element: (
          <>
            <SEOHelmet language="en" />
            {route.element}
          </>
        ),
        errorElement: route.errorElement,
        loader: ({params}) => {
          // i18n 언어 설정을 영어로 변경
          i18n.changeLanguage('en');
          return null;
        },
      },
    ])
    .flat();
};

const baseRoutes = [
  {
    path: '/',
    element: <HomeEarthmera language="" />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/home',
    element: <HomeEarthmera />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/vision',
    element: <EarthMeraVision />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/about_team',
    element: <OurTeam />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/partnership',
    element: <Partnership />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/platform',
    element: <Platform />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/ticketeer',
    element: <EMTicketeer />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/dropb',
    element: <MainDropB />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/climate_card',
    element: <Blog />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/admin',
    element: <AdminLogin />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/climate_card/:id',
    element: <BlogDetail />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/news',
    element: <NewsPage />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/news/:id',
    element: <NewsDetailPage />,
    errorElement: <ErrorComponent />,
  },
  // {
  //   path: '/contact',
  //   element: <ContactPage />,
  //   errorElement: <ErrorComponent />,
  // },
  {
    path: '/support',
    element: <SupportingPage />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/privacy',
    element: <Privacy />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/terms_of_use',
    element: <TandC />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/testimonials',
    element: <Testimonials />,
    errorElement: <ErrorComponent />,
  },
];

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
    path: '/redirect',
    element: <RedirectPage />,
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
    path: '/zigu/:nameTag/settings/layout',
    element: <ProfileLayoutPage />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/zigu',
    element: <Profile />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: ':nameTag',
        element: <ProfileLinkPage />,
      },
      {
        path: ':nameTag/settings',
        element: <ProfileSettingPage />,
        errorElement: <ErrorComponent />,
      },
      {
        path: ':nameTag/create-widget',
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
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Navigate to="/en" replace />,
      },
      {
        path: '/privacy',
        element: <Privacy />,
        errorElement: <ErrorComponent />,
      },
      {
        path: '/terms_of_use',
        element: <TandC />,
        errorElement: <ErrorComponent />,
      },
      // noFrameRoutes에 있는 경로들은 여기서 제거
      ...createLocalizedRoutes(baseRoutes),
    ],
    errorElement: <NotFound />,
  },
]);

export default Router;
