import findlyLogo from '@/shared/logo/findly-logo.png'
import s from './index.module.scss'
import { motion } from 'framer-motion'
//HOOKS
import { useNav } from '@/shared/hooks/useNav'
import { useMobile } from '@/shared/hooks/useMobile'
//COMPONENTS
import { Link } from 'react-router-dom'
import { SearchInputUI } from './ui/input'
//MOBX
import { observer } from 'mobx-react-lite'

export const HeaderLayoutWidget = observer(() => {
  const navigate = useNav()
  const isMobile = useMobile()

  return (
    <header className={`${s.header} df aic cw`}>
      <div className={`${s.headerMain} ${isMobile ? 'df fdc' : 'df'} jcc`}>
        <button onClick={() => navigate('/')}>
          <motion.img
            src={findlyLogo}
            alt="Findly Logo"
            height={isMobile ? 200 : 100}
            draggable={false}
            animate={{ rotate: 17, scale: 1 }}
            transition={{ ease: 'easeOut', duration: 1 }}
            initial={{ scale: 0 }}
          />
        </button>
        <SearchInputUI />
      </div>
      <motion.div
        className={s.docs}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: 'easeOut', duration: 1 }}
        initial={{ opacity: 0, scale: 0.8 }}
      >
        <Link to="/documentation">Docs</Link>
      </motion.div>
    </header>
  )
})
