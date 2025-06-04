import React from 'react';

function ResultDisplay({ result, error }) {
  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && <p>Resultado: {result}</p>}
    </div>
  );
}

export default ResultDisplay;
