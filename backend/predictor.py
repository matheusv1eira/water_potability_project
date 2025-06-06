import joblib
import numpy as np
import pandas as pd
import os

class WaterPotabilityPredictor:
    def __init__(self,
                 model_path=None,
                 scaler_path=None):
        
        base_dir = os.path.dirname(os.path.abspath(__file__))
        if model_path is None:
            model_path = os.path.abspath(os.path.join(base_dir, '../model/water_potability_model.pkl'))
        if scaler_path is None:
            scaler_path = os.path.abspath(os.path.join(base_dir, '../model/scaler.pkl'))

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


