import React from "react";
import ReactDOM from "react-dom/client";
import { IconContext } from "react-icons";
import App from "./App.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* כל האייקונים של react-icons מוסתרים מקורא המסך: הם קישוטיים, והשם נמצא על הכפתור או הקישור */}
    <IconContext.Provider value={{ attr: { "aria-hidden": "true" } }}>
      <App />
    </IconContext.Provider>
  </React.StrictMode>
);