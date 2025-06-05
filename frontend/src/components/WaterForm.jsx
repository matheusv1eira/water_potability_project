import React, { useState } from 'react';

function WaterForm({ onSubmit, loading }) {
  const [features, setFeatures] = useState({
    
    PH: '',
    Dureza: '',
    Sólidos: '',
    Cloraminas: '',
    Sulfato: '',
    Condutividade: '',
    'Carbono Orgânico': '', 
    Trihalometanos: '',
    Turbidez: ''
  });

  const handleChange = (event) => {
    setFeatures({
      ...features,
      [event.target.name]: event.target.value 
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(features);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campo para PH */}
      <div>
        <label htmlFor="PH">PH:</label>
        <input
          type="number" 
          id="PH"
          name="PH" 
          value={features.PH}
          onChange={handleChange}
          step="any" 
          required 
        />
      </div>

      {/* Campo para Dureza */}
      <div>
        <label htmlFor="Dureza">Dureza:</label>
        <input
          type="number"
          id="Dureza"
          name="Dureza"
          value={features.Dureza}
          onChange={handleChange}
          step="any"
          required
        />
      </div>

      {/* Campo para Sólidos */}
      <div>
        <label htmlFor="Sólidos">Sólidos (mg/L):</label>
        <input
          type="number"
          id="Sólidos"
          name="Sólidos"
          value={features.Sólidos}
          onChange={handleChange}
          step="any"
          required
        />
      </div>

      {/* Campo para Cloraminas */}
      <div>
        <label htmlFor="Cloraminas">Cloraminas (mg/L):</label>
        <input
          type="number"
          id="Cloraminas"
          name="Cloraminas"
          value={features.Cloraminas}
          onChange={handleChange}
          step="any"
          required
        />
      </div>

      {/* Campo para Sulfato */}
      <div>
        <label htmlFor="Sulfato">Sulfato (mg/L):</label>
        <input
          type="number"
          id="Sulfato"
          name="Sulfato"
          value={features.Sulfato}
          onChange={handleChange}
          step="any"
          required
        />
      </div>

      {/* Campo para Condutividade */}
      <div>
        <label htmlFor="Condutividade">Condutividade (µS/cm):</label>
        <input
          type="number"
          id="Condutividade"
          name="Condutividade"
          value={features.Condutividade}
          onChange={handleChange}
          step="any"
          required
        />
      </div>

      {/* Campo para Carbono Orgânico - CUIDADO COM O ESPAÇO NO NOME! */}
      <div>
        <label htmlFor="Carbono Orgânico">Carbono Orgânico (mg/L):</label>
        <input
          type="number"
          id="Carbono Orgânico"
          name="Carbono Orgânico" 
          value={features['Carbono Orgânico']} 
          onChange={handleChange}
          step="any"
          required
        />
      </div>

      {/* Campo para Trihalometanos */}
      <div>
        <label htmlFor="Trihalometanos">Trihalometanos (µg/L):</label>
        <input
          type="number"
          id="Trihalometanos"
          name="Trihalometanos"
          value={features.Trihalometanos}
          onChange={handleChange}
          step="any"
          required
        />
      </div>

      {/* Campo para Turbidez */}
      <div>
        <label htmlFor="Turbidez">Turbidez (NTU):</label>
        <input
          type="number"
          id="Turbidez"
          name="Turbidez"
          value={features.Turbidez}
          onChange={handleChange}
          step="any"
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Analisando...' : 'Analisar'}
      </button>
    </form>
  );
}

export default WaterForm;