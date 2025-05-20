import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useResume } from '../hooks/useResume.js'

function FileUpload() {
  const { handleFileChange } = useResume()
  return (
    <div className="grid w-full max-w-md items-start gap-2">
      <Label htmlFor="resume" className="text-base font-medium">
        Upload Resume (PDF) <span className="text-red-500">*</span>
      </Label>
      <Input
        id="resume"
        type="file"
        accept=".pdf"
        className="cursor-pointer"
        onChange={handleFileChange}
      />
    </div>
  )
}

export default FileUpload
