import { useEffect, useState } from 'react'
import { apiClient } from './api/axios'

function App() {
  const [message, setMessage] = useState('Checking backend...')

  useEffect(() => {
    apiClient
      .get('/health')
      .then((res) => setMessage(res.data.message))
      .catch((err) => setMessage(`Error: ${err.message}`))
  }, [])

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-lg">
        <div className="card-body items-center text-center">
          <h1 className="card-title text-2xl text-primary">URL Shortener</h1>
          <p className="text-base-content/70">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default App