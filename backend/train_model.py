import pandas as pd
import joblib
import os
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Configurar caminhos
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, '../data/water_potability.csv')
MODEL_DIR = os.path.join(BASE_DIR, '../model')
os.makedirs(MODEL_DIR, exist_ok=True)

print("1. Carregando dados...")
df = pd.read_csv(DATA_PATH)

print("2. Processando dados...")
imputer = SimpleImputer(strategy='mean')
df_imputed = pd.DataFrame(imputer.fit_transform(df), columns=df.columns)

X = df_imputed.drop("Potability", axis=1)
y = df_imputed["Potability"]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Salvar scaler
joblib.dump(scaler, os.path.join(MODEL_DIR, 'scaler.pkl'))
print("Scaler salvo!")

print("3. Treinando modelo...")
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42
)

model = RandomForestClassifier(random_state=42)
param_grid = {
    'n_estimators': [50, 100, 150],
    'max_depth': [5, 10, 15]
}
grid_search = GridSearchCV(model, param_grid, cv=5, scoring='f1')
grid_search.fit(X_train, y_train)

best_model = grid_search.best_estimator_
print(f"Melhor modelo: {best_model}")

y_pred = best_model.predict(X_test)
print("\nRelatório:")
print(classification_report(y_test, y_pred))

# Salvar modelo
model_path = os.path.join(MODEL_DIR, 'water_potability_model.pkl')
joblib.dump(best_model, model_path)
print(f"✅ Modelo salvo em: {model_path}")
