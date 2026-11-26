import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './context/UserContext';
import { AvisoProvider } from './context/AvisoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <AvisoProvider>
            <App />
        </AvisoProvider>
    </UserProvider>
);
