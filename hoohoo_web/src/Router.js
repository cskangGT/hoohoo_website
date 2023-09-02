import { createBrowserRouter } from "react-router-dom";
import Root from "./Root"
import NotFound from "./Component/ErrorComponent/ErrorComponent"
import ErrorComponent from "./Component/ErrorComponent/ErrorComponent";
import Main from "./Pages/IntroPage/Main";
import HomeEarthmera from "./Pages/IntroPage/HomeEarthmera";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/home",
                element: <Main />,
                errorElement: <ErrorComponent />
            },
            {
                path: "",
                element: <HomeEarthmera />,
                errorElement: <ErrorComponent />
            }
        ],
        errorElement: <NotFound />,
    }
]);


export default Router;

