import { motion } from 'framer-motion'
import findlyLogo from '@/shared/logo/findly-logo.png'
import s from './index.module.scss'

export const StartWelcome = () => {
  return (
    <>
      <link rel="preload" as="image" href={findlyLogo} />
      <div className={`${s.welcome} df jcc aic`}>
        <div className="df aic jcc">
          <motion.img
            src={findlyLogo}
            alt="Findly Logo"
            draggable={false}
            animate={{ rotate: 17, scale: 1 }}
            transition={{ ease: 'easeOut', duration: 3 }}
            initial={{ scale: 0 }}
            loading="eager"
          />
          <h1>
            <b>Findly</b>
          </h1>
        </div>
      </div>
    </>
  )
}
