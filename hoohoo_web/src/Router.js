import { createBrowserRouter } from "react-router-dom";
import Root from "./Root"
import NotFound from "./Component/ErrorComponent/ErrorComponent"
import ErrorComponent from "./Component/ErrorComponent/ErrorComponent";
import HomeEarthmera from "./Pages/IntroPage/HomeEarthmera";
import OurTeam from "./Pages/About/OurTeam";
import AboutEarthmera from "./Pages/About/AboutEarthmera";
import Partnership from "./Pages/Partnership/Partnership";
import MainDropB from "./Pages/DropB/MainDropB";
import Blog from "./Pages/Blog/Blog";
const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            // {
            //     path: "/home",
            //     element: <Main />,
            //     errorElement: <ErrorComponent />
            // },
            {
                path: "/",
                element: <HomeEarthmera />,
                errorElement: <ErrorComponent />
            },
            {
                path: "/home",
                element: <HomeEarthmera />,
                errorElement: <ErrorComponent />
            },
            {
                path: "/about_earthmera",
                element: <AboutEarthmera />,
                errorElement: <ErrorComponent />
            },
            {
                path: "/about_team",
                element: <OurTeam />,
                errorElement: <ErrorComponent />
            },
            {
                path: "/partnership",
                element: <Partnership />,
                errorElement: <ErrorComponent />
            },
            {
                path: "/dropb",
                element: <MainDropB />,
                errorElement: <ErrorComponent />
            },
            {
                path: "/blog",
                element: <Blog />,
                errorElement: <ErrorComponent />
            }
        ],
        errorElement: <NotFound />,
    }
]);


export default Router;

