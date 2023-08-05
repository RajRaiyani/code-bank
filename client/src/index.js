import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';


import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<App />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <RouterProvider router={appRouter} />
  </>
);


