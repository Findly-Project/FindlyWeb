import s from './index.module.scss'
//HOOKS
import { useFormatInput } from '@/shared/hooks/useFormatInput'
import { useSliceStr } from '@/shared/hooks/useSliceStr'

interface TextAreaUiProps {
  val: string
  onChange: (_: string) => void
  selected: string[]
  setSelected: (_: string[]) => void
}

export const TextAreaUi = ({ val, onChange, selected, setSelected }: TextAreaUiProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = useFormatInput(val)
    if (e.key == 'Enter' && value.length > 0) {
      setSelected([...selected, value])
      onChange('')
      e.preventDefault()
    }
  }

  return (
    <div className={`${s.e_words} df fdc`}>
      {selected?.map((w, _) => (
        <div className="df aic">
          <span key={w}>{useSliceStr(w.replaceAll('+', ' '), 6)}</span>
          <button onClick={() => setSelected(selected.filter((_w, $) => $ != _))}>x</button>
        </div>
      ))}
      <input value={val} onChange={e => onChange(e.target.value)} onKeyDown={handleKeyDown} />
    </div>
  )
}
