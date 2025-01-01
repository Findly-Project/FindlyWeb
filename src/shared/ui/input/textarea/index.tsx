import { useFormatInput } from '@/shared/hooks/useFormatInput'

interface TextAreaUiProps {
  val: string
  onChange: (_: string) => void
  selected: string[]
  setSelected: (_: string[]) => void
}

export const TextAreaUi = ({ val, onChange, selected, setSelected }: TextAreaUiProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const value = useFormatInput(val)
    if (e.key == 'Enter' && value.length > 0) {
      setSelected([...selected, value])
      onChange('')
      e.preventDefault()
    }
  }
  return (
    <div>
      {selected?.map((w, _) => (
        <div>
          <span key={w}>{w}</span>
          <button onClick={() => setSelected(selected.filter(word => word != w))}>x</button>
        </div>
      ))}
      <textarea
        value={val}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
