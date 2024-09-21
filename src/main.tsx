import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from '@/core/presentation/AppRouter'
import { AppThemeProvider } from '@/core/presentation/theme/AppThemeProvider'
import 'katex/dist/katex.min.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppThemeProvider>
      <AppRouter />
    </AppThemeProvider>
  </React.StrictMode>,
)
