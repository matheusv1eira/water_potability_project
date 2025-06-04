export async function predictWaterPotability(features) {
  const response = await fetch('http://localhost:5000/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(features),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Erro na requisição');
  }

  return response.json();
}

export async function checkApiHealth() {
  const response = await fetch('http://localhost:5000/health');
  if (!response.ok) {
    throw new Error('API offline');
  }
  return response.json();
}
