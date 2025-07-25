import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {AppContainer} from "./router/AppContainer";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {persistor, store} from "./store/store";
import {PersistGate} from 'redux-persist/integration/react';

import './i18n'

ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppContainer/>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
