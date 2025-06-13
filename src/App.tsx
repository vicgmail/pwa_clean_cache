
import reactLogo from '/logo/react.svg'
import viteLogo from '/logo/vite.svg'
import './App.css'

import Version from './Version';

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Clean PWA Cache</h1>
      <p className="read-the-docs">
        Tech stack: TypeScript, reactJs, service worker, vite, vercel, pwa
      </p>
      <div className="card">
        <Version />
      </div>
    </>
  )
}

export default App
