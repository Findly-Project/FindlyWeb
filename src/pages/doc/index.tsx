import { useEffect, useState } from 'react'
import s from './index.module.scss'
//DATA
import { docData } from '@/shared/data/documentation'
//MOBX
import { cardsApi } from '@/shared/store/cards-api'

export const DocumentationPage = () => {
  const { setCards } = cardsApi

  useEffect(() => {
    setCards(null)
  }, [])
  return (
    <div className={`${s.docPage} df fdc jcc aic`}>
      {docData.map(e => {
        const [isOpened, setIsOpened] = useState(false)
        return (
          <div key={e.block}>
            <button onClick={() => setIsOpened(!isOpened)} className={`${s.docTheme}`}>
              <h2>{e.block}</h2>
            </button>
            {isOpened && (
              <div>
                {e.items.map(e => {
                  const [isOpened, setIsOpened] = useState(false)
                  return (
                    <div key={e.title}>
                      <div onClick={() => setIsOpened(!isOpened)}>
                        <h3>{e.title}</h3>
                      </div>
                      <div>{isOpened && <div>{e.value}</div>}</div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
