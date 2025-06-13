import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes, } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Blog from './pages/blog';
import SignIn from './pages/signin';
import AllBrands from './pages/allbrands';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/allbrands" element={<AllBrands />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
