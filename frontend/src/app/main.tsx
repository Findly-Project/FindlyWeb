import ReactDOM from 'react-dom/client'
import App from './routes/App.tsx'
import './assets/styles/global.scss'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
