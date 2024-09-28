import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/joy/styles";
import AuthPage from "./components/AuthPage";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Router>
        <Routes>
          {/* <Route path="/homepage" element={<LandingPage />} /> */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </Router>
    </StyledEngineProvider>
  );
};

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
