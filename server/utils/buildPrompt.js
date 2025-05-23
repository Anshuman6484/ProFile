const buildPrompt = (resume, jobDescription, mode) => {
  let styleNote = ''

  switch (mode) {
    case 'conservative':
      styleNote =
        'Make only minor wording improvements. Keep the structure mostly the same.'
      break
    case 'aggressive':
      styleNote =
        'Aggressively rewrite the resume to fully match the job description, even if it means restructuring sections.'
      break
    default:
      styleNote =
        'Rewrite the resume to align well with the job description while preserving its original tone.'
  }

  return `
You are a professional resume rewriting assistant.

Here is the resume:
${resume}

Here is the job description:
${jobDescription}

${styleNote}
Output the improved resume as clean text, well-organized and professional.
`
}

export default buildPrompt
