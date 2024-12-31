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
    <motion.header
      className={`${s.header} df aic cw`}
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
    >
      <div className={`${s.headerMain} ${isMobile ? 'df fdc' : 'df'} jcc`}>
        <button onClick={() => navigate('/')}>
          <motion.img
            src={findlyLogo}
            alt="Findly Logo"
            height={isMobile ? 200 : 100}
            draggable={false}
            animate={{ opacity: 1, rotate: 17 }}
            transition={{ ease: 'easeOut', duration: 2 }}
            initial={{ opacity: 0 }}
          />
        </button>
        <SearchInputUI />
      </div>
      <Link to="/documentation">Docs</Link>
    </motion.header>
  )
})
