import { useResume } from '../hooks/useResume.js'

function UploadResume() {
  const {
    jobDesc,
    newResume,
    handleAI,
    handleFileChange,
    handleJobDescChange,
    handleUpload,
  } = useResume()
  return (
    <div className="p-4">
      <h2 className="mb-4">Upload Resume (PDF)</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <h2>Job Description</h2>
      <textarea
        value={jobDesc}
        onChange={handleJobDescChange}
        rows={5}
        cols={50}
        placeholder="Write job description here"
      />
      <button onClick={handleAI}>Enhance</button>
      <h2>Enhanced Resume</h2>
      <pre>{newResume}</pre>
    </div>
  )
}

export default UploadResume
