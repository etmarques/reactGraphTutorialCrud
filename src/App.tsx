// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { MsalProvider } from '@azure/msal-react'
import { IPublicClientApplication } from '@azure/msal-browser';

import ProvideAppContext from './components/AppContext';
import ErrorMessage from './components/ErrorMessage';
import NavBar from './components/NavBar';
import Welcome from './components/Welcome';
import 'bootstrap/dist/css/bootstrap.css';

// <AppPropsSnippet>
type AppProps = {
  pca: IPublicClientApplication
};
// </AppPropsSnippet>

export default function App({ pca }: AppProps): JSX.Element {
  return (
    <MsalProvider instance={pca}>
      <ProvideAppContext>
        <Router>
          <NavBar />
          <Container>
            <ErrorMessage />
            <Routes>
              <Route path="/"
                element={
                  <Welcome />
                } />
            </Routes>
          </Container>
        </Router>
      </ProvideAppContext>
    </MsalProvider>
  );
}