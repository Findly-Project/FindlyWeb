import { useState } from 'react'
import s from './index.module.scss'
import { motion } from 'framer-motion'
// DATA
import { docData } from '@/shared/data/documentation'

export const DocumentationPage = () => {
  const [openedSections, setOpenedSections] = useState<Set<string>>(new Set())

  const toggleSection = (block: string) => {
    setOpenedSections(prev => {
      const newOpenedSections = new Set(prev)
      if (newOpenedSections.has(block)) {
        newOpenedSections.delete(block)
      } else {
        newOpenedSections.add(block)
      }
      return newOpenedSections
    })
  }

  return (
    <motion.div
      className={`${s.docPage} df fdc jcc aic`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ ease: 'easeOut', duration: 1 }}
    >
      {docData.map(doc => {
        const isOpen = openedSections.has(doc.block)
        return (
          <div key={doc.block} className={`${s.docTheme} df fdc jcc aic`}>
            <button onClick={() => toggleSection(doc.block)}>
              <h2>{doc.block}</h2>
            </button>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
              style={{ overflow: 'hidden' }}
              className="df fdc jcc aic"
            >
              {doc.items.map(item => (
                <div key={item.title} className={`${s.doc__doc} df fdc jcc aic`}>
                  <h3>{item.title}</h3>
                  <p>{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        )
      })}
    </motion.div>
  )
}
