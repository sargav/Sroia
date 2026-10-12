import React from "react";
import ReactDOM from "react-dom/client";
import { IconContext } from "react-icons";
import App from "./App.jsx";
import { AccessibilityProvider } from "./accessibility/AccessibilityContext";
import AccessibilityMenu from "./accessibility/AccessibilityMenu";
import "./App.css";

// אם הדף נטען בתוך חלון התשלום, הסקריפט ב-index.html כבר מעביר את החלון הראשי לכתובת הזו.
// אין טעם לטעון את כל האתר בתוך ה-iframe בינתיים
if (!window.__FRAME_BREAKOUT__) ReactDOM.createRoot(document.getElementById("root")).render(
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