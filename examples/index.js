import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import Example from './examples/Basic';
// import Example from './examples/PartialSize/';
// import Example from './examples/BottomButton/';
// import Example from './examples/CustomButtons/';
// import Example from './examples/CustomPagination/';
// import Example from './examples/FullBackgroundImage/';
// import Example from './examples/RTL/';

AppRegistry.registerComponent(appName, () => Example);
