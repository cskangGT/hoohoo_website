import { createBrowserRouter} from "react-router-dom";
import Root from "./Root"
import NotFound from "./Component/ErrorComponent/ErrorComponent"
import ErrorComponent from "./Component/ErrorComponent/ErrorComponent";
import Main from "./Pages/IntroPage/Main";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Main />,
                errorElement: <ErrorComponent />
            },
        ],
        errorElement: <NotFound />,
    }
]);


export default Router;

