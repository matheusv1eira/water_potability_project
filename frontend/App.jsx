import React, { useState, useEffect } from 'react'
import { predictWaterPotability, checkApiHealth } from './api.js'
import WaterForm from './components/WaterForm'
import ResultDisplay from './components/ResultDisplay'
import './index.css'

function App() {
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiStatus, setApiStatus] = useState('checking')

  useEffect(() => {
    const checkApi = async () => {
      try {
        await checkApiHealth()
        setApiStatus('online')
      } catch {
        setApiStatus('offline')
        setError('API não disponível')
      }
    }

    checkApi()
  }, [])

  const handlePredict = async (features) => {
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const prediction = await predictWaterPotability(features)
      setResult(prediction)
    } catch (err) {
      setError('Erro na análise. Verifique os dados e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Analisador de Potabilidade da Água</h1>
        <div className={apiStatusClass}>API: {apiStatus === 'online' ? '✅ Online' : '❌ Offline'}</div>
      </header>

      <main>
        <WaterForm onSubmit={handlePredict} loading={loading} />
        <ResultDisplay result={result} error={error} />
      </main>

      <footer>
        <p>Sistema de Análise de Água com IA</p>
      </footer>
    </div>
  )
}

export default App
