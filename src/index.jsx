import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/joy/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import Homepage from "./Pages/Homepage";
import PropertyPage from "./Pages/PropertyPage";
import PostProperty from "./Pages/PostProperty";

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Router>
        <Routes>
          {/* <Route path="/homepage" element={<LandingPage />} /> */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/property/:id" element={<PropertyPage />} />
          <Route path="/posting" element={<PostProperty />} />
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
