import React from 'reactn';
import {
  Image,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Linking
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Form,
  Item,
  Input,
  Text,
  Textarea,
  Icon
} from 'native-base';

import { getUserSessionSel, isLoggedInSel } from '../../reactn-state/selectors';

import { FontAwesome } from '@expo/vector-icons';

import { INavigation } from '../../';
import styles from './styles';
// import Utils from '../../utils';
import { getTabletAPI } from '../../services/Authentication';
import moment from 'moment';
import {
  getCurrentSessionAsync,
  forceLogoutIfSessionExpired
} from '../../utils/reactn-util';
import { UserData } from '../../..';

const { useState, useGlobal, useEffect } = React;

const TabletLogin: React.FC<INavigation> = ({ navigation }) => {
  const [, setCurrentUser] = useGlobal('currentUser');
  const [tabletID, setTabletID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // state = {
  //   tabletID: '',
  //   password: '',
  //   error: '',
  //   background: require('../../assets/images/LoginBackground.png')
  // };

  const asyncDidMount = async (): Promise<void> => {
    // this actually just initialises global currentUser state (if a session exists)
    await getCurrentSessionAsync(
      (setCurrentUser as unknown) as (user: UserData) => Promise<void>
    );

    await forceLogoutIfSessionExpired(
      (setCurrentUser as unknown) as (user: UserData) => Promise<void>
    );

    if (!isLoggedInSel()) {
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    asyncDidMount();
  }, []);

  const submitTabletLogin = async (): Promise<void> => {
    try {
      if (!isLoggedInSel()) {
        navigation.navigate('Login');
        return;
      }

      const res = await getTabletAPI(tabletID, password);

      console.log('res!', res);
      if (res.tablet.length > 0) {
        const isActive =
          res?.first_sweep?.startdate &&
          moment().diff(moment(res.first_sweep.startdate), 'minutes') <= 0 &&
          moment().diff(moment(res.first_sweep.enddate), 'minutes') > 0;

        navigation.navigate('SweepStake', {
          // comeback: true,
          // user: navigation.getParam('user'),
          user: [getUserSessionSel().user],
          tabletData: res.tablet[0],
          tabletDataFirstSweep: res?.first_sweep ?? {},
          tabletDataFirstSweepIsActive: isActive
        });
      } else {
        setError('Please input correct Tablet ID and Password');
      }
      // .then(res => {
      // if (res.tablet.length > 0) {
      //   this.props.navigation.navigate('SweepStake', {
      //     user: this.props.navigation.getParam('user'),
      //     tabletData: res.tablet[0]
      //   });
      // } else {
      //   this.setState({
      //     error: 'Please input correct Tablet ID and Password'
      //   });
      // }
      // })
      // .catch(err => {
      //   console.log(err);
      // });
    } catch (e) {
      console.log('getTabletAPI e', e);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      {/* <View style={{ flexGrow: 1 }} keyboardShouldPersistTaps="always"> */}
      <View style={{ flexGrow: 1 }}>
        <Image
          source={require('../../assets/images/LoginBackground.png')}
          style={styles.backgroundImage}
        />
        <View style={styles.formContainer}>
          <View style={styles.inputfield_container}>
            <View style={styles.inputicon_container}>
              <FontAwesome.Button
                name="user"
                backgroundColor="#fff"
                color="#8cb58f"
                size={35}
                borderRadius={50}
                iconStyle={{ marginRight: 0, paddingHorizontal: 5 }}
              ></FontAwesome.Button>
            </View>
            <Input
              style={styles.inputTabletID}
              placeholder="Tablet ID"
              placeholderTextColor="#fff"
              autoCapitalize="none"
              value={tabletID}
              onChangeText={setTabletID}
            />
          </View>
          <View style={styles.inputfield_container}>
            <View style={styles.inputicon_container}>
              <FontAwesome.Button
                name="lock"
                backgroundColor="#fff"
                color="#8cb58f"
                size={35}
                borderRadius={50}
                iconStyle={{ marginRight: 0, paddingHorizontal: 5 }}
              ></FontAwesome.Button>
            </View>
            <Input
              style={styles.inputTabletID}
              placeholder="Password"
              placeholderTextColor="#fff"
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          {error != '' && <Text style={styles.errorText}>{error}</Text>}
          <Button style={styles.button} onPress={submitTabletLogin}>
            <Text style={styles.loginText}>Login</Text>
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TabletLogin;
