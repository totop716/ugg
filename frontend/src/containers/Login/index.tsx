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
import {
  setCurrentSessionAsync,
  getCurrentSessionAsync,
  forceLogoutIfSessionExpired
} from '../../utils/reactn-util';

import { FontAwesome } from '@expo/vector-icons';
import { INavigation, UserData } from '../../../';

import styles from './styles';
import Utils from '../../utils';
import { loginAPI } from '../../services/Authentication';
import LoginBackgroundImg from '../../assets/images/LoginBackground.png';
import { isLoggedInSel } from '../../reactn-state/selectors';

const { useState, useRef, useGlobal } = React;

const Login: React.FC<INavigation> = ({ navigation }) => {
  const [, setCurrentUser] = useGlobal('currentUser');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  // state = {
  //   username: '',
  //   password: '',
  //   error: '',
  //   background: require('../../assets/images/LoginBackground.png')
  // };

  // const asyncDidMount = async (): Promise<void> => {
  //   if (isLoggedInSel()) {
  //     navigation.navigate('TabletLogin');
  //   }
  // };

  // useEffect(() => {
  //   asyncDidMount();
  // }, [isLoggedInSel()]);

  const submitLogin = async (): Promise<void> => {
    try {
      if (loading) return;
      setLoading(true);
      const res = await loginAPI(username, password);

      if (res.user && res.token) {
        await setCurrentSessionAsync(
          {
            user: {
              ...res.user,
              username
            },
            token: res.token,
            lastLogin: new Date()
          },
          (setCurrentUser as unknown) as (val: UserData) => Promise<void>
        );
        // this.props.navigation.navigate('TabletLogin', { user: res.user });
        navigation.navigate('TabletLogin');
      }
      if (res.error) {
        setError(res.error);
      }
    } catch (e) {
      console.log('loginAPI e', e);
    }
    setLoading(false);
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
              ref={usernameRef}
              style={styles.inputTabletID}
              placeholder="Username"
              placeholderTextColor="#fff"
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
              onSubmitEditing={(): void => {
                if (username?.length) {
                  passwordRef?.current?._root?.focus?.();
                }
              }}
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
              ref={passwordRef}
              style={styles.inputTabletID}
              placeholder="Password"
              placeholderTextColor="#fff"
              autoCapitalize="none"
              returnKeyType="send"
              onSubmitEditing={(): void => {
                if (password?.length) {
                  submitLogin();
                }
              }}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          {error != '' && <Text style={styles.errorText}>{error}</Text>}
          <Button style={styles.button} onPress={submitLogin}>
            <Text style={styles.loginText}>Login</Text>
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
