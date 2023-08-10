import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import "./scss/common.scss"


import MainApp from './Layouts/MainApp';

import Home from './pages/Home';
import LogIn from './pages/Authentication/LogIn';
import QuestionById from './pages/QuestionById';


import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const AdminApp = lazy(()=>import("./Layouts/AdminApp"));
const Dashboard = lazy(()=>import("./pages/Admin/Dashboard/Dashboard"))
const Question = lazy(()=>import("./pages/Admin/Question/Question"));
const User = lazy(()=>import("./pages/Admin/User/User"));


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<MainApp />,
    children:[
      {path:"/",element:<Home />},
      { path:"/Question/:id",element:<QuestionById />}
    ],
  },
  {
    path:"/LogIn",
    element:<LogIn />
  },
  {
    path:"/admin",
    element:<Suspense><AdminApp /></Suspense>,
    children:[
      {path:"",element:<Dashboard />},
      {path:"question",element:<Question />},
      {path:"user",element:<User />}
    ] 
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <RouterProvider router={appRouter} />
  </>
);


