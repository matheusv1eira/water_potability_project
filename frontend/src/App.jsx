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

  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      setError('Erro na análise. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="hero-section">
        <div className="hero-content">
          <h1>Qualidade da Água é Vida</h1>
          <p>
            A água é o recurso mais precioso que temos. Entender sua qualidade é essencial para
            saúde e bem-estar. Use nosso app para analisar rapidamente a potabilidade baseada em parâmetros químicos.
          </p>
          <button className="btn-hero" onClick={scrollToForm} aria-label="Ir para formulário de análise">
            Analisar agora
          </button>
        </div>
      </header>

      <section ref={formRef} className="form-section" aria-label="Formulário de análise da água">
        <h2>Preencha os parâmetros da água</h2>
        <form onSubmit={handleSubmit} noValidate>
          {Object.entries(formData).map(([key, value]) => (
            <label key={key} htmlFor={key}>
              {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              <input
                id={key}
                type="number"
                name={key}
                value={value}
                onChange={handleChange}
                required
                step="any"
                placeholder={`Informe ${key.replace(/_/g, ' ')}`}
              />
            </label>
          ))}
          <button type="submit" disabled={loading}>
            {loading ? 'Analisando...' : 'Analisar'}
          </button>
        </form>
        {error && <p className="error" role="alert">{error}</p>}
        {result && (
          <p
            className={result.potability === 1 ? 'success' : 'error'}
            role="status"
            aria-live="polite"
          >
            {result.potability === 1
              ? '✅ A água é potável.'
              : '⚠️ A água NÃO é potável.'}
          </p>
        )}
      </section>

      <footer>
        © 2025 algum nome
      </footer>
    </>
  );
}
