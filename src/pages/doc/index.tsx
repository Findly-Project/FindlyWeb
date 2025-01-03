import { useState } from 'react'
import s from './index.module.scss'
// DATA
import { docData } from '@/shared/data/documentation'

export const DocumentationPage: React.FC = () => {
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
    <div className={`${s.docPage} df fdc jcc aic`}>
      {docData.map(doc => (
        <div key={doc.block}>
          <button onClick={() => toggleSection(doc.block)} className={`${s.docTheme}`}>
            <h2>{doc.block}</h2>
          </button>
          {openedSections.has(doc.block) && (
            <div>
              {doc.items.map(item => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  {openedSections.has(doc.block) && <div>{item.value}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
