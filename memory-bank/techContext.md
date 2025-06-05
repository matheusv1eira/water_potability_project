# Technical Context

## Technologies Used

### Backend

- Python 3.x
- Flask: Web framework for API development
- Flask-CORS: To enable cross-origin requests
- scikit-learn: Machine learning library for RandomForest model
- joblib: Model serialization
- numpy, pandas: Data processing and manipulation

### Frontend

- React 18 with Create React App
- React DOM for rendering
- React Scripts for build and development tooling
- Testing libraries: @testing-library/dom, jest-dom, react-testing-library, user-event
- Vite as a dev dependency (possibly for faster builds)

## Development Setup

- Backend runs on Flask server, exposing REST API endpoints.
- Frontend runs as a React single-page application communicating with backend API.
- CORS enabled on backend to allow frontend requests.
- Docker used for containerization of backend and frontend services.

## Dependencies

- Backend dependencies listed in backend/requirements.txt.
- Frontend dependencies listed in frontend/package.json.

## Constraints

- Backend API expects specific water quality features in a fixed order for prediction.
- Frontend depends on backend API health for functionality.
- Deployment requires Docker environment.
