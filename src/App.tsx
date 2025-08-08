import { useState } from 'react'
import baba from './assets/baba.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

  <div className="neon-border p-8 max-w-sm text-center text-white font-semibold">
   <img src={baba} className="rounded-full" />
  </div>


      <h1>hello world!</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
