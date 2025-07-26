import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserAuthentication from "pages/user-authentication";
import Dashboard from "pages/dashboard";
import ScriptEditor from "pages/script-editor";
import ScriptManagement from "pages/script-management";
import ReportsAndAnalytics from "pages/reports-and-analytics";
import SettingsAndPreferences from "pages/settings-and-preferences";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/user-authentication" element={<UserAuthentication />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/script-editor" element={<ScriptEditor />} />
        <Route path="/script-management" element={<ScriptManagement />} />
        <Route path="/reports-and-analytics" element={<ReportsAndAnalytics />} />
        <Route path="/settings-and-preferences" element={<SettingsAndPreferences />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;