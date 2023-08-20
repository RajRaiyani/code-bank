import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import "./scss/common.scss"

import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import MainApp from './Layouts/MainApp';

import Home from './pages/Home';
import LogIn from './pages/Authentication/LogIn';
import SignIn from './pages/Authentication/SignIn';
import QuestionById from './pages/QuestionById';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';

import Exampal from './pages/Exampal';
import Try from './try';





const AdminApp = lazy(()=>import("./Layouts/AdminApp"));
const Dashboard = lazy(()=>import("./pages/Admin/Dashboard/Dashboard"))
const Question = lazy(()=>import("./pages/Admin/Question/Question"));
const User = lazy(()=>import("./pages/Admin/User/User"));
const AddEditQuestion = lazy(()=>import("./pages/Admin/Question/AddEditQuestion"));
const AddEditSolution = lazy(()=>import("./pages/Admin/Question/Solution/AddEditSolution"));
const Other = lazy(()=>import("./pages/Admin/Other/Other"));


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<MainApp />,
    children:[
      {path:"/",element:<Home />},
      {path:"/question/:id",element:<QuestionById admin={false} />},
      {path:"/contact",element:<Contact />},
      {path:"/about",element:<About />},
    ],
  },
  {path:"/LogIn",element:<LogIn />},
  {path:"/SignIn",element:<SignIn />},
  {
    path:"/admin",
    element:<Suspense><AdminApp /></Suspense>,
    children:[
      {path:"",element:<Dashboard />},
      {path:"question",element:<Question />},
      {path:"user",element:<User />},
      {path:"other",element:<Other />},
      {path:"question/add",element:<AddEditQuestion edit={false} />},
      {path:"question/:id",element:<QuestionById admin />},
      {path:"question/:id/edit",element:<AddEditQuestion edit />},
      {path:"solution/:id/add",element:<AddEditSolution edit={false} />},
      {path:"solution/:id/edit",element:<AddEditSolution edit />},
    ] 
  },
  {path:"/exampal",element:<Try />},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <RouterProvider router={appRouter} />
  </>
);


