import s from './index.module.scss'

interface ModalUiProps {
  off: (_: boolean) => void
  children: React.ReactNode
}

export const ModalUi = ({ off, children }: ModalUiProps) => {
  return (
    <div className={`${s.modalBack} df jcc aic`} onClick={() => off(false)}>
      <div className={`${s.modalContent}`} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
