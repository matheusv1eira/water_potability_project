import React, { useState, useEffect } from 'react';
import { predictWaterPotability, checkApiHealth } from './api.js';
import WaterForm from './components/WaterForm';
import ResultDisplay from './components/ResultDisplay';
import './index.css';

function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    const checkApi = async () => {
      try {
        await checkApiHealth();
        setApiStatus('online');
      } catch {
        setApiStatus('offline');
        setError('API não disponível');
      }
    };

    checkApi();
  }, []);

  const handlePredict = async (features) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const prediction = await predictWaterPotability(features);
      setResult(prediction);
    } catch {
      setError('Erro na análise. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>💧 Analisador de Qualidade da Água com IA</h1>
        <div className={`api-status ${apiStatus}`}>
          {apiStatus === 'online' && (
            <>
              <span className="status-icon online">✅</span> API Online
            </>
          )}
          {apiStatus === 'offline' && (
            <>
              <span className="status-icon offline">❌</span> API Offline
            </>
          )}
          {apiStatus === 'checking' && (
            <>
              <span className="status-icon checking">⌛</span> Verificando API...
            </>
          )}
        </div>
      </header>

      <main className="app-main">
        <section className="form-section">
          <WaterForm onSubmit={handlePredict} loading={loading} />
        </section>
        <section className="result-section">
          {loading ? (
            <div className="loading-spinner" aria-label="Carregando"></div>
          ) : (
            <ResultDisplay result={result} error={error} />
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>Desenvolvido com ♥ para o projeto de IA</p>
      </footer>
    </div>
  );
}

export default App;
