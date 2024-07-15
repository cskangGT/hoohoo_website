import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Root from "./Root"
import NotFound from "./Component/ErrorComponent/ErrorComponent"
import ErrorComponent from "./Component/ErrorComponent/ErrorComponent";
import HomeEarthmera from "./Pages/Home/HomeEarthmera";
import OurTeam from "./Pages/About/OurTeam/OurTeam";
import Partnership from "./Pages/Partnership/B2B/Partnership";
import MainDropB from "./Pages/DropB/MainDropB";
import Blog from "./Pages/Info/Blog/Blog";
import AdminLogin from "./Pages/Admin/AdminLogin";
import BlogDetail from "./Pages/Info/Blog/BlogDetail";
import ComingSoon from "./Component/ErrorComponent/ComingSoon";
import Privacy from "./Pages/Legal/Privacy";
import TandC from "./Pages/Legal/T&C";
import EarlySignUp from "./Pages/LandingPage/EarlySignUp";
import Platform from "./Pages/Partnership/B2C/Platform";

import EarthMeraVision from "./Pages/About/Vision/EarthMeraVision";
import ContactPage from "./Pages/Info/Contact/ContactPage";
import EMTicketeer from "./Pages/Partnership/ticketeer/EMTicketeer";
import Countdown from "./Pages/Home/Countdown";
import RedirectPage from "./Pages/Info/Redirection/RedirectPage";
const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Countdown />,
                errorElement: <ErrorComponent />
            },
            // {
            //     path: "/vision",
            //     element: <EarthMeraVision />,
            //     errorElement: <ErrorComponent />
            // },
            // {
            //     path: "/about_team",
            //     element: <OurTeam />,
            //     errorElement: <ErrorComponent />
            // },
            // {
            //     path: "/partnership",
            //     element: <Partnership />,
            //     errorElement: <ErrorComponent />
            // },
            // {
            //     path: "/platform",
            //     element: <Platform />,
            //     errorElement: <ErrorComponent />
            // },
            // {
            //     path: "/ticketeer",
            //     element: <EMTicketeer />,
            //     errorElement: <ErrorComponent />
            // },
            // {
            //     path: "/dropb",
            //     element: <MainDropB />,
            //     errorElement: <ErrorComponent />
            // },
            // {
            //     path: "/blog",
            //     element: <Blog />,
            //     errorElement: <ErrorComponent />
            // },
            // {
            //     path: "/admin",
            //     element: <AdminLogin />,
            //     errorElement: <ErrorComponent />
            // }, {
            //     path: "/blog/:id",
            //     element: <BlogDetail />,
            //     errorElement: <ErrorComponent />
            // }, 
            // {
            //     path: "/contact",
            //     element: <ContactPage />,
            //     errorElement: <ErrorComponent />
            // }, 
            {
                path: "/privacy",
                element: <Privacy />,
                errorElement: <ErrorComponent />
            }, 
            {
                path: "/term_of_use",
                element: <TandC />,
                errorElement: <ErrorComponent />
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
                path: "/redirect",
                element: <RedirectPage />,
                errorElement: <ErrorComponent />
            }
        ],
        errorElement: <NotFound />,
    }
]);


export default Router;

