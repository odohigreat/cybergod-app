import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Blog from './pages/blog';
import SignIn from './pages/signin';
import AllBrands from './pages/allbrands';
import Quiz from './pages/quiz';
import Result from './pages/result';
import Specs from './pages/specs';
import Compare from './pages/compare';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Global Dark Mode Initialization
if (localStorage.darkMode === 'true') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/allbrands" element={<AllBrands />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/specs" element={<Specs />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
