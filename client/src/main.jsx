import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

// An OAuth client ID is a public identifier, not a secret: the fallback keeps the hosted demo working when the variable is unset.
const googleClientId =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  "244835294483-81spq549d8f3b33pptema4q5paosh1nv.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
