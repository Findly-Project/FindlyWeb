import s from './index.module.scss'
//INTERFACES
import { IMainDataCards } from '@/shared/interfaces/IMainData'
//COMPONENTS
import { CardListEntity } from '@/entities/card-list'
import { CircularProgress } from '@mui/material'
//MOBX
import { cardsApi } from '@/shared/store/cards-api'
import { observer } from 'mobx-react-lite'
//ICONS
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'

export const CardsWidget = observer(() => {
  const { t } = useTranslation()
  const { cards } = cardsApi as IMainDataCards

  if (!cards)
    return (
      <div className="df fdc jcc aic m10 fz14">
        <SearchIcon style={{ fontSize: '65px' }} />
        {t('main.preview')}
      </div>
    )

  if (cards?.state == 'pending') return <CircularProgress color="inherit" className="m10" />

  if (cards?.state == 'rejected')
    return (
      <div className="df fdc jcc aic m10 fz14">
        <CloseIcon style={{ fontSize: '65px' }} />
        {t('main.error')}
      </div>
    )

  return (
    <>
      <div className={`${s.markets_grid} dg jcc aic`}>
        {Object.entries(cards?.value?.data).map(([key, cardList]) => (
          <CardListEntity cards={cardList} name={key} key={key} />
        ))}
      </div>
      {Object.entries(cards?.value?.data).length == 0 && <h3>Not found :(</h3>}
    </>
  )
})
