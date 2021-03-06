import { createStackNavigator } from 'react-navigation';

import Login from '../containers/Login';
import Signup from '../containers/Signup';
import ForgotPassword from '../containers/ForgotPassword';
import TabletLogin from '../containers/TabletLogin';

const AuthNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      header: null,
    },
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      header: null,
    },
  },
  TabletLogin: {
    screen: TabletLogin,
    navigationOptions: {
      header: null
    }
  }
});

export default AuthNavigator;
