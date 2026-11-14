import React from "react";
import ReactDOM from "react-dom/client";
import { IconContext } from "react-icons";
import App from "./App.jsx";
import { AccessibilityProvider } from "./accessibility/AccessibilityContext";
import AccessibilityMenu from "./accessibility/AccessibilityMenu";
import "./App.css";

if (!window.__FRAME_BREAKOUT__) ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <IconContext.Provider value={{ attr: { "aria-hidden": "true" } }}>
      <AccessibilityProvider>
        <App />
        <AccessibilityMenu />
      </AccessibilityProvider>
    </IconContext.Provider>
  </React.StrictMode>
);