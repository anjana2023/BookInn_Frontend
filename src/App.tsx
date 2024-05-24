import {Toaster} from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'
import {BrowserRouter} from 'react-router-dom'
import './App.css'

import store,{persistor} from './redux/store/store'
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React from 'react'
import { MainRouter } from './routes'


function App() {
    return (
      <>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <GoogleOAuthProvider clientId="795475586008-7gksni89s7ohmd400mbb2a57cn00knfh.apps.googleusercontent.com">
              <BrowserRouter>
                <MainRouter />
              </BrowserRouter>
            </GoogleOAuthProvider>
            <Toaster />
          </PersistGate>
        </Provider>
      </>
    );
  }
  

  export default App