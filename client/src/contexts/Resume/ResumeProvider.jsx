import { useState } from 'react'
import { callAI, uploadFile } from '../../services/apiService.js'
import { toast } from 'sonner'
import ResumeContext from './ResumeContext.jsx'
// import { setToastId } from './toastManager.js'

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
    if (!file) return toast.error('Please select a file')

    const id = toast.loading('Uploading resume...')
    // setToastId(id)

    try {
      const text = await uploadFile(file)
      setResumeText(text)
      setTimeout(() => {
        toast.success('Resume uploaded successfully', { id })
      }, 1000)
    } catch (err) {
      setTimeout(() => {
        toast.error(`Failed to upload resume: ${err.message}`, { id })
      }, 1000)
    }
  }

  const handleAI = async () => {
    if (!resumeText && !jobDesc)
      return toast.error('Please upload your resume and job description')
    if (!resumeText) return toast.error('Please upload your resume')
    if (!jobDesc) return toast.error('Please provide the job description')

    const id = toast.loading('Enhancing resume...')
    // setToastId(id)

    try {
      const res = await callAI(resumeText, jobDesc)
      setNewResume(res)
      toast.success('Resume enhanced successfully', { id })
    } catch (err) {
      setTimeout(() => {
        toast.error(`Failed to enhance resume: ${err.message}`, { id })
      }, 1000)
    }
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

export default ResumeProvider
