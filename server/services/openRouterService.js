import axios from 'axios'

export const callAI = async (resume, jobDescription) => {
  const prompt = `You are a professional resume editor. Your task is to take the resume and job description and return a new resume that is more relevant to the job. The resume is: ${resume}. The job description is: ${jobDescription}.`

  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'nousresearch/deephermes-3-mistral-24b-preview:free',
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
