import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
<link rel="stylesheet" href="https://cdn.quilljs.com/1.3.6/quill.snow.css"></link>


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

