import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import AddProduct from './Componet/AddProduct';
import './index.css';
import './flags.css';
import {Provider} from "react-redux"
import { store } from './Store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <App />
    </Provider>
  
);


reportWebVitals();
