import React from "react";
import ReactDOM from "react-dom/client";
import { IconContext } from "react-icons";
import App from "./App.jsx";
import { AccessibilityProvider } from "./accessibility/AccessibilityContext";
import AccessibilityMenu from "./accessibility/AccessibilityMenu";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* כל האייקונים של react-icons מוסתרים מקורא המסך: הם קישוטיים, והשם נמצא על הכפתור או הקישור */}
    <IconContext.Provider value={{ attr: { "aria-hidden": "true" } }}>
      {/* הגדרות הנגישות זמינות לכל האתר, והכפתור מופיע בכל הדפים */}
      <AccessibilityProvider>
        <App />
        <AccessibilityMenu />
      </AccessibilityProvider>
    </IconContext.Provider>
  </React.StrictMode>
);