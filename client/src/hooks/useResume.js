import { useContext } from 'react'
import ResumeContext from '../contexts/Resume/ResumeContext'

function useResume() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error('ResumeContext was used outside of its Provider')
  }
  return context
}
export { useResume }
