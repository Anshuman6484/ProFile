import axios from './axios.js'
import removeMarkdown from 'remove-markdown'

export const uploadFile = async (file) => {
  try {
    const formData = new FormData()
    formData.append('resume', file)
    const res = await axios.post('/upload', formData)
    return res.data.text || res.data.error
  } catch (err) {
    return 'Upload failed ' + (err.response?.data?.error || err.message)
  }
}

export const callAI = async (resumeText, jobDesc) => {
  try {
    const res = await axios.post('/ai', {
      resume: resumeText,
      jobDescription: jobDesc,
    })
    const output = res.data?.output || res.data?.error || 'No response from AI'
    return removeMarkdown(output)
  } catch (err) {
    const errMsg = err.response?.data?.error || err.message || 'Unknown error'
    return `AI call failed ${errMsg}`
  }
}
