import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
import { Auth0Provider } from "@auth0/auth0-react"

const domain = "dev-w7li5qg5.us.auth0.com"
const clientId = "JMfvxTVpFYDflh7VUWw4D6NKyPd7GUK0"

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Auth0Provider>,
  document.getElementById('root')
);

