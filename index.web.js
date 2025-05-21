import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { registerRootComponent } from 'expo';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById('app'),
});