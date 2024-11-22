import { Route, Routes } from 'react-router-dom'
//COMPONENTS
import { HeaderLayoutWidget } from '@/widgets/layout/header'
import { HomePage } from '@/pages/home'
import { DocumentationPage } from '@/pages/doc'

function App() {
  return (
    <div className="df fdc jcc aic cw">
      <HeaderLayoutWidget />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
      </Routes>
    </div>
  )
}

export default App
