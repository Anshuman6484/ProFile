import { createContext, useState } from 'react'
import { callAI, uploadFile } from '../services/apiService.js'
import { toast } from 'sonner'
import { setToastId, getToastId } from './toastManager.js'

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
    const oldId = getToastId()
    if (oldId)  toast.dismiss(oldId)

    if (!file) return toast.error('Please select a file')

    const id = toast.loading('Uploading resume...')
    setToastId(id)

    try {
      const text = await uploadFile(file)
      setResumeText(text)
      setTimeout(() => {
        toast.success('Resume uploaded successfully', { id })
      }, 1000)
    } catch (err) {
      toast.error(`Failed to upload resume: ${err.message}`, { id })
    }
  }

  const handleAI = async () => {
    const oldId = getToastId()
    if (oldId) toast.dismiss(oldId)

    if (!resumeText && !jobDesc)
      return toast.error('Please upload your resume and job description')
    if (!resumeText) return toast.error('Please upload your resume')
    if (!jobDesc) return toast.error('Please provide the job description')

    const id = toast.loading('Enhancing resume...')
    setToastId(id)

    try {
      const res = await callAI(resumeText, jobDesc)
      toast.success('Resume enhanced successfully', { id })
      setNewResume(res)
    } catch (err) {
      toast.error(`Failed to enhance resume: ${err.message}`, { id })
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

export { ResumeContext, ResumeProvider }
