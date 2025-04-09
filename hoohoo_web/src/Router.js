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
import Partnership from './Pages/Partnership/B2B/Partnership';
import Platform from './Pages/Partnership/B2C/Platform';
import EMTicketeer from './Pages/Partnership/ticketeer/EMTicketeer';
import ZiguPage from './Pages/Partnership/ZiguPage';
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

const noFrameRoutes = [
  {
    path: '/redirect',
    element: <RedirectPage />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/zigu',
    element: <ZiguPage />,
    errorElement: <ErrorComponent />,
  },
];
const Router = createBrowserRouter([
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
