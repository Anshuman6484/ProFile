import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useResume } from '../hooks/useResume.js'

function JDInput() {
  const { jobDesc, handleJobDescChange } = useResume()

  return (
    <div className="w-full space-y-2">
      <Label htmlFor="job-desc" className="text-base font-medium">
        Job Description <span className="text-red-500">*</span>
      </Label>
      <Textarea
        id="job-desc"
        value={jobDesc}
        onChange={handleJobDescChange}
        placeholder="Paste or write the job description here"
        className="p-2 rounded-md whitespace-pre-wrap text-sm max-h-[400px] overflow-auto"
      />
    </div>
  )
}

export default JDInput
