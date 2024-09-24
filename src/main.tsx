import ReactDOM from 'react-dom/client'
import AppRouter from '@/core/presentation/AppRouter'
import { AppThemeProvider } from '@/core/presentation/theme/AppThemeProvider'
import 'katex/dist/katex.min.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppThemeProvider>
    <AppRouter />
  </AppThemeProvider>,
)
