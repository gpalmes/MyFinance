// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Si tienes estilos globales
import App from './App';  // Importa el componente principal App

ReactDOM.render(
  <React.StrictMode>
    <App />  // Renderiza la aplicación principal
  </React.StrictMode>,
  document.getElementById('root')  // Asegúrate de que esto coincida con tu index.html
);
