import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ResumeProvider from './contexts/Resume/ResumeProvider.jsx'
import { ThemeProvider } from './components/ui/theme-provider.jsx'
import { Toaster } from '@/components/ui/sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ResumeProvider>
        <App />
        <Toaster />
      </ResumeProvider>
    </ThemeProvider>
  </StrictMode>
)
