import { Route, Routes } from 'react-router-dom'
//COMPONENTS
import { HomePage } from '@/pages/home'
import { HeaderLayoutWidget } from '../../widgets/layout/header'

function App() {
  return (
    <div className="df fdc jcc aic">
      <HeaderLayoutWidget />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
