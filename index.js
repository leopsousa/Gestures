import {AppRegistry} from 'react-native';
import App from './src/apps/main';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
