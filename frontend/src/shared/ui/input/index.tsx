import { useState } from 'react'
//MOBX
import { cardsApi } from '@/shared/store/cards-api'
//COMPONENTS
import { InputAdornment, TextField } from '@mui/material'
//ICONS
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { observer } from 'mobx-react-lite'

export const SearchInputUI = observer(() => {
  const { fetchMarkets } = cardsApi

  const [inputVal, setInputVal] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()
    fetchMarkets(inputVal)
  }

  console.log('input rerender')

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
    </form>
  )
})
