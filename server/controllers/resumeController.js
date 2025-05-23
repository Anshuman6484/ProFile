import pdf from 'pdf-parse-fork'
import { callAI } from '../services/AIService.js'

export const uploadResume = async (req, res) => {
  try {
    const data = await pdf(req.file.buffer)
    res.json({ text: data.text })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const askAI = async (req, res) => {
  try {
    const { resume, jobDescription, mode } = req.body
    if (!resume || !jobDescription) {
      return res
        .status(400)
        .json({ error: 'Missing resume or job description' })
    }
    const output = await callAI(resume, jobDescription, mode)
    res.json({ output })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
