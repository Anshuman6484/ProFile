import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useResume } from '../hooks/useResume.js'
import { Textarea } from '@/components/ui/textarea'
import FileUpload from './FileUpload.jsx'
import JDInput from './JDInput.jsx'

function UploadResume() {
  const { newResume, handleAI, handleUpload } = useResume()

  return (
    <div className="p-6 max-w-full mx-auto space-y-6">
      {/* Inputs */}
      <div className="space-y-4">
        <JDInput />
        <FileUpload />
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button onClick={handleUpload} className="cursor-pointer">
          Upload
        </Button>
        <Button
          onClick={handleAI}
          variant="secondary"
          className="cursor-pointer"
        >
          Enhance
        </Button>
      </div>

      {/* Output */}
      {newResume && (
        <div className="space-y-2">
          <Label className="text-base font-medium">Enhanced Resume</Label>
          <Textarea className="p-2 rounded-md whitespace-pre-wrap text-sm max-h-[400px] overflow-auto">
            {newResume}
          </Textarea>
        </div>
      )}
    </div>
  )
}

export default UploadResume
