from flask import Flask, request, jsonify
from flask_cors import CORS
from predictor import WaterPotabilityPredictor
import os

app = Flask(__name__)
CORS(app)

predictor = WaterPotabilityPredictor()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("Recebido no backend:", data) 

        features = data.get("features", data)
        nome_traduzido = {
            'pH': 'ph',
            'Dureza': 'Hardness',
            'Sólidos': 'Solids',
            'Cloraminas': 'Chloramines',
            'Sulfato': 'Sulfate',
            'Condutividade': 'Conductivity',
            'Carbono Orgânico': 'Organic_carbon',
            'Trihalometanos': 'Trihalomethanes',
            'Turbidez': 'Turbidity'
        }

        expected_order = list(nome_traduzido.keys())

        translated_features = []
        for pt in expected_order:
            val = features.get(pt)
            if val is None or val == '':
                raise ValueError(f"Parâmetro faltando ou inválido: {pt}")
            translated_features.append(float(val))

        result = predictor.predict(translated_features)
        return jsonify(result)

    except Exception as e:
        print("Erro na predição:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
