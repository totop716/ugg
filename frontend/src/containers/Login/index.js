import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Container,
  Content,
  Form,
  Item,
  Input,
  Text,
  Textarea,
  Icon,
} from 'native-base';
import {
  TextInputMask
} from 'react-native-masked-text'

import styles from './styles';

class Login extends Component {
  state = {
    username: '',
    password: '',
    thankyouBoxVisible: false,
    showPasswordBox: false,
    showMenu: false,
    showTabletForm: false,
    phoneNumber: "", 
    phoneNumberFormat: ""
  };

  // navigate to home after a successful login
  onLoginButtonPressed = () => {
    // TODO: Login

    this.props.navigation.navigate('Home');
  }

  // navigate to signup screen
  onSignupButtonPressed = () => {
    this.props.navigation.navigate('Signup');
  }

  // navigate to forgot password screen
  onForgotPasswordButtonPressed = () => {
    this.props.navigation.navigate('ForgotPassword');
  }

  showThankyouBox = () => {
    this.setState({thankyouBoxVisible: true});
    setTimeout(() => {
      this.setState({thankyouBoxVisible: false});
    }, 3000)
  }

  hideThankyouBox = () => {
    this.setState({thankyouBoxVisible: false});
  }

  showPasswordBox = () => {
    this.setState({showPasswordBox: true});
  }

  showTabletForm = () => {
    this.setState({showTabletForm: true})
  }

  passwordSubmit = () => {
    this.setState({showPasswordBox: false});
    this.setState({showMenu: true});
  }

  exitFunction = () => {
    this.setState({showPasswordBox: false, showMenu: false, showTabletForm: false, thankyouBoxVisible: false});
  }

  submitTabletID = () => {
    this.setState({showTabletForm: false});
  }

  goToSignup = () => {
    this.props.navigation.navigate('Signup');
  }

  render() {
    return (
      <Container style={styles.container}>
        {this.state.thankyouBoxVisible && <View style={styles.thankyouBox}>
          <Icon ios='ios-close' android="md-close" style={styles.closeIcon} onPress={this.hideThankyouBox}/>
          <Text style={styles.thankyouText}>Thank you for checking in</Text>
        </View>
        }
        {this.state.showPasswordBox && <View style={[styles.thankyouBox, styles.passwordBox]}>
          <Input
            style={styles.inputMenuPass}
            placeholder="Enter Password"
            placeholderTextColor="#333"
            autoCapitalize="none"
            onChangeText={menuPass => this.setState({ menuPass })}
            onSubmitEditing={this.passwordSubmit}
            secureTextEntry
          />
        </View>
        }
        {this.state.showTabletForm && <View style={[styles.thankyouBox, styles.tabletBox]}>
          <Input
            style={styles.inputTabletID}
            placeholder="Tablet ID"
            placeholderTextColor="#333"
            autoCapitalize="none"
            onChangeText={tabletID => this.setState({ tabletID })}
          />
          <Button
              style={styles.button}
              onPress={this.submitTabletID}
              hasText
              block
              dark
            >
            <Text style={styles.loginText}>Submit</Text>
          </Button>
        </View>
        }
        <Content contentContainerStyle={styles.content}>
          {!this.state.showMenu && <Icon ios='ios-menu' android="md-menu" style={styles.menuIcon} onPress={this.showPasswordBox}/>
          }
          {this.state.showMenu && <View style={styles.menuContainer}>
            <TouchableOpacity onPress={this.exitFunction} style={styles.menuItem}>
              <Text style={styles.menuItemText}>Exit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.showTabletForm} style={styles.menuItem}>
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
          </View>
          }
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/icon.png')}
            />
            <Text style={styles.logoText}>Crowdbotics</Text>
          </View>

          {/* Form */}
          <Form style={styles.form}>
            <Item
              style={styles.item}
              last
            >
              <TextInputMask
                value={this.state.phoneNumberFormat}
                onChangeText={(phoneNumberFormat) => {
                    let phoneNumber = phoneNumberFormat.toString().replace(/\D+/g, '');
                    this.setState({phoneNumberFormat: phoneNumberFormat, phoneNumber: phoneNumber})
                }}
                type={'cel-phone'}
                maxLength={this.state.phoneNumberFormat.toString().startsWith("1") ? 18 : 16}
                options={
                  this.state.phoneNumber.startsWith("1") ?
                  {
                      dddMask: '9 (999) 999 - '
                  } : {
                      dddMask: '(999) 999 - '
                  }
                }
                style={styles.inputPhoneNo}
                placeholder="Phone No"
                placeholderTextColor="#fff"
              />
            </Item>
            <Button
              style={styles.button}
              onPress={this.showThankyouBox}
              hasText
              block
              dark
            >
              <Text style={styles.loginText}>Submit</Text>
            </Button>

            <Item
              style={styles.item}
              last
            >
              <View style={styles.disclaimerContain}><Text style={styles.disclaimerText}>AAA</Text></View>
            </Item>
          </Form>
          <View style={styles.buttonContainer}>
            {/* Login Button */}

            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={this.onForgotPasswordButtonPressed}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Signup Button */}
            <View style={styles.signupContainer}>
              <Text style={styles.dontHaveAccountText}>Don't have an account?</Text>
              <TouchableOpacity onPress={this.onSignupButtonPressed}>
                <Text style={styles.signupText}>Sign Up Now.</Text>
              </TouchableOpacity>
            </View>
          </View>

        </Content>
      </Container>
    );
  }
}

export default Login;
