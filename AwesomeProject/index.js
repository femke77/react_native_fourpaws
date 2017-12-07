import { AppRegistry } from 'react-native';
import App from './index.android'; //changed this from ./App
import FavoritPetKeeper from'./components/views/favoritepetkeeper'

AppRegistry.registerComponent('AwesomeProject', () => FavoritPetKeeper);

if (window.document) {
    AppRegistry.runApplication('AwesomeProject', {
        initialProps: {},
        rootTag: document.getElementById('react-root')
    });
}