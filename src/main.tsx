import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/core/presentation/App'
import { AppThemeProvider } from '@/core/presentation/theme/AppThemeProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </React.StrictMode>,
)
