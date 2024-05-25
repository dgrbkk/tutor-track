import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import {
    Lesson,
    ProtectedRoute,
    Lessons,
    Profile,
    Payments,
    DaySchedule,
    Student,
    Auth,
    Forms,
    Bibliographies
} from "./common/components.js"


const router = createBrowserRouter([

    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/login',
                element: <Auth/>,
            },
            {
                path: '*',
                element:  <Navigate to={"/profile"}/>,
            },
            {
                path: '/register',
                element: <Auth/>,
            },
            {
                path: '/',
                element: <ProtectedRoute/>,
                children: [
                    {
                        path: '/profile',
                        element: <Profile/>,
                    },
                    {
                        path: '/schedule',
                        element: <DaySchedule/>,
                    },
                    {
                        path: '/lesson-add',
                        element: <Forms/>,
                    },
                    {
                        path: '/bibliography-add',
                        element: <Forms/>,
                    },
                    {
                        path: '/student-add',
                        element: <Forms/>,
                    },
                    {
                        path: '/material-add',
                        element: <Forms/>,
                    },
                    {
                        path: '/bibliographies',
                        element: <Bibliographies/>,
                    },
                    {
                        path: '/lesson/:id',
                        element: <Lesson/>,
                    },
                    {
                        path: '/lessons',
                        element: <Lessons/>,
                    },
                    {
                        path: '/payments',
                        element: <Payments/>,
                    },
                    {
                        path: '/student/:id',
                        element: <Student/>,
                    },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
