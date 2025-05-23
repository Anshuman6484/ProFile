import { useRef, useState } from 'react'
import { callAI, uploadFile } from '../../services/apiService.js'
import { toast } from 'sonner'
import ResumeContext from './ResumeContext.jsx'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
// import { setToastId } from './toastManager.js'

function ResumeProvider({ children }) {
  const [file, setFile] = useState(null)
  const [resumeText, setResumeText] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [newResume, setNewResume] = useState('')
  const [mode, setMode] = useState('balanced')

  const pdfRef = useRef()

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleJobDescChange = (e) => {
    setJobDesc(e.target.value)
  }

  const handleDownload = async () => {
    if (!pdfRef.current) return toast.error('Nothing to download!')
    const id = toast.loading('Generating PDF...')
    try {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
       })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save('tailored-resume.pdf')
      toast.success('PDF downloaded successfully', { id })
    } catch (err) {
      toast.error(`Failed to generate PDF: ${err.message}`, { id })
    }
  }

  const handleCopy = async (text) => {
    if (!text) return toast.error('Nothing to copy!')
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard')
    } catch (err) {
      toast.error(`Failed to copy: ${err.message}`)
    }
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
      const res = await callAI(resumeText, jobDesc, mode)
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
          pdfRef,
          mode,
          setMode,
          setNewResume,
          handleCopy,
          handleFileChange,
          handleJobDescChange,
          handleUpload,
          handleAI,
          handleDownload,
        }}
      >
        {children}
      </ResumeContext.Provider>
    </>
  )
}

export default ResumeProvider
