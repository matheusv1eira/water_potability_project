import joblib
import numpy as np

class WaterPotabilityPredictor:
    def __init__(self, model_path='../model/water_potability_model.pkl', 
                 scaler_path='../model/scaler.pkl'):
        self.model = joblib.load(model_path)
        self.scaler = joblib.load(scaler_path)
    
    def predict(self, features):
        features_array = np.array(features, dtype=float)
        scaled_features = self.scaler.transform(features_array.reshape(1, -1))
        prediction = self.model.predict(scaled_features)[0]
        probability = self.model.predict_proba(scaled_features)[0][1]
        return {
            'potability': int(prediction),
            'probability': float(probability),
            'message': 'Potável' if prediction == 1 else 'Não Potável'
        }
