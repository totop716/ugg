import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  View, KeyboardAvoidingView
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
  TextInputMask
} from 'react-native-masked-text'

import Constants from 'expo-constants';

import styles from './styles';
import Utils from '../../utils'
import { getUserAPI, updateCheckTime, updateTabletID, getTabletAPI, getSweepstakeAPI, getSettingsAPI } from '../../services/Authentication';
import { ScrollView } from 'react-native-gesture-handler';

class Login extends Component {
  state = {
    username: '',
    password: '',
    phoneNoAlert: false,
    thankyouBoxVisible: false,
    comebackBoxVisible: false,
    signupBoxVisible: false,
    showPasswordBox: false,
    showMenu: false,
    showTabletForm: false,
    phoneNumber: "", 
    phoneNumberFormat: "",
    tabletID: "",
    userData: null,
    tabletData: null,
    passwordError: '',
    tabletidError: '',
    sweepstakeData: null,
    sweepbackground: require('../../assets/images/SummerShoppingBg.png'),
    sweeplogo: require('../../assets/images/Summer_Shopping.png'),
    sweepdisclaimer: "Disclaimer Text",
    sweepadded: false,
    sweepcountdown: false,
    };

  componentWillReceiveProps(props){
    if (props.navigation.getParam('exit') == 1){
      this.setState({showPasswordBox: false, showMenu: false, showTabletForm: false, thankyouBoxVisible: false, phoneNumberFormat: '', phoneNumber: '', tabletID: '', userData: null});
    }else if(props.navigation.getParam('exit') == 2){
      this.setState({showPasswordBox: false, showMenu: false, showTabletForm: false, thankyouBoxVisible: false, phoneNumberFormat: '', phoneNumber: '', tabletID: '', userData: null});
      this.setState({signupBoxVisible: true})      
    }
  }

  componentDidMount() {
    // console.log("Constatnts:", Constants);
    getTabletAPI(Constants.deviceId).then((res1)=>{
      this.setState({tabletData: res1.tablet})
      this.setState({tabletID: res1.tablet.name});
      if(this.state.tabletData.active_sweep != null && this.state.tabletData.active_sweep != ''){
        getSweepstakeAPI(this.state.tabletData.active_sweep).then((res2)=>{
          this.setState({sweepstakeData: res2.sweepstake});
          this.setState({sweepbackground: { uri: Utils.serverUrl+'static/img/uploads/'+this.state.sweepstakeData.background}})
          this.setState({sweeplogo: { uri: Utils.serverUrl+'static/img/uploads/'+this.state.sweepstakeData.logo}})
          this.setState({sweepdisclaimer: this.state.sweepstakeData.disclaimer})
        })
      }
      if(this.state.tabletData.sweep_ids != null && this.state.tabletData.sweep_ids != ''){
        sweep_array = this.state.tabletData.sweep_ids.substring(0, this.state.tabletData.sweep_ids.length - 1).split(",");
        for(let i = 0; i < sweep_array.length; i++){
          getSweepstakeAPI(sweep_array[i]).then((res2)=>{
            let begin_date;
            if(i == 0)
              begin_date = res2.sweepstake.startdate;
            else if(begin_date > res2.startdate)
              begin_date = res2.sweepstake.startdate;

            if(i == sweep_array.length - 1){
              const currentdate = new Date().getTime();
              const begindatetime = new Date(begin_date).getTime();
              if(currentdate < begindatetime){
                this.setState({sweepcountdown: true});
                this.setState({countdown: begindatetime - currentdate});
                this.interval = setInterval(this.sweepcountdown, 1000);
              }else{
                this.setState({sweepadded: true});
              }
            }
          })  
        }
      }
    }).catch((error)=>{
      if(error){
        this.setState({sweepadded: false})
      }
    })
  }

  sweepcountdown = () => {
    this.setState({countdown: this.state.countdown - 1000})
    console.log(this.state.countdown)
    if(this.state.countdown <= 0){
      clearInterval(this.interval);
      this.setState({sweepcountdown: false})
      this.setState({sweepadded: true});
    }
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
        const currenttime = new Date();
        const checkedtime = new Date(this.state.userData.check_time);
        if(this.state.userData.check_time == "" || this.state.userData.check_time == null || (currenttime.getFullYear() > checkedtime.getFullYear() || currenttime.getMonth() > checkedtime.getMonth() || currenttime.getDate() > checkedtime.getDate())){
          this.setState({thankyouBoxVisible: true});
          const currentDate = new Date();
          // const check_time = currentDate.getUTCFullYear() + "-" + (currentDate.getUTCMonth() + 1) + "-" + currentDate.getUTCDate() + " " + currentDate.getUTCHours() + ":" + currentDate.getUTCMinutes() + ":" + currentDate.getUTCSeconds();
          const check_time = currentDate.getUTCFullYear() + "-" + (currentDate.getUTCMonth() + 1) + "-" + currentDate.getUTCDate();
          updateCheckTime(this.state.phoneNumber, check_time).then((res2) => {
            console.log(res2);
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

  hideTabletForm = () => {
    this.setState({showTabletForm: false})
  }

  passwordSubmit = () => {
    getSettingsAPI().then((res) => {
      if((res.settings.length == 0 && this.state.menuPass == "") || (res.settings.length > 0 && this.state.menuPass == res.settings[0].device_code)){
        this.setState({passwordError: ''});
        this.setState({showPasswordBox: false});
        this.setState({showMenu: true});
        getTabletAPI(Constants.deviceId).then((res1)=>{
          console.log(res1.tablet);
          this.setState({tabletData: res1.tablet})
          this.setState({tabletID: res1.tablet.name});
          if(this.state.tabletData.active_sweep != null && this.state.tabletData.active_sweep != ''){
            getSweepstakeAPI(this.state.tabletData.active_sweep).then((res2)=>{
              this.setState({sweepstakeData: res2.sweepstake});
              this.setState({sweepbackground: { uri: Utils.serverUrl+'static/img/uploads/'+this.state.sweepstakeData.background}})
              this.setState({sweeplogo: { uri: Utils.serverUrl+'static/img/uploads/'+this.state.sweepstakeData.logo}})
              this.setState({sweepdisclaimer: this.state.sweepstakeData.disclaimer})
            })
          }
        }).catch((error)=>{
          if(error){
            this.setState({tabletData: {name: ''}})
            this.setState({tabletID: ''});
          }
        })
      }else{
        this.setState({passwordError: 'Please input correct password'});
      }  
    });
  }

  hideSignupBox = () => {
    this.setState({signupBoxVisible: false});
  }

  exitFunction = () => {
    this.setState({showPasswordBox: false, showMenu: false, showTabletForm: false, thankyouBoxVisible: false, phoneNumberFormat: '', phoneNumber: '', tabletID: '', userData: null});
  }

  submitTabletID = () => {
    if(this.state.tabletID == ""){
      this.state.tabletidError = "Please input tablet ID";
    }else{
      updateTabletID(this.state.tabletData, this.state.tabletID, this.state.userData == null ? null: this.state.userData.id).then((res1) => {
        console.log(res1);
        this.setState({showTabletForm: false});
      })
    }
  }

  goToSignup = () => {
    this.props.navigation.navigate('Signup', {phoneNumber: this.state.phoneNumber});
  }

  render() {
    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        {this.state.sweepstakeData == null &&
          <Image source={this.state.sweepbackground} style={styles.backgroundImage} />
        }
        {this.state.phoneNoAlert && <View style={styles.thankyouBox}>
          <Icon ios='ios-close' android="md-close" style={styles.closeIcon} onPress={this.hidePhoneNoAlert}/>
          <Text style={styles.thankyouText}>You need to input Phone NO</Text>
        </View>
        }
        {this.state.signupBoxVisible && <View style={styles.thankyouBox}>
          <Icon ios='ios-close' android="md-close" style={styles.closeIcon} onPress={this.hideSignupBox}/>
          <Text style={styles.thankyouText}>Thank you for signing up with Universal Gaming Group</Text>
        </View>
        }
        {this.state.thankyouBoxVisible && <View style={styles.thankyouBox}>
          <Icon ios='ios-close' android="md-close" style={styles.closeIcon} onPress={this.hideThankyouBox} />
          <Text style={styles.thankyouText}>Thank you “{this.state.userData.first_name}“ for checking in “{this.state.tabletData == null ? '' : this.state.tabletData.name }“</Text>
        </View>
        }
        {this.state.comebackBoxVisible && <View style={styles.thankyouBox}>
          <Icon ios='ios-close' android="md-close" style={styles.closeIcon} onPress={this.hidecomeebackBox} />
          <TouchableOpacity style={styles.closeIcon} onPress={this.hidecomeebackBox}><Icon name="close" /></TouchableOpacity>
          <Text style={styles.thankyouText}>You have already checked in to “{this.state.tabletData == null ? '' : this.state.tabletData.name }” for Today.</Text><Text style={styles.thankyouText}>Come back tomorrow.</Text>
        </View>
        }
        {this.state.showPasswordBox && <View style={styles.thankyouBox}>
            <Icon ios='ios-close' android="md-close" style={styles.closeIcon} onPress={this.hidePasswordBox} /> 
            <Input
              style={styles.inputMenuPass}
              placeholder="Enter Password"
              placeholderTextColor="#333"
              autoCapitalize="none"
              onChangeText={menuPass => this.setState({ menuPass })}
              onSubmitEditing={this.passwordSubmit}
              secureTextEntry
            />
            {
              this.state.passwordError != "" &&
                <Text style={styles.errorText}>{this.state.passwordError}</Text>
            }
            <Button
                style={styles.button}
                onPress={this.passwordSubmit}
              >
              <Text style={styles.loginText}>SUBMIT</Text>
            </Button>
          </View>
        }
        {this.state.showTabletForm && <View style={styles.thankyouBox}>
          <Icon ios='ios-close' android="md-close" style={styles.closeIcon} onPress={this.hideTabletForm} /> 
          <Input
            style={styles.inputTabletID}
            placeholder="Tablet ID"
            placeholderTextColor="#333"
            autoCapitalize="none"
            value={this.state.tabletID}
            onChangeText={tabletID => this.setState({ tabletID })}
          />
          {
            this.state.tabletidError != "" &&
              <Text style={styles.errorText}>{this.state.tabletidError}</Text>
          }
          <Button
              style={styles.button}
              onPress={this.submitTabletID}
            >
            <Text style={styles.loginText}>Submit</Text>
          </Button>
        </View>
        }
        <Content contentContainerStyle={styles.content}>
          {!this.state.showMenu && <Icon ios='ios-menu' android="md-menu" style={styles.menuIcon} onPress={this.showPasswordBox} />
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
              source={this.state.sweeplogo}
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
            {this.state.sweepadded && <Button
              onPress={this.showThankyouBox}
              fontSize='20'
              style={styles.button}
              primary
            ><Text style={styles.loginText}>SUBMIT</Text></Button>}
            {this.state.sweepcountdown && <Text style={styles.countdown}>
              { Math.floor(this.state.countdown/86400000) > 0 && Math.floor(this.state.countdown/86400000)+' Days ' }{Math.floor((this.state.countdown%86400000)/3600000) >= 10 ? Math.floor((this.state.countdown%86400000)/3600000) : '0' + Math.floor((this.state.countdown%86400000)/3600000) }:{Math.floor((this.state.countdown%3600000)/60000) >=10 ? Math.floor((this.state.countdown%3600000)/60000) : '0'+ Math.floor((this.state.countdown%3600000)/60000)}:{Math.floor((this.state.countdown%60000)/1000) >=10 ? Math.floor((this.state.countdown%60000)/1000): '0'+Math.floor((this.state.countdown%60000)/1000) } Remaining
            </Text>}
            <View style={styles.disclaimerContain}><Text style={styles.disclaimerText}>{this.state.sweepdisclaimer}</Text></View>
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
      </KeyboardAvoidingView>
    );
  }
}

export default Login;
