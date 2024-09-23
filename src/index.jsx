import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/joy/styles";
import App from "./SignIn";
import AuthPage from "./components/AuthPage";

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      {/* <App /> */}
      <AuthPage />
    </StyledEngineProvider>
  </React.StrictMode>
);
