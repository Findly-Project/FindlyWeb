import { Route, Routes } from 'react-router-dom'
//COMPONENTS
import { HomePage } from '@/pages/home'

function App() {
  return (
    <div className="df jcc aic">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
