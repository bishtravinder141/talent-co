import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MsalProvider } from "@azure/msal-react";
import { googleClientID, msalInstance } from "./config/authConfig.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
// import { ErrorBoundary } from "react-error-boundary";

// function ErrorFallback({ error }) {
//   return (
//     <div>
//       <h2>Something went wrong:</h2>
//       <p>{console.log(error.message)}</p>
//     </div>
//   );
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    {/* <ErrorBoundary FallbackComponent={ErrorFallback}> */}
    <BrowserRouter>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={googleClientID}>
          <MsalProvider instance={msalInstance}>
            <App />
          </MsalProvider>
        </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
    {/* </ErrorBoundary> */}
  </>
);
