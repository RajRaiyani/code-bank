import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App";
import LogIn from "./pages/Authentication/LogIn";
import SignIn from "./pages/Authentication/SignIn";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//all for admin
import Adminapp from "./pages/admin/AdminApp";
// import AdminAddProgram from './pages/admin/ManageProgram/AdminMangeProgram';
import EditProgram from "./pages/admin/ManageProgram/AdminEditProgram";
import AdminSeeComments from "./pages/admin/ManageUser/AdminSeeComments";
import AdminUser from "./pages/admin/ManageUser/AdminUser";
import UserApp from "./pages/Users/Userapp";
import Question from "./utilities/QuestionById";
import UserHome from "./pages/Users/UserHome";
import Adminhome from "./pages/admin/AdminHome";
import CreateList from "./pages/List/createList";
import MangeLanguge from "./pages/admin/utilities/AddDeleteLanguage";

import AddQuestion from "./pages/admin/ManageProgram/AddQuestion";
import MangeCatagroy from "./pages/admin/utilities/AddDeleteCatagrory.js";
import QuestionByIDAdmin from "./pages/admin/ManageProgram/AdminQuestionId";
import AdminAddProgram from "./pages/admin/ManageProgram/AdminMangeProgram";
import Try from "./try";

const appRouter = createBrowserRouter([
  // {
  //   path:"/rp",
  //   element:<AddQuestion />
  // },
  {
    path: "/LogIn",
    element: <LogIn />,
  },
  {
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <Adminapp />,
    children: [
      {
        path: "",
        element: <Adminhome />,
      },

      {
        path: "Program",
        children: [
          {
            path: "",
            element: <AdminAddProgram />,
          },
          {
            path: "AddQuestion",
            element: <AddQuestion />,
          },

          {
            path: "MangeCatagory",
            element: <MangeCatagroy />,
          },
          {
            path: "MangeLanguage",
            element: <MangeLanguge />,
          },
          {
            path: "EditProgram/:id",
            element: <EditProgram />,
          },
          {
            path: ":id",
            element: <QuestionByIDAdmin />,
          },
        ],
      },
      {
        path: "HandleUSer",
        children: [
          {
            path: "",
            element: <AdminSeeComments />,
          },
          {
            path: "MangeUser",
            element: <AdminUser />,
          },
        ],
      },
    ],
  },
  {
    path: "/User",
    element: <UserApp />,
    children: [
      {
        path: "home",
        element: <UserHome></UserHome>,
      },
      {
        path: "/User/Question/:id",
        element: <Question />,
      },
    ],
  },
  {
    path: "/try",
    element: <Try />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}></RouterProvider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
