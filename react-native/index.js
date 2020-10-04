/**
 * @format
 */

import * as React from 'react';
import {AppRegistry} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux'
import configureStore from './store'

import App from './App';
import {name as appName} from './app.json';
const store = configureStore();
export default function Main() {
    return (
      <Provider store={store}>
        <PaperProvider>
          <App />
        </PaperProvider>
      </Provider>
    );
  }

AppRegistry.registerComponent(appName, () => Main);
