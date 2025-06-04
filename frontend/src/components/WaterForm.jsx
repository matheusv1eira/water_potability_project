import React, { useState } from 'react';

const WaterForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    ph: '', hardness: '', solids: '', chloramines: '',
    sulfate: '', conductivity: '', organic_carbon: '',
    trihalomethanes: '', turbidity: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const features = Object.values(formData).map(Number);
    onSubmit(features);
  };

  return (
    <form onSubmit={handleSubmit} className="water-form">
      <h2>Parâmetros da Água</h2>
      
      {Object.keys(formData).map((key) => (
        <div key={key} className="form-group">
          <label>{key.replace('_', ' ').toUpperCase()}:</label>
          <input
            type="number"
            step="0.01"
            name={key}
            value={formData[key]}
            onChange={handleChange}
            placeholder={Enter }
            required
          />
        </div>
      ))}
      
      <button type="submit" disabled={loading}>
        {loading ? 'Analisando...' : 'Verificar Potabilidade'}
      </button>
    </form>
  );
};

export default WaterForm;
