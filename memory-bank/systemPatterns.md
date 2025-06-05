# System Patterns

## System Architecture

- The system follows a client-server architecture.
- Backend is a Flask REST API serving machine learning predictions.
- Frontend is a React single-page application communicating with the backend via HTTP.
- Both backend and frontend are containerized using Docker for deployment.

## Key Technical Decisions

- Use of Flask for backend API due to its lightweight and flexible nature.
- RandomForest model chosen for water potability prediction for its balance of accuracy and interpretability.
- React with Create React App for frontend to enable rapid development and easy maintenance.
- CORS enabled on backend to allow cross-origin requests from frontend.
- API health endpoint implemented for monitoring service status.

## Design Patterns

- Model-View-Controller (MVC) pattern in backend: Flask routes act as controllers, predictor as model, and JSON
  responses as views.
- Component-based architecture in React frontend for modular UI development.
- Separation of concerns between frontend and backend for scalability and maintainability.
- Use of containerization pattern with Docker to isolate environments and dependencies.
