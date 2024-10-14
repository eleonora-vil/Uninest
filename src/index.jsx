import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/joy/styles";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AuthPage from "./Pages/AuthPage/AuthPage";
import Homepage from "./Pages/Homepage/Homepage";
import PropertyPage from "./Pages/DetailProperty/PropertyPage";
import PostProperty from "./Pages/PostProperty/PostProperty";
import PropertyList from "./Pages/PropertyList/PropertyListPage";
import DashboardDefault from "./Pages/Dashboard";
import ServiceList from "./Pages/ServiceList/PropertyListPage";
import UserProfile from "./Pages/UserProfile/UserProfile";
import useUniqueVisitorTracker from "./hooks/useVisitorTracking"; // Import the hook we created earlier

const AppContent = () => {
  const location = useLocation();
  const uniqueVisitors = useUniqueVisitorTracker();

  React.useEffect(() => {
    // This effect will run on every route change
    console.log(`Page viewed: ${location.pathname}`);
    console.log(`Unique visitors: `, uniqueVisitors);
  }, [location, uniqueVisitors]);

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<Homepage />} />
      <Route path="/property/:id" element={<PropertyPage />} />
      <Route path="/posting" element={<PostProperty />} />
      <Route path="/listing" element={<PropertyList />} />
      <Route path="/Dashboard" element={<DashboardDefault />} />
      <Route path="/services" element={<ServiceList />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
};

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Router>
        <AppContent />
      </Router>
    </StyledEngineProvider>
  );
};

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
