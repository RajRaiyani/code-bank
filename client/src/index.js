import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import "./scss/common.scss"


import MainApp from './Layouts/MainApp';

import Home from './pages/Home';
import LogIn from './pages/Authentication/LogIn';
import QuestionById from './pages/QuestionById';



import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<MainApp />,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/Question/:id",
        element:<QuestionById />
      }
    ],
  },
  {
    path:"/LogIn",
    element:<LogIn />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <RouterProvider router={appRouter} />
  </>
);


