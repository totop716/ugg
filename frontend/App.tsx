import React from 'reactn';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { SplashScreen } from 'expo';

import { AppNavigator } from './src/navigators/AppNavigator';
import store from './src/redux/store';
import {
  getCurrentSessionAsync,
  forceLogoutIfSessionExpired,
  setCurrentSessionAsync
} from './src/utils/reactn-util';
import { UserData } from '.';
import { isAuthedAPI } from './src/services/Authentication';
import { getUserSessionSel } from './src/reactn-state/selectors';
import { defaultEmptyCurrentUser } from './src/reactn-state';
import { Text } from 'native-base';

const { useEffect, useState, useGlobal } = React;

SplashScreen.preventAutoHide();

const App = (): JSX.Element => {
  const [, setCurrentUser] = useGlobal('currentUser');
  const [loading, setLoading] = useState(false);

  const asyncDidMount = async (): Promise<void> => {
    setLoading(true);
    try {
      const fontLoad = await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font
      });
    } catch (e) {
      console.log('Font.loadAsync e', e);
    }

    /* try {
      const isAuthed = await isAuthedAPI();
    } catch (e) {
      console.log('isAuthedAPI e', e);
      if (new RegExp('401').test(e.message)) {
        await setCurrentSessionAsync(
          defaultEmptyCurrentUser,
          (setCurrentUser as unknown) as (user: UserData) => Promise<void>
        );
      }
    } */

    try {
      // this actually just initialises global currentUser state (if a session exists)
      await getCurrentSessionAsync(
        (setCurrentUser as unknown) as (user: UserData) => Promise<void>
      );

      await forceLogoutIfSessionExpired(
        (setCurrentUser as unknown) as (user: UserData) => Promise<void>
      );
    } catch (e) {
      console.log('getCurrentSessionAsync forceLogoutIfSessionExpired e', e);
    }

    setLoading(false);
    SplashScreen.hide();
  };

  useEffect(() => {
    asyncDidMount();
  }, []);

  if (loading) {
    return <View />;
  }

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </Provider>
  );
};

export default App;
