import React from 'react';

const ResultDisplay = ({ result, error }) => {
  if (error) {
    return <div className="error">Erro: {error}</div>;
  }

  if (!result) return null;

  const isPotable = result.potability === 1;
  const confidence = (result.probability * 100).toFixed(1);

  return (
    <div className={esult }>
      <h2>Resultado: {isPotable ? 'POTÁVEL' : 'NÃO POTÁVEL'}</h2>
      <p>Confiança: {confidence}%</p>
      
      <div className="recommendation">
        {isPotable ? (
          <p>✅ Água segura para consumo</p>
        ) : (
          <p>❌ Não recomendado para consumo. Filtre ou ferva antes de usar.</p>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;
