import axios from './axios.js'
import removeMarkdown from 'remove-markdown'

export const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append('resume', file)
  const res = await axios.post('/upload', formData)
  if (res.data?.error) {
    throw new Error(res.data.error)
  }
  return res.data.text
}

export const callAI = async (resumeText, jobDesc, mode) => {
  const res = await axios.post('/ai', {
    resume: resumeText,
    jobDescription: jobDesc,
    mode,
  })
  const output = res.data?.output
  if (!output) {
    throw new Error(res.data?.error || 'AI call failed')
  }
  return removeMarkdown(output)
}
