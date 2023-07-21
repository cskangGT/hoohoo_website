import { createBrowserRouter} from "react-router-dom";
import Root from "./Root"
import NotFound from "./Component/ErrorComponent/ErrorComponent"
import ErrorComponent from "./Component/ErrorComponent/ErrorComponent";
import Main from "./Pages/IntroPage/Main";
import Home_earthmera from "./Pages/IntroPage/Home_earthmera";

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
                element: <Home_earthmera />,
                errorElement: <ErrorComponent />
            }
        ],
        errorElement: <NotFound />,
    }
]);


export default Router;

