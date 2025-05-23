import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useResume } from '../hooks/useResume.js'

function SelectMode() {
  const { mode, setMode, setNewResume } = useResume()
  return (
    <div className="w-full max-w-md space-y-2">
      <Label className="text-base font-medium">Rewrite Mode</Label>
      <Select
        onValueChange={(value) => {
          setMode(value)
          setNewResume('')
        }}
        defaultValue={mode}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select rewrite mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="conservative">Conservative</SelectItem>
          <SelectItem value="balanced">Balanced</SelectItem>
          <SelectItem value="aggressive">Aggressive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectMode
