import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import {
  default as ErrorComponent,
  default as NotFound,
} from './Component/ErrorComponent/ErrorComponent';
import OurTeam from './Pages/About/OurTeam/OurTeam';
import AdminLogin from './Pages/Admin/AdminLogin';
import MainDropB from './Pages/DropB/MainDropB';
import HomeEarthmera from './Pages/Home/HomeEarthmera';
import Blog from './Pages/Info/Blog/Blog';
import BlogDetail from './Pages/Info/Blog/BlogDetail';
import Privacy from './Pages/Legal/Privacy';
import TandC from './Pages/Legal/T&C';
import Partnership from './Pages/Partnership/B2B/Partnership';
import Platform from './Pages/Partnership/B2C/Platform';
import Root from './Root';

import EarthMeraVision from './Pages/About/Vision/EarthMeraVision';
import ContactPage from './Pages/Info/Contact/ContactPage';
import SupportingPage from './Pages/Info/Contact/SupportingPage';
import RedirectPage from './Pages/Info/Redirection/RedirectPage';
import EMTicketeer from './Pages/Partnership/ticketeer/EMTicketeer';
import Countdown from './Pages/Home/Countdown';
const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <HomeEarthmera />,
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
        path: '/blog',
        element: <Blog />,
        errorElement: <ErrorComponent />,
      },
      {
        path: '/admin',
        element: <AdminLogin />,
        errorElement: <ErrorComponent />,
      },
      {
        path: '/blog/:id',
        element: <BlogDetail />,
        errorElement: <ErrorComponent />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
        errorElement: <ErrorComponent />,
      },
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
      // {
      //     path: "/submitform",
      //     element: <EarlySignUp />,
      //     errorElement: <ErrorComponent />
      // },{
      //     path: "/coming_soon",
      //     element: <ComingSoon />,
      //     errorElement: <ErrorComponent />
      // },
      {
        path: '/redirect',
        element: <RedirectPage />,
        errorElement: <ErrorComponent />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default Router;
