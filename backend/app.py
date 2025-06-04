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
        features = data.get("features", data)

        expected_order = [
            'pH', 'Dureza', 'Sólidos', 'Cloraminas',
            'Sulfato', 'Condutividade', 'Carbono Orgânico',
            'Trihalometanos', 'Turbidez'
        ]

        input_values = [float(features[param]) for param in expected_order]

        result = predictor.predict(input_values)
        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'online', 'model': 'RandomForest'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
