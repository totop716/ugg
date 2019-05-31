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
import { getUserAPI, updateCheckTime, updateTabletID, getTabletAPI } from '../../services/Authentication';

class Login extends Component {
  state = {
    username: '',
    password: '',
    phoneNoAlert: false,
    thankyouBoxVisible: false,
    comebackBoxVisible: false,
    showPasswordBox: false,
    showMenu: false,
    showTabletForm: false,
    phoneNumber: "", 
    phoneNumberFormat: "",
    tabletID: "",
    userData: null,
    tabletData: null
  };

  componentDidMount() {
  }

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

  hidePhoneNoAlert = () => {
    this.setState({phoneNoAlert: false});
  }

  showThankyouBox = () => {
    if(this.state.phoneNumber == ""){
      this.setState({phoneNoAlert: true})
    }else{
      getUserAPI(this.state.phoneNumber).then((res) => {
        this.setState({userData: res.user});
        getTabletAPI(this.state.userData.id).then((res1)=>{
          this.setState({tabletData: res1.tablet})
          this.setState({tabletID: res1.tablet.name});
          const currenttime = new Date().getTime();
          const checkedtime = new Date(this.state.userData.check_time).getTime();
          if(this.state.userData.check_time == "" || currenttime - checkedtime > 24 * 3600 * 1000){
            this.setState({thankyouBoxVisible: true});
            const currentDate = new Date();
            const check_time = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
            updateCheckTime(this.state.phoneNumber, check_time).then((res1) => {
              console.log(res1);
            })
            setTimeout(() => {
              this.setState({thankyouBoxVisible: false});
            }, 3000);
          }else{
            this.setState({comebackBoxVisible: true});
          }
          setTimeout(() => {
            this.setState({phoneNumberFormat: ""});
          }, 3000)  
        }).catch((error)=>{
          if(error){
            this.setState({tabletData: {name: ''}})
            this.setState({tabletID: ''});
            const currenttime = new Date().getTime();
            const checkedtime = new Date(this.state.userData.check_time).getTime();
            if(this.state.userData.check_time == "" || currenttime - checkedtime > 24 * 3600 * 1000){
              this.setState({thankyouBoxVisible: true});
              const currentDate = new Date();
              const check_time = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
              updateCheckTime(this.state.phoneNumber, check_time).then((res1) => {
                console.log(res1);
              })
              setTimeout(() => {
                this.setState({thankyouBoxVisible: false});
              }, 3000);
            }else{
              this.setState({comebackBoxVisible: true});
            }
            setTimeout(() => {
              this.setState({phoneNumberFormat: ""});
            }, 3000)
          }
        })
      }).catch((error)=>{
        if(error)
          this.goToSignup();
      })  
    }
  }

  hideThankyouBox = () => {
    this.setState({thankyouBoxVisible: false});
  }

  hidecomeebackBox = () => {
    this.setState({comebackBoxVisible: false});
  }

  showPasswordBox = () => {
    this.setState({showPasswordBox: true});
  }

  hidePasswordBox = () => {
    this.setState({showPasswordBox: false});
  }

  showTabletForm = () => {
    this.setState({showTabletForm: true})
  }

  passwordSubmit = () => {
    this.setState({showPasswordBox: false});
    this.setState({showMenu: true});
  }

  exitFunction = () => {
    this.setState({showPasswordBox: false, showMenu: false, showTabletForm: false, thankyouBoxVisible: false, phoneNumberFormat: '', phoneNumber: '', tabletID: '', userData: null});
  }

  submitTabletID = () => {
    updateTabletID(this.state.tabletData, this.state.tabletID, this.state.userData.id).then((res1) => {
      console.log(res1);
      this.setState({showTabletForm: false});
    })
  }

  goToSignup = () => {
    this.props.navigation.navigate('Signup', {phoneNumber: this.state.phoneNumber});
  }

  render() {
    return (
      <Container style={styles.container}>
        <Image source={require('../../assets/images/SummerShoppingBg.png')} style={styles.backgroundImage} />
        {this.state.phoneNoAlert && <View style={styles.thankyouBox}>
          <Icon ios='ios-close' android="md-close" style={styles.closeIcon} onPress={this.hidePhoneNoAlert}/>
          <Text style={styles.thankyouText}>You need to input Phone NO</Text>
        </View>
        }
        {this.state.thankyouBoxVisible && <View style={styles.thankyouBox}>
          <Icon ios='ios-close' android="md-close" style={styles.closeIcon} onPress={this.hideThankyouBox}/>
          <Text style={styles.thankyouText}>Thank you “{this.state.userData.first_name}“ for checking in “{this.state.tabletData.name }“</Text>
        </View>
        }
        {this.state.comebackBoxVisible && <View style={styles.thankyouBox}>
          <Icon ios='ios-close' android="md-close" style={styles.closeIcon} onPress={this.hidecomeebackBox}/>
          <Text style={styles.thankyouText}>You have already checked in to “{this.state.tabletData.name }” for Today.</Text><Text style={styles.thankyouText}>Come back tomorrow.</Text>
        </View>
        }
        {this.state.showPasswordBox && <View style={[styles.thankyouBox, styles.passwordBox]}>
          {this.state.phoneNumber != "" && 
            <Input
              style={styles.inputMenuPass}
              placeholder="Enter Password"
              placeholderTextColor="#333"
              autoCapitalize="none"
              onChangeText={menuPass => this.setState({ menuPass })}
              onSubmitEditing={this.passwordSubmit}
              secureTextEntry
            />
          }
          {this.state.phoneNumber == "" &&
            <View style={styles.passwordContainer}>
              <Icon ios='ios-close' android="md-close" style={[styles.closeIcon, styles.closeIconPass]} onPress={this.hidePasswordBox}/>
              <Text style={styles.thankyouText}>You need to login with Phone NO at first.</Text>
            </View>
          }
        </View>
        }
        {this.state.showTabletForm && <View style={[styles.thankyouBox, styles.tabletBox]}>
          <Input
            style={styles.inputTabletID}
            placeholder="Tablet ID"
            placeholderTextColor="#333"
            autoCapitalize="none"
            value={this.state.tabletID}
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
              source={require('../../assets/images/Summer_Shopping.png')}
            />
          </View>

          {/* Form */}
          <Form style={styles.form}>
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
              placeholder="+1 (000) 000 - 0000"
              placeholderTextColor="#a1a1a1"
            />
            <Button
              style={styles.button}
              onPress={this.showThankyouBox}
              hasText
              block
              dark
            >
              <Text style={styles.loginText}>Submit</Text>
            </Button>

            <View style={styles.disclaimerContain}><Text style={styles.disclaimerText}>Welcome to{'\n'}Universal Gaming Group!!!</Text></View>
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
