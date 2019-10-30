import { createStackNavigator } from 'react-navigation';

import Home from '../containers/Home';
import SweepStake from '../containers/SweepStake'

const HomeNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  SweepStake: {
    screen: SweepStake,
    navigationOptions: {
      header: null
    }
  }
});

export default HomeNavigator;