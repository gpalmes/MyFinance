// src/index.js
import { AppRegistry } from 'react-native';
import App from './App'; // Asegúrate de que la ruta sea correcta
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'), // Asegúrate de que este ID coincida con tu index.html
});
