import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('@/habit_tracker/home/Home'))
const Settings = lazy(() => import('@/habit_tracker/Settings'))
const AppPage = lazy(() => import('@/habit_tracker/App'))

export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/app" element={<AppPage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}
