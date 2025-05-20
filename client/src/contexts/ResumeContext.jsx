import { createContext, useEffect, useState } from 'react'
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
    console.log('File uploaded')
  }

  const handleAI = async () => {
    if (!resumeText || !jobDesc)
      return alert('Please upload both resume and job description')

    setNewResume('Enhancing...')
    const res = await callAI(resumeText, jobDesc)
    console.log('res', res)
    setNewResume(res)
    console.log('Enhanced resume:', newResume)
  }

  useEffect(() => {
    console.log('Updated newResume:', newResume)
  }, [newResume])

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
