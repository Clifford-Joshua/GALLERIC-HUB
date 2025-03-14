import { StrictMode } from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const domain = import.meta.env.VITE_AUTH0_DOMAIN;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={`${domain}`}
      clientId={`${clientId}`}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </StrictMode>
);
