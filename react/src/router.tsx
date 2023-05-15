import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login.tsx";
import Dashboard from "./views/Dashboard.tsx";
import Surveys from "./views/Surveys.tsx";
import SignUp from "./views/SignUp.tsx";
import GuestLayout from "./components/GuestLayout.tsx";
import DefaultLayout from "./components/DefaultLayout.tsx";
import SurveyView from "./views/SurveyView.tsx";


const router = createBrowserRouter([

    {
        path:'/',
        element:<DefaultLayout />,
        children:[
            {
                path:'/dashboard',
                element: <Navigate to="/" />
            },
            {
                path:'/',
                element: <Dashboard />
            },

            {
                path:'/surveys',
                element: <Surveys />
            },
            {
                path:'/surveys/create',
                element: <SurveyView />
            },
        ]
    },
    {
        path:'/',
        element: <GuestLayout />,
        children:[
            {
                path:'/login',
                element: <Login />
            },

            {
                path:'/signup',
                element: <SignUp />
            }
        ]
    }

])


export default router;
