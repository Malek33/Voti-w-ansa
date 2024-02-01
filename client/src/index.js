import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import P404 from './components/404';
import OrganizationsHome from './components/OrganizationsHome';
import UserOrganizations from './components/UserOrganizations';


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <P404/>,
  },
  {
    path: "/login",
    element: <Login/>,
    errorElement: <P404/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
    errorElement: <P404/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
    errorElement: <P404/>,
  },
  {
    path: "/Home",
    element: <OrganizationsHome/>,
    errorElement: <P404/>,
  },
  {
    path: "/addOrg",
    element: <UserOrganizations/>,
    errorElement: <P404/>,
  },
]);

root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

