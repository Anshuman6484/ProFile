import { createContext, useState } from 'react'
import { callAI, uploadFile } from '../services/apiService.js'

const ResumeContext = createContext()

function ResumeProvider({ children }) {
  const [file, setFile] = useState(null)
  const [resumeText, setResumeText] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [newResume, setNewResume] = useState('')

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleJobDescChange = (e) => {
    setJobDesc(e.target.value)
  }

  const handleUpload = async () => {
    if (!file) return alert('Please upload a file!')
    setResumeText(await uploadFile(file))
  }

  const handleAI = async () => {
    if (!resumeText || !jobDesc)
      return alert('Please upload both resume and job description')

    setNewResume('Enhancing...')
    setNewResume(await callAI(resumeText, jobDesc))
  }
  return (
    <>
      <ResumeContext.Provider
        value={{
          resumeText,
          jobDesc,
          newResume,
          handleFileChange,
          handleJobDescChange,
          handleUpload,
          handleAI,
        }}
      >
        {children}
      </ResumeContext.Provider>
    </>
  )
}

export { ResumeContext, ResumeProvider }
