export async function predictWaterPotability(formData) {
  const bodyData = {
    features: {
      "pH": Number(formData.ph),
      "Dureza": Number(formData.hardness),
      "Sólidos": Number(formData.solids),
      "Cloraminas": Number(formData.chloramines),
      "Sulfato": Number(formData.sulfate),
      "Condutividade": Number(formData.conductivity),
      "Carbono Orgânico": Number(formData.organic_carbon),
      "Trihalometanos": Number(formData.trihalomethanes),
      "Turbidez": Number(formData.turbidity),
    }
  };

  const response = await fetch('http://localhost:5000/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyData)
  });

  if (!response.ok) {
    throw new Error('Erro ao conectar ao servidor');
  }

  const data = await response.json();
  return data; 
}
