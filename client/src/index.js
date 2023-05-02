import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import LogIn from './pages/Authentication/LogIn';
import SignIn from './pages/Authentication/SignIn';


import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//all for admin
import Adminapp from './pages/admin/AdminApp';
import AdminProgram from './pages/admin/ManageProgram/AdminAllProgram';
import AdminAddProgram from './pages/admin/ManageProgram/AdminAddProgram';
import EditProgram from './pages/admin/ManageProgram/AdminEditProgram';
import AdminSeeComments from './pages/admin/ManageUser/AdminSeeComments';
import AdminAddUser from './pages/admin/ManageUser/AdminAddUser';
import AdminCrud from './pages/admin/ManageAdmin/AdminCrud';



const appRouter = createBrowserRouter([
  {
    path: "/LogIn",
    element: <LogIn />
  },
  {
    path: "/SignIn",
    element: <SignIn />
  },
  {
    path: "/",
    element: <App />,
  },
      {
        path: "/admin",
        element:<Adminapp />,
        children: [
          {
            path:"MangeAdmin",
            element:<AdminCrud />
          },
          {
            path: "Program",
            children: [
              {
                path: "",
                element: <AdminProgram />
              },
              {
                path: "Addprogram",
                element: <AdminAddProgram />
              }
              ,
              {
                path: "EditProgram/:id",
                element: <EditProgram />
              }
            ]
            ,
          }
          ,
          {
            path: "User",
            children: [
              {
                path: "",
                element: <AdminSeeComments />
    
              },
              {
                path: "MangeUser",
                element: <AdminAddUser />
              }
            ]
          }
        ]
      }

    
  

  
  


])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={appRouter}></RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
