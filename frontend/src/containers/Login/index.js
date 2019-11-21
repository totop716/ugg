import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  View, KeyboardAvoidingView, Linking
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

import {FontAwesome} from '@expo/vector-icons';

import styles from './styles';
import Utils from '../../utils'
import { ScrollView } from 'react-native-gesture-handler';
import { loginAPI } from '../../services/Authentication';

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: '',
    background: require('../../assets/images/LoginBackground.png'),
    };

  submitTabletLogin = () => {
    loginAPI(this.state.username, this.state.password).then(res=>{
      if(res.user){
        this.props.navigation.navigate('TabletLogin', {user: res.user});
      }
      if(res.error){
        this.setState({error: res.error});
      }
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <View style={{ flexGrow: 1 }} keyboardShouldPersistTaps="always">
          <Image source={require('../../assets/images/LoginBackground.png')} style={styles.backgroundImage} />
          <View style={styles.formContainer}>
            <View style={styles.inputfield_container}>
              <View style={styles.inputicon_container}>
                <FontAwesome.Button name="user" backgroundColor="#fff" color="#8cb58f" size={35} borderRadius={50} iconStyle={{marginRight: 0, paddingHorizontal: 5}}></FontAwesome.Button>
              </View>
              <Input
                style={styles.inputTabletID}
                placeholder="Username"
                placeholderTextColor="#fff"
                autoCapitalize="none"
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
              />
            </View>
            <View style={styles.inputfield_container}>
              <View style={styles.inputicon_container}>
                <FontAwesome.Button name="lock" backgroundColor="#fff" color="#8cb58f" size={35} borderRadius={50} iconStyle={{marginRight: 0, paddingHorizontal: 5}}></FontAwesome.Button>
              </View>
              <Input
                style={styles.inputTabletID}
                placeholder="Password"
                placeholderTextColor="#fff"
                autoCapitalize="none"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                secureTextEntry
              />
            </View>
            {
              this.state.error != "" &&
                <Text style={styles.errorText}>{this.state.error}</Text>
            }
            <Button
                style={styles.button}
                onPress={this.submitTabletLogin}
              >
              <Text style={styles.loginText}>Login</Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Login;
