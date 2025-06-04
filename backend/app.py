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
        features = data.get('features')
        
        if not features or len(features) != 9:
            return jsonify({
                'error': 'São necessários 9 parâmetros',
                'parametros': [
                    'pH', 'Dureza', 'Sólidos', 'Cloraminas',
                    'Sulfato', 'Condutividade', 'Carbono Orgânico',
                    'Trihalometanos', 'Turbidez'
                ]
            }), 400
        
        result = predictor.predict(features)
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'online', 'model': 'RandomForest'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
