import axios from 'axios'
import buildPrompt from '../utils/buildPrompt.js'

export const callAI = async (resume, jobDescription, mode) => {
  const prompt = buildPrompt(resume, jobDescription, mode)

  const response = await axios.post(
    `${process.env.AI_API_URL}`,
    {
      model: `${process.env.AI_MODEL}`,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful resume rewriting assistant.',
        },
        { role: 'user', content: prompt },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  )
  const data = response.data
  return data.choices[0].message.content
}
