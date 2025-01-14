import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [health, setHealth] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/health')
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(err => {
        console.error('Error fetching health:', err)
        setError(err.message)
      })
  }, [])

  return (
    <>
      <h1>Vite + React + Express</h1>
      <div className="card">
        <h2>Backend Status:</h2>
        {error ? (
          <div style={{ color: 'red' }}>
            Error connecting to backend: {error}
          </div>
        ) : health ? (
          <pre style={{ textAlign: 'left' }}>
            {JSON.stringify(health, null, 2)}
          </pre>
        ) : (
          <p>Loading backend status...</p>
        )}
      </div>
    </>
  )
}

export default App