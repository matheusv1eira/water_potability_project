import joblib
import numpy as np
import pandas as pd

class WaterPotabilityPredictor:
    def __init__(self, model_path='../model/water_potability_model.pkl',
                 scaler_path='../model/scaler.pkl'):
        self.model = joblib.load(model_path)
        self.scaler = joblib.load(scaler_path)
        self.columns = [
            'ph', 'Hardness', 'Solids', 'Chloramines',
            'Sulfate', 'Conductivity', 'Organic_carbon',
            'Trihalomethanes', 'Turbidity'
        ]

    def predict(self, features):
        features = [float(f) for f in features]
        features_df = pd.DataFrame([features], columns=self.columns)
        scaled_features = self.scaler.transform(features_df)
        prediction = self.model.predict(scaled_features)[0]
        probability = self.model.predict_proba(scaled_features)[0][1]

        return {
            'potability': int(prediction),
            'probability': float(probability),
            'message': 'Potável' if prediction == 1 else 'Não Potável'
        }
