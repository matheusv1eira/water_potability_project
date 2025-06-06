import React, { useState, useRef } from 'react';
import { predictWaterPotability } from './api.js';
import './index.css';

export default function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ph: '',
    hardness: '',
    solids: '',
    chloramines: '',
    sulfate: '',
    conductivity: '',
    organic_carbon: '',
    trihalomethanes: '',
    turbidity: '',
  });
  
  const [showForm, setShowForm] = useState(false); 
  const formRef = useRef(null);

  const scrollToForm = () => {
    if (!showForm) {
      setShowForm(true);
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300); 
    } else {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const prediction = await predictWaterPotability(formData);
      setResult(prediction);
    } catch {
      setError('Erro na análise. Por favor, confira os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <h1>Avaliação da Qualidade da Água</h1>
          <p>Parâmetros essenciais para saber se a água é potável</p>
          <button className="btn-primary" onClick={scrollToForm}>Começar Análise</button>
        </div>
      </header>

      <section className="info" aria-label="Importância da análise da água">
        <h2>Por que analisar a água?</h2>
        <ul className="info-list">
          <li>Água potável é vital para a saúde.</li>
          <li>Parâmetros como pH e turbidez indicam qualidade.</li>
          <li>Muitas pessoas ainda não têm água segura.</li>
        </ul>
      </section>

      <main
        ref={formRef}
        className={`form-section ${showForm ? 'show' : ''}`}
        aria-label="Formulário para análise da água"
      >
        <h2>Informe os dados</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="inputs-grid">
            {Object.entries(formData).map(([key, value]) => (
              <label key={key} htmlFor={key} className="input-label">
                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                <input
                  id={key}
                  name={key}
                  type="number"
                  value={value}
                  onChange={handleChange}
                  placeholder={`Informe ${key.replace(/_/g, ' ')}`}
                  step="any"
                  required
                  min="0"
                />
              </label>
            ))}
          </div>
          <button className="btn-submit" type="submit" disabled={loading}>
            {loading ? 'Analisando...' : 'Enviar'}
          </button>
        </form>

        {error && <p className="error-msg">{error}</p>}

        {result && (
          <div className={`result-box ${result.potability === 1 ? 'success' : 'fail'}`}>
            {result.potability === 1 ? 'Água potável' : 'Água não potável'}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2025 </p>
      </footer>
    </>
  );
}
