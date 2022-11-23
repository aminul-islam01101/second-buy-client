import { CssBaseline } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import 'react-day-picker/dist/style.css';
import ReactDOM from 'react-dom/client';

// app

import App from './App';
import Theme from './assets/styles/CustomMui';
// styles

import './index.css';
import UserContext from './Contexts/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserContext>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={Theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </StyledEngineProvider>
        </UserContext>
    </React.StrictMode>
);
