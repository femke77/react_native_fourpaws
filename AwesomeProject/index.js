import { AppRegistry } from 'react-native';
import App from './index.android'; //changed this from ./App

AppRegistry.registerComponent('AwesomeProject', () => App);

if (window.document) {
    AppRegistry.runApplication('AwesomeProject', {
        initialProps: {},
        rootTag: document.getElementById('react-root')
    });
}