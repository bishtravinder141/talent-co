import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
// import { MsalProvider } from "@azure/msal-react";
import { googleClientID, msalInstance } from "./src/config/authConfig";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
// import { store } from "./src/redux/store";

const customRender = (ui, options) =>
  render(ui, {
    wrapper: (props) => (
      <BrowserRouter>
        {/* To do (for test cases with redux implementation ) */}
        {/* <Provider store={store}> */}
        {/* <GoogleOAuthProvider clientId={typeof googleClientID === 'string' ? googleClientID: ""}> */}
        <GoogleOAuthProvider clientId="963289612234-0hfci1mgsjnennmkcs123196hgd6bqbc.apps.googleusercontent.com">
          {/* <MsalProvider instance={msalInstance}> */}
          {props.children}
          {/* </MsalProvider> */}
        </GoogleOAuthProvider>
        {/* </Provider> */}
      </BrowserRouter>
    ),
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
