const API_URL = 'http://localhost:5000';

export const predictWaterPotability = async (features) => {
  const response = await.fetch(${API_URL}/predict, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ features })
  });
  
  if (!response.ok) {
    throw new Error('Erro na previsão');
  }
  
  return await response.json();
};

export const checkApiHealth = async () => {
  const response = await fetch(${API_URL}/health);
  return await response.json();
};
