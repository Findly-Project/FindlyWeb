import { useState } from 'react'
import { observer } from 'mobx-react-lite'
//COMPONENTS
import { InputAdornment, TextField } from '@mui/material'
//MOBX
import { cardsApi } from '@/shared/store/cards-api'
//ICONS
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

export const HomePage = observer(() => {
  const { cards, fetchMarkets } = cardsApi

  const [inputVal, setInputVal] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()
    fetchMarkets(inputVal)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={inputVal}
        onChange={e => setInputVal(e.target.value)}
        label="Search"
        color="secondary"
        variant="outlined"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <button onClick={handleSubmit}>
                  <SearchOutlinedIcon />
                </button>
              </InputAdornment>
            ),
          },
        }}
        fullWidth
      />
      <div>
        {cards?.state == 'pending' && 'loading'}
        {cards?.state == 'rejected' && 'error'}
        {cards?.state == 'fulfilled' && <div>state is fulfilled</div>}
      </div>
    </form>
  )
})
