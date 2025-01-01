import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
//COMPONENTS
import { HeaderLayoutWidget } from '@/widgets/layout/header'
import { HomePage } from '@/pages/home'
import { DocumentationPage } from '@/pages/doc'
import { SettingsLayoutWidget } from '@/widgets/layout/settings'
import { StartWelcome } from '@/pages/_start'

function App() {
  const [start, setStart] = useState(true)
  setTimeout(() => {
    setStart(false)
  }, 4500)
  return (
    <div className="df fdc jcc aic cw">
      {start ? (
        <StartWelcome />
      ) : (
        <>
          <HeaderLayoutWidget />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/documentation" element={<DocumentationPage />} />
          </Routes>
          <SettingsLayoutWidget />
        </>
      )}
    </div>
  )
}

export default App
