import {AppRegistry} from 'react-native';
import Boot from './src/boot.js';
import {name as appName} from './app.json';
console.disableYellowBox = true; //disable all warning yellow box
AppRegistry.registerComponent(appName, () => Boot);
