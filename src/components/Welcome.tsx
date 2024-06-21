// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <WelcomeSnippet>
import {
  Button,
  Container
} from 'react-bootstrap';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { useAppContext } from './AppContext';
import Table from './Table';

export default function Welcome() {
  const app = useAppContext();

  return (
    <div className="p-5 mb-4 bg-light rounded-3">
      <Container fluid>
        <h1>React Graph</h1>
        <p className="lead">
          Teste para usar Microsoft Graph API com React
        </p>
        <AuthenticatedTemplate>
          <div>
            <h4>Oi, {app.user?.displayName || ''}!</h4>
          </div>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Button color="primary" onClick={app.signIn!}>Click here to sign in</Button>
        </UnauthenticatedTemplate>
        <p>{app.user?.displayName || 'se loga!'}</p>
        <Table/>
      </Container>
    </div>
  );
}
// </WelcomeSnippet>