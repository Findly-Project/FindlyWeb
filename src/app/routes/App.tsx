import { Route, Routes } from 'react-router-dom'
//COMPONENTS
import { HeaderLayoutWidget } from '@/widgets/layout/header'
import { HomePage } from '@/pages/home'
import { DocumentationPage } from '@/pages/doc'
import { SettingsLayoutWidget } from '@/widgets/layout/settings'

function App() {
  return (
    <div className="df fdc jcc aic cw">
      <HeaderLayoutWidget />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
      </Routes>
      <SettingsLayoutWidget />
    </div>
  )
}

export default App
