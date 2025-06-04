import React, { useState } from 'react';

function WaterForm({ onSubmit, loading }) {
  const [features, setFeatures] = useState({});

  const handleChange = (event) => {
    setFeatures({ ...features, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(features);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={loading}>Analisar</button>
    </form>
  );
}

export default WaterForm;
