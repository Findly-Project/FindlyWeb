import { observer } from 'mobx-react-lite'
import s from './index.module.scss'

interface RangeInputUiProps {
  value: number
  onChange: (_: number) => void
  max: number
  min?: number
}

export const RangeInputUi = observer(
  ({ value, onChange, min = 1, max }: RangeInputUiProps) => {
    return (
      <input
        className={s.rangeInput}
        type="range"
        value={value}
        onChange={e => onChange(+e.target.value)}
        min={min}
        max={max}
      />
    )
  }
)
