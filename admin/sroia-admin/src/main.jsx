import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './app/store.js'
import App from './App.jsx'
import './App.css'
import { applyTheme, getTheme } from './features/appearance/theme'

// ערכת הצבעים שנבחרה (ירוק/כחול) - לפני שהדף מוצג, כדי שלא יהבהב ירוק
applyTheme(getTheme())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)