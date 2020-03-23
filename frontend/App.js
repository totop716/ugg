
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import { AppNavigator } from './src/navigators/AppNavigator';
import store from './src/redux/store';


class App extends Component {

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
  }

  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;

