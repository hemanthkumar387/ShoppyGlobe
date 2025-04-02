import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux"; // Importing Provider to enable Redux store access throughout the app
import { store } from "./utils/appStore"; // Importing the Redux store

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Provides the Redux store to the entire app */}
    <App />
    </Provider>
  </StrictMode>,
)
