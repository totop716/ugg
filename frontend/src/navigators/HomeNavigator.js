import { createStackNavigator } from 'react-navigation';

import Home from '../containers/Home';
import SweepStake from '../containers/SweepStake'
import Survey from '../containers/Survey'

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
  },
  Survey: {
    screen: Survey,
    navigationOptions: {
      header: null
    }
  }
});

export default HomeNavigator;