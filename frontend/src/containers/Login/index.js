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
import {
  TextInputMask
} from 'react-native-masked-text'

import Constants from 'expo-constants';

import styles from './styles';
import Utils from '../../utils'
import { getUserAPI, updateCheckTime, updateTabletID, getTabletAPI, getSweepstakeAPI, getSettingsAPI, getCheckInTime, updateTabletKey, updateTabletStatus, getTabletfromKey } from '../../services/Authentication';
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
    showTabletPasswordBox: false,
    showMenu: false,
    showTabletForm: false,
    phoneNumber: "", 
    phoneNumberFormat: "",
    tabletID: "",
    tablet_Pass: "",
    tablet_password: "",
    tablet_confirmpassword: "",
    tabletIDLogin: "",
    tabletpasswordlogin: "",
    userData: null,
    tabletData: null,
    passwordError: '',
    tablet_PassError: '',
    tabletSubmitError: '',
    tabletLoginError: '',
    sweepstakeData: null,
    sweepbackground: require('../../assets/images/SummerShoppingBg.png'),
    sweeplogo: require('../../assets/images/Summer_Shopping.png'),
    sweepdisclaimer: "Disclaimer Text",
    sweepadded: false,
    sweepcountdown: false,
    begin_date: '',
    };

  componentWillReceiveProps(props){
    if (props.navigation.getParam('exit') == 1){
      this.setState({showPasswordBox: false, showMenu: false, showTabletForm: false, thankyouBoxVisible: false, phoneNumberFormat: '', phoneNumber: '', tabletID: props.navigation.getParam('tabletData').name, userData: null, tabletData: props.navigation.getParam('tabletData'), sweepstakeData: props.navigation.getParam('sweepstakeData')});
    }else if(props.navigation.getParam('exit') == 2){
      this.setState({showPasswordBox: false, showMenu: false, showTabletForm: false, thankyouBoxVisible: false, phoneNumberFormat: '', phoneNumber: '', tabletID: props.navigation.getParam('tabletData').name, userData: null, tabletData: props.navigation.getParam('tabletData'), sweepstakeData: props.navigation.getParam('sweepstakeData')});
      this.setState({signupBoxVisible: true})      
    }
    console.log(this.state.tabletData, ' ', this.state.sweepstakeData);
  }

  componentDidMount() {
    getTabletfromKey(Constants.deviceId).then(res => {
      console.log("RES", res);
      if(res.tablet != null && res.tablet.length > 0){
        this.setState({tabletData: res.tablet[0]});
        this.setState({tabletID: res.tablet[0].name});
        this.setState({showTabletLoginForm: false});
        this.setState({tabletIDLogin: ''});
        this.setState({tabletpasswordlogin: ''});
        this.setState({tabletLoginError: ''});
        this.setState({showMenu: false});
        if(this.state.tabletData.active_sweep != null && this.state.tabletData.active_sweep != ''){
          getSweepstakeAPI(this.state.tabletData.active_sweep).then((res2)=>{
            this.setState({sweepstakeData: res2.sweepstake});
            this.setState({sweepbackground: { uri: Utils.serverUrl+'static/img/uploads/'+this.state.sweepstakeData.background}})
            this.setState({sweeplogo: { uri: Utils.serverUrl+'static/img/uploads/'+this.state.sweepstakeData.logo}})
            this.setState({sweepdisclaimer: this.state.sweepstakeData.disclaimer})
            this.setState({begin_date:res2.sweepstake.startdate});
            setTimeout(this.setSweepadded, 1000);
          })
        }else{
          if(this.state.tabletData.sweep_ids != null && this.state.tabletData.sweep_ids != ''){
            sweep_array = this.state.tabletData.sweep_ids.substring(0, this.state.tabletData.sweep_ids.length - 1).split(",");          
            for(let i = 0; i < sweep_array.length; i++){
              getSweepstakeAPI(sweep_array[i]).then((res3)=>{
                if(i == 0){
                  this.setState({begin_date:res3.sweepstake.startdate});
                  this.setState({sweepstakeData: res3.sweepstake});
                }
                else if(this.state.begin_date > res3.sweepstake.startdate){
                  this.setState({begin_date:res3.sweepstake.startdate});
                  this.setState({sweepstakeData: res3.sweepstake});
                }
                if(i == sweep_array.length - 1){
                  setTimeout(this.setSweepadded, 1000);
                }
              })  
            }
          }
        } 
      }
    })
  }

  sweepcountdown = () => {
    this.setState({countdown: this.state.countdown - 1000})
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
        getCheckInTime(this.state.userData.id, this.state.tabletData.id, this.state.sweepstakeData.id).then((res1) => {
          // const checkedtime = new Date(res1.checkin.check_time.replace(" ", "T"));
          let checkedtime = '';
          if(res1.checkin.check_time != null){
            const checkedtime_array = res1.checkin.check_time.split("T");
            checkedtime = checkedtime_array[0].split("-");  
          }
          console.log("Check Date", checkedtime);
          if(res1.checkin.check_time == "" || res1.checkin.check_time == null || currenttime.getFullYear() > parseInt(checkedtime[0]) || currenttime.getMonth() > parseInt(checkedtime[1]) - 1 || currenttime.getDate() > parseInt(checkedtime[2])){
            this.setState({thankyouBoxVisible: true});
            const check_time = currenttime.getFullYear() + "-" + (currenttime.getMonth() + 1) + "-" + currenttime.getDate() + " " + currenttime.getHours() + ":" + currenttime.getMinutes() + ":" + currenttime.getSeconds();
            // const check_time = currentDate.getUTCFullYear() + "-" + (currentDate.getUTCMonth() + 1) + "-" + currentDate.getUTCDate();
            console.log('Sweepdata', this.state.sweepstakeData);
            updateCheckTime(this.state.userData.id, this.state.tabletData.id, this.state.sweepstakeData.id, check_time).then((res2) => {
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
        });
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

  showTabletLoginForm = () => {
    this.setState({showTabletLoginForm: true})
  }

  hideTabletLoginForm = () => {
    this.setState({showTabletLoginForm: false})
  }

  passwordSubmit = () => {
    getSettingsAPI().then((res) => {
      if((res.settings.length == 0 && this.state.menuPass == "") || (res.settings.length > 0 && this.state.menuPass == res.settings[0].device_code)){
        this.setState({passwordError: ''});
        this.setState({showPasswordBox: false});
        this.setState({showMenu: true});
      }else{
        this.setState({passwordError: 'Please input correct password'});
      }  
    });
  }

  hideSignupBox = () => {
    this.setState({signupBoxVisible: false});
  }

  exitFunction = () => {
    this.setState({showTabletPasswordBox: true});
  }

  hideTabletPasswordBox = () => {
    this.setState({showTabletPasswordBox: false});
  }

  passwordTabletSubmit = () => {
    getTabletAPI(this.state.tabletID, this.state.tablet_Pass).then((res) => {
      console.log(res);
      if(res.tablet.length > 0){
        updateTabletStatus(this.state.tabletData.id, 0).then(res => {
          this.setState({showPasswordBox: false, showMenu: false, showTabletForm: false, showTabletPasswordBox: false, tablet_PassError: "", thankyouBoxVisible: false, phoneNumberFormat: '', phoneNumber: '', tabletID: '', tablet_password: '', tablet_confirmpassword: '', tabletData: null, sweepstakeData: null, userData: null, sweepbackground: require('../../assets/images/SummerShoppingBg.png'),
          sweeplogo: require('../../assets/images/Summer_Shopping.png'), sweepdisclaimer: "Disclaimer Text"});  
        });
      }else{
        this.setState({tablet_PassError: "Password is not correct"});
      }
    }).catch(error => {
    })
  }

  submitTabletID = () => {
    if(this.state.tabletID == ""){
      this.setState({tabletSubmitError:"Please input tablet ID"});
    }else if(this.state.tablet_password !== this.state.tablet_confirmpassword){
      this.setState({tabletSubmitError:"Password and Confirm password do not match"});
    }else{
      updateTabletID(this.state.tabletData, this.state.tabletID, this.state.tablet_password, this.state.userData == null ? null: this.state.userData.id).then((res1) => {
        console.log(res1);
        getTabletAPI(this.state.tabletID, this.state.tablet_password).then(res2=>{
          this.setState({tabletData: res2.tablet[0]})
          this.setState({tablet_password: ''});
          this.setState({tablet_confirmpassword: ''});
          this.setState({tabletSubmitError: ''})
          this.setState({showTabletForm: false});
          this.setState({showMenu: false});
          updateTabletStatus(this.state.tabletData.id, 1).then((res2)=>{
            console.log(res2);
          });
        });
      })
    }
  }

  submitTabletLogin = () => {
    getTabletAPI(this.state.tabletIDLogin, this.state.tabletpasswordlogin).then((res1)=>{
      this.setState({tabletData: res1.tablet[0]})
      this.setState({tabletID: res1.tablet[0].name});
      this.setState({showTabletLoginForm: false});
      this.setState({tabletIDLogin: ''});
      this.setState({tabletpasswordlogin: ''});
      this.setState({tabletLoginError: ''});
      this.setState({showMenu: false});
      updateTabletStatus(this.state.tabletData.id, 1).then((res2)=>{
        console.log("LOGINSTATUS ", res2);
        if(this.state.tabletData.active_sweep != null && this.state.tabletData.active_sweep != ''){
          getSweepstakeAPI(this.state.tabletData.active_sweep).then((res2)=>{
            this.setState({sweepstakeData: res2.sweepstake});
            this.setState({sweepbackground: { uri: Utils.serverUrl+'static/img/uploads/'+this.state.sweepstakeData.background}})
            this.setState({sweeplogo: { uri: Utils.serverUrl+'static/img/uploads/'+this.state.sweepstakeData.logo}})
            this.setState({sweepdisclaimer: this.state.sweepstakeData.disclaimer})
            this.setState({begin_date:res2.sweepstake.startdate});
            setTimeout(this.setSweepadded, 1000);
          })
        }else{
          if(this.state.tabletData.sweep_ids != null && this.state.tabletData.sweep_ids != ''){
            sweep_array = this.state.tabletData.sweep_ids.substring(0, this.state.tabletData.sweep_ids.length - 1).split(",");          
            for(let i = 0; i < sweep_array.length; i++){
              getSweepstakeAPI(sweep_array[i]).then((res3)=>{
                if(i == 0){
                  this.setState({begin_date:res3.sweepstake.startdate});
                  this.setState({sweepstakeData: res3.sweepstake});
                }
                else if(this.state.begin_date > res3.sweepstake.startdate){
                  this.setState({begin_date:res3.sweepstake.startdate});
                  this.setState({sweepstakeData: res3.sweepstake});
                }
                if(i == sweep_array.length - 1){
                  setTimeout(this.setSweepadded, 1000);
                }
              })  
            }
          }
        }  
      })
    }).catch((error)=>{
      if(error){
        this.setState({tabletLoginError: "Tablet ID or Password is not correct"})
      }
    })
  }

  setSweepadded = () => {
    this.setState({sweepbackground: { uri: Utils.serverUrl+'static/img/uploads/'+this.state.sweepstakeData.background}})
    this.setState({sweeplogo: { uri: Utils.serverUrl+'static/img/uploads/'+this.state.sweepstakeData.logo}})
    console.log('Sweep Array', this.state.sweeplogo);
    this.setState({sweepdisclaimer: this.state.sweepstakeData.disclaimer})
    console.log("SweepData ", this.state.sweepbackground);
    const currentdate = new Date().getTime();
    const begindatetime = new Date(this.state.begin_date).getTime();
    console.log(currentdate, ' ', begindatetime)
    if(currentdate < begindatetime){
      this.setState({sweepcountdown: true});
      this.setState({countdown: begindatetime - currentdate});
      this.interval = setInterval(this.sweepcountdown, 1000);
      this.setState({sweepadded: false});
    }else{
      this.setState({sweepadded: true});
    }
  }

  goToSignup = () => {
    this.props.navigation.navigate('Signup', {phoneNumber: this.state.phoneNumber, tabletData: this.state.tabletData, sweepstakeData: this.state.sweepstakeData, tabletID: this.state.tabletID});
  }

  updateDeviceID = () => {
    if(this.state.tabletData == null){
      this.setState({showAssignTabletBox: true});
    }else{
      updateTabletKey(this.state.tabletData.id).then(res => {
        this.setState({showTabletKeyUpdateBox: true});
        this.setState({showMenu: false});
        setTimeout(()=>{this.setState({showTabletKeyUpdateBox: false})}, 3000);
      });
    }
  }

  hideAssignTabletBox = () => {
    this.setState({showAssignTabletBox: false});
  }

  hideTabletKeyUpdateBox = () => {
    this.setState({showTabletKeyUpdateBox: false});
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="always">
          <Image source={this.state.sweepbackground} style={styles.backgroundImage} />
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
          {this.state.showAssignTabletBox && <View style={styles.thankyouBox}>
            <Icon ios='ios-close' android="md-close" style={styles.closeIcon} onPress={this.hideAssignTabletBox}/>
            <Text style={styles.thankyouText}>Please assign tablet at first.</Text>
          </View>
          }
          {this.state.showTabletKeyUpdateBox && <View style={styles.thankyouBox}>
            <Icon ios='ios-close' android="md-close" style={styles.closeIcon} onPress={this.hideTabletKeyUpdateBox}/>
            <Text style={styles.thankyouText}>Tablet key updated successfully.</Text>
          </View>
          }
          {this.state.thankyouBoxVisible && <View style={styles.thankyouBox}>
            <Icon ios='ios-close' android="md-close" style={styles.closeIcon} onPress={this.hideThankyouBox} />
            <Text style={styles.thankyouText}>Thank you {this.state.userData.first_name} for checking in {this.state.tabletData == null ? '' : this.state.tabletData.name }</Text>
          </View>
          }
          {this.state.comebackBoxVisible && <View style={styles.thankyouBox}>
            <Icon ios='ios-close' android="md-close" style={styles.closeIcon} onPress={this.hidecomeebackBox} />
            <TouchableOpacity style={styles.closeIcon} onPress={this.hidecomeebackBox}><Icon name="close" /></TouchableOpacity>
            <Text style={styles.thankyouText}>You have already checked in to {this.state.tabletData == null ? '' : this.state.tabletData.name } for Today. Come back tomorrow.</Text>
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
          {this.state.showTabletPasswordBox && <View style={styles.thankyouBox}>
              <Icon ios='ios-close' android="md-close" style={styles.closeIcon} onPress={this.hideTabletPasswordBox} /> 
              <Input
                style={styles.inputMenuPass}
                placeholder="Enter Password for the Tablet"
                placeholderTextColor="#333"
                autoCapitalize="none"
                onChangeText={tablet_Pass => this.setState({ tablet_Pass })}
                onSubmitEditing={this.passwordTabletSubmit}
                secureTextEntry
              />
              {
                this.state.tablet_PassError != "" &&
                  <Text style={styles.errorText}>{this.state.tablet_PassError}</Text>
              }
              <Button
                  style={styles.button}
                  onPress={this.passwordTabletSubmit}
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
            <Input
              style={styles.inputTabletID}
              placeholder="Password"
              placeholderTextColor="#333"
              autoCapitalize="none"
              value={this.state.tablet_password}
              onChangeText={tablet_password => this.setState({ tablet_password })}
              secureTextEntry
            />
            <Input
              style={styles.inputTabletID}
              placeholder="Confirm Password"
              placeholderTextColor="#333"
              autoCapitalize="none"
              value={this.state.tablet_confirmpassword}
              onChangeText={tablet_confirmpassword => this.setState({ tablet_confirmpassword })}
              secureTextEntry
            />
            {
              this.state.tabletSubmitError != "" &&
                <Text style={styles.errorText}>{this.state.tabletSubmitError}</Text>
            }
            <Button
                style={styles.button}
                onPress={this.submitTabletID}
              >
              <Text style={styles.loginText}>Submit</Text>
            </Button>
          </View>
          }
          {this.state.showTabletLoginForm && <View style={styles.thankyouBox}>
            <Icon ios='ios-close' android="md-close" style={styles.closeIcon} onPress={this.hideTabletLoginForm} /> 
            <Input
              style={styles.inputTabletID}
              placeholder="Tablet ID"
              placeholderTextColor="#333"
              autoCapitalize="none"
              value={this.state.tabletIDLogin}
              onChangeText={tabletIDLogin => this.setState({ tabletIDLogin })}
            />
            <Input
              style={styles.inputTabletID}
              placeholder="Password"
              placeholderTextColor="#333"
              autoCapitalize="none"
              value={this.state.tabletpasswordlogin}
              onChangeText={tabletpasswordlogin => this.setState({ tabletpasswordlogin })}
              secureTextEntry
            />
            {
              this.state.tabletLoginError != "" &&
                <Text style={styles.errorText}>{this.state.tabletLoginError}</Text>
            }
            <Button
                style={styles.button}
                onPress={this.submitTabletLogin}
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
              <TouchableOpacity onPress={this.showTabletLoginForm} style={styles.menuItem}>
                <Text style={styles.menuItemText}>Tablet Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.updateDeviceID} style={styles.menuItem}>
                <Text style={styles.menuItemText}>Update Tablet Key</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.showTabletForm} style={styles.menuItem}>
                <Text style={styles.menuItemText}>Settings</Text>
              </TouchableOpacity>
            </View>
            }
            {this.state.tabletData == null &&
              <View style={styles.warningContainer}><Text style={styles.warningText}>Please assign tablet ID and Sweepstake to continue</Text></View>
            }
            {this.state.tabletData != null && this.state.sweepstakeData == null &&
              <View style={styles.warningContainer}><Text style={styles.warningText}>Please assign a sweepstake for {this.state.tabletID}</Text></View>
            }
            {this.state.tabletData != null && this.state.sweepstakeData != null &&
              <View style={styles.content}>
              {/* Logo */}
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={this.state.sweeplogo}
                />
              </View>

              {/* Form */}
              <Form style={styles.form}>
              {this.state.sweepadded && <TextInputMask
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
              /> }
                {this.state.sweepadded && <Button
                  onPress={this.showThankyouBox}
                  fontSize='20'
                  style={styles.button}
                  primary
                ><Text style={styles.loginText}>SUBMIT</Text></Button>}
                {this.state.sweepcountdown && <Text style={styles.countdown}>
                  { Math.floor(this.state.countdown/86400000) > 1 ? Math.floor(this.state.countdown/86400000)+' Days ' : Math.floor(this.state.countdown/86400000) > 0 ? '1 Day ' : '' }{Math.floor((this.state.countdown%86400000)/3600000) >= 10 ? Math.floor((this.state.countdown%86400000)/3600000) : '0' + Math.floor((this.state.countdown%86400000)/3600000) }:{Math.floor((this.state.countdown%3600000)/60000) >=10 ? Math.floor((this.state.countdown%3600000)/60000) : '0'+ Math.floor((this.state.countdown%3600000)/60000)}:{Math.floor((this.state.countdown%60000)/1000) >=10 ? Math.floor((this.state.countdown%60000)/1000): '0'+Math.floor((this.state.countdown%60000)/1000) } Remaining to start
                </Text>}
                <View style={styles.disclaimerContain}>
                  <Text style={[styles.disclaimerText,{fontSize:this.state.sweepstakeData.fontsize}]}>
                    {this.state.sweepdisclaimer}
                  </Text>
                </View>
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
            </View>
            }
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default Login;
