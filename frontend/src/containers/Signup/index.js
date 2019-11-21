import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  View, KeyboardAvoidingView, StyleSheet
} from 'react-native';
import {
  Button,
  Container,
  Content,
  Form,
  Item,
  Input,
  Text,
  Icon,
  CheckBox,
  StyleProvider
} from 'native-base';

import Modal from 'react-native-modal'
import { loginAPI } from '../../services/Authentication';

import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

import styles from './styles';

import { AntDesign, FontAwesome } from '@expo/vector-icons'

import { signupUserAPI, updateCheckTime } from '../../services/Authentication';
import Utils from '../../utils'
import RNPickerSelect from 'react-native-picker-select';

class Signup extends Component {
  state = {
    sweepstakeData: null,
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    po_box_unit_number: '',
    suite: '',
    txtState: 'IL',
    zipcode: '',
    emailaddress: '',
    admin_password: '',
    checkEmail: true,
    checkSMS: true,
    cancelBox: false,
    logoutBox: false,
    admin_user: null,
    logout_error: null,
    error: {firstname: '', lastname: '', address: '',  city: '',  txtstate: '',  zipcode: '',po_box_unit_number: '' }
  };

  componentDidMount(){
    const admin_user = this.props.navigation.getParam('user');
    const sweepData = this.props.navigation.getParam('sweepstakeData');
    this.setState({sweepstakeData: sweepData, admin_user: admin_user[0] })
  }

  componentWillReceiveProps(props){
    console.log(props.navigation.getParam('user'));
  }

  // navigate to login screen after a successful signup
  onSignupButtonPressed = () => {
    // TODO: Login
    this.props.navigation.navigate('Login');
  }

  // navigate to login screen
  onLoginButtonPressed = () => {
    this.props.navigation.navigate('Login');
  }

  setCheckEmail = () => {
    this.setState({checkEmail: !this.state.checkEmail})
  }

  setCheckSMS = () => {
    this.setState({checkSMS: !this.state.checkSMS})
  }

  showCancelBox = () => {
    this.setState({cancelBox: true})
  }

  closeCancelBox = () => {
    this.setState({cancelBox: false})
  }

  showLogoutBox = () => {
    this.setState({logoutBox: true})
  }

  hideLogoutBox = () => {
    this.setState({logoutBox: false})
  }

  logout = () => {
    this.props.navigation.navigate('Login');    
  }

  cancelRegister = () => {
    this.props.navigation.navigate('SweepStake', {tabletData: this.props.navigation.getParam('tabletData'), sweepstakeData: this.props.navigation.getParam('sweepstakeData'), tabletID: this.props.navigation.getParam('tabletID')});
  }

  userRegister = () => {
    const { navigation } = this.props;
    const phoneNo = navigation.getParam('phoneNumber');
    let error = this.state.error;

    if(this.state.firstname == ''){
      error.firstname = 'You need to input first name';
    }else{
      error.firstname = '';
    }

    if(this.state.lastname == ''){
      error.lastname = 'You need to input last name';
    }else{
      error.lastname = '';
    }

    if(this.state.address == ''){
      error.address = 'You need to input address';
    }else{
      error.address = '';
    }

    if(this.state.city == ''){
      error.city = 'You need to input city';
    }else{
      error.city = '';
    }

    if(this.state.txtState == ''){
      error.txtState = 'You need to input state';
    }else{
      error.txtState = '';
    }

    if(this.state.zipcode == ''){
      error.zipcode = 'You need to input zipcode';
    }else if(this.state.zipcode.length < 5){
      error.zipcode = "zipcode should be at least 5 letters"
    }else{
      error.zipcode = '';
    }

    this.setState({error});
    console.log(this.state.checkEmail);
    if(this.state.error.name == '' && this.state.error.address == ''){
      signupUserAPI(this.state.firstname, this.state.lastname, this.state.address, this.state.city, this.state.txtState, this.state.zipcode, this.state.emailaddress, phoneNo,this.state.po_box_unit_number, this.state.checkEmail, this.state.checkSMS).then(res => {
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const currenttime = new Date(utc - (3600000*5));
        const check_time = currenttime.getFullYear() + "-" + (currenttime.getMonth() + 1) + "-" + currenttime.getDate() + " " + currenttime.getHours() + ":" + currenttime.getMinutes() + ":" + currenttime.getSeconds();
        // updateCheckTime(res.id, navigation.getParam('tabletData').id, navigation.getParam('sweepstakeData').id, check_time).then((res2) => {
        this.props.navigation.navigate('SweepStake', {exit: 2, tabletData: navigation.getParam('tabletData'), sweepstakeData: navigation.getParam('sweepstakeData'), tabletID: this.props.navigation.getParam('tabletID')});
        // })
      }).catch(err=> {console.log('errr', err)});
    }
  }

  submitTabletLogout = () => {
    console.log(this.state.admin_user.username, this.state.admin_password);
    loginAPI(this.state.admin_user.username, this.state.admin_password).then(res=>{
      console.log(res);
      if(res.user){
        this.props.navigation.navigate('Login');
      }
      if(res.error){
        this.setState({logout_error: 'You need to input correct password!'});
      }
    }).catch(err => {
      console.log(err);
    })
  }

  render(){
    const usStates = [
      {
          "label": "Alabama",
          "value": "AL"
      },
      {
          "label": "Alaska",
          "value": "AK"
      },
      {
          "label": "American Samoa",
          "value": "AS"
      },
      {
          "label": "Arizona",
          "value": "AZ"
      },
      {
          "label": "Arkansas",
          "value": "AR"
      },
      {
          "label": "California",
          "value": "CA"
      },
      {
          "label": "Colorado",
          "value": "CO"
      },
      {
          "label": "Connecticut",
          "value": "CT"
      },
      {
          "label": "Delaware",
          "value": "DE"
      },
      {
          "label": "District Of Columbia",
          "value": "DC"
      },
      {
          "label": "Federated States Of Micronesia",
          "value": "FM"
      },
      {
          "label": "Florida",
          "value": "FL"
      },
      {
          "label": "Georgia",
          "value": "GA"
      },
      {
          "label": "Guam",
          "value": "GU"
      },
      {
          "label": "Hawaii",
          "value": "HI"
      },
      {
          "label": "Idaho",
          "value": "ID"
      },
      {
          "label": "Illinois",
          "value": "IL"
      },
      {
          "label": "Indiana",
          "value": "IN"
      },
      {
          "label": "Iowa",
          "value": "IA"
      },
      {
          "label": "Kansas",
          "value": "KS"
      },
      {
          "label": "Kentucky",
          "value": "KY"
      },
      {
          "label": "Louisiana",
          "value": "LA"
      },
      {
          "label": "Maine",
          "value": "ME"
      },
      {
          "label": "Marshall Islands",
          "value": "MH"
      },
      {
          "label": "Maryland",
          "value": "MD"
      },
      {
          "label": "Massachusetts",
          "value": "MA"
      },
      {
          "label": "Michigan",
          "value": "MI"
      },
      {
          "label": "Minnesota",
          "value": "MN"
      },
      {
          "label": "Mississippi",
          "value": "MS"
      },
      {
          "label": "Missouri",
          "value": "MO"
      },
      {
          "label": "Montana",
          "value": "MT"
      },
      {
          "label": "Nebraska",
          "value": "NE"
      },
      {
          "label": "Nevada",
          "value": "NV"
      },
      {
          "label": "New Hampshire",
          "value": "NH"
      },
      {
          "label": "New Jersey",
          "value": "NJ"
      },
      {
          "label": "New Mexico",
          "value": "NM"
      },
      {
          "label": "New York",
          "value": "NY"
      },
      {
          "label": "North Carolina",
          "value": "NC"
      },
      {
          "label": "North Dakota",
          "value": "ND"
      },
      {
          "label": "Northern Mariana Islands",
          "value": "MP"
      },
      {
          "label": "Ohio",
          "value": "OH"
      },
      {
          "label": "Oklahoma",
          "value": "OK"
      },
      {
          "label": "Oregon",
          "value": "OR"
      },
      {
          "label": "Palau",
          "value": "PW"
      },
      {
          "label": "Pennsylvania",
          "value": "PA"
      },
      {
          "label": "Puerto Rico",
          "value": "PR"
      },
      {
          "label": "Rhode Island",
          "value": "RI"
      },
      {
          "label": "South Carolina",
          "value": "SC"
      },
      {
          "label": "South Dakota",
          "value": "SD"
      },
      {
          "label": "Tennessee",
          "value": "TN"
      },
      {
          "label": "Texas",
          "value": "TX"
      },
      {
          "label": "Utah",
          "value": "UT"
      },
      {
          "label": "Vermont",
          "value": "VT"
      },
      {
          "label": "Virgin Islands",
          "value": "VI"
      },
      {
          "label": "Virginia",
          "value": "VA"
      },
      {
          "label": "Washington",
          "value": "WA"
      },
      {
          "label": "West Virginia",
          "value": "WV"
      },
      {
          "label": "Wisconsin",
          "value": "WI"
      },
      {
          "label": "Wyoming",
          "value": "WY"
      }
    ];
    const pickerSelectStyles = StyleSheet.create({
      inputIOS: {
        fontSize: 20,
        paddingVertical: 12,
        backgroundColor: "#e6e6e6",
        borderRadius: 4,
        width: '100%',
        color: '#3d3d3d',
      },
      inputAndroid: {
        width: '100%',
        paddingLeft: 10,
        color: '#3d3d3d',
      },
    });
    const tabletData = this.props.navigation.getParam('tabletData');
    return (
      <StyleProvider style={getTheme(material)}>
        <View style={styles.container}>
        { this.state.sweepstakeData != null && 
        <Image source={{uri: Utils.serverUrl+'static/img/uploads/'+this.state.sweepstakeData.background}} style={styles.backgroundImage} />
        }
        <View style={styles.topbar}>
          <Text style={styles.topbar_text}>Tablet ID: {tabletData.name}</Text>
          <AntDesign name="logout" size={32} color="#3d3d3d" onPress={this.showLogoutBox} />
        </View>
        <View style={styles.content}>
          {this.state.registeredVisible && <View style={styles.thankyouBox}>
            <Icon ios='ios-close' android="md-close" style={styles.closeIcon} onPress={this.hideRegisteredBox}/>
            <Text style={styles.thankyouText}>You are successfully registered</Text>
          </View>
          }
          <Modal isVisible={this.state.cancelBox} onBackdropPress={this.closeCancelBox}>
            <View  style={styles.cancelBox}>
            <Text style={styles.thankyouText}>Are you sure you want to cancel?</Text>
              <View style={styles.buttonsContainer}>
                <Button
                    style={[styles.button, styles.cancelBut]}
                    onPress={this.cancelRegister}
                  >
                  <Text style={styles.textCancel}>Yes</Text>
                </Button>
                <Button
                    style={[styles.button, styles.cancelBut]}
                    onPress={this.closeCancelBox}
                    block
                  >
                  <Text style={styles.textCancel}>No</Text>
                </Button>
              </View>
            </View>
          </Modal>
          <Modal isVisible={this.state.logoutBox} onBackdropPress={this.hideLogoutBox}>
            <View style={styles.logoutModalContainer}>
              <TouchableOpacity style={styles.logoutContainer} onPress={this.hideLogoutBox}>
                <Icon ios='ios-close' android="md-close" style={styles.logoutButton} />
              </TouchableOpacity>
              <View style={styles.inputfield_container}>
                <View style={styles.inputicon_container}>
                  <FontAwesome.Button name="lock" backgroundColor="#989898" color="#fff" size={35} borderRadius={50} iconStyle={{marginRight: 0, paddingHorizontal: 5}}></FontAwesome.Button>
                </View>
                <Input
                  style={styles.inputTabletID}
                  placeholder="Password"
                  placeholderTextColor="#989898"
                  autoCapitalize="none"
                  value={this.state.admin_password}
                  onChangeText={admin_password => this.setState({ admin_password })}
                  secureTextEntry
                />
              </View>
              {this.state.logout_error !== null && <Text style={styles.logout_error}>{this.state.logout_error}</Text>}
              <Button
                style={styles.button}
                onPress={this.submitTabletLogout}
              >
                <Text style={styles.loginText}>LOGOUT</Text>
              </Button>
            </View>
          </Modal>
          <View style={styles.topBar}>
            <Text style={styles.topBarText}>Thank You for Registering!</Text>
            <AntDesign name="closecircle" size={35} color="#fff" onPress={this.showCancelBox} />
          </View>
          {/* Form */}
          <Form style={styles.form}>
            <View style={[styles.listItem, styles.formItem]}>
              <Input
                style={styles.inputbox}
                placeholder="First Name *"
                placeholderTextColor="#3d3d3d"
                autoCapitalize="none"
                onChangeText={firstname => this.setState({ firstname })}
              />
              <Input
                style={styles.inputbox}
                placeholder="Last Name *"
                placeholderTextColor="#3d3d3d"
                autoCapitalize="none"
                onChangeText={lastname => this.setState({ lastname })}
              />
            </View>
            <View style={[styles.listItem, styles.formItem]}>
              <Text style={[styles.errorMsg, this.state.error.firstname == "" && styles.noError]}>{this.state.error.firstname}</Text>
              <Text style={[styles.errorMsg, this.state.error.lastname == "" && styles.noError]}>{this.state.error.lastname}</Text>
            </View>
            <View style={[styles.listItem, styles.formItem]}>
              <Input
                style={styles.inputbox}
                placeholder="Address *"
                placeholderTextColor="#3d3d3d"
                onChangeText={address => this.setState({ address })}
              />
              <Input
                style={styles.inputbox}
                placeholder="Suite/PO Box *"
                placeholderTextColor="#3d3d3d"
                onChangeText={po_box_unit_number => this.setState({ po_box_unit_number })}
              />
            </View>
            <View style={[styles.listItem, styles.formItem]}>
              <Text style={[styles.errorMsg, this.state.error.address == "" && styles.noError]}>{this.state.error.address}</Text>
            </View>
            <View style={[styles.listItem, styles.formItem]}>
            <Input
                style={styles.inputbox}
                placeholder="City *"
                placeholderTextColor="#3d3d3d"
                onChangeText={city => this.setState({ city })}
              />
              <View style={styles.inputbox}>
                <RNPickerSelect
                  placeholder={{
                    label: 'State *',
                    value: null,
                  }}
                  items={usStates}
                  onValueChange={value => {
                    this.setState({
                      txtState: value,
                    });
                  }}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                      top: 20,
                      right: 10,
                    },
                    placeholder: {
                      color: '#3d3d3d',
                      fontSize: 25,
                    },
                  }}
                  value={this.state.txtState}
                  Icon={() => {
                    return (
                      <View
                        style={{
                          backgroundColor: 'transparent',
                          borderTopWidth: 10,
                          borderTopColor: 'gray',
                          borderRightWidth: 10,
                          borderRightColor: 'transparent',
                          borderLeftWidth: 10,
                          borderLeftColor: 'transparent',
                          width: 0,
                          height: 0,
                        }}
                      />
                    );
                  }}
                />
              </View>
              {/* <Input
                style={styles.inputbox}
                placeholder="State *"
                placeholderTextColor="#3d3d3d"
                onChangeText={txtState => this.setState({ txtState })}
              /> */}
            </View>
            <View style={[styles.listItem, styles.formItem]}>
              <Text style={[styles.errorMsg, this.state.error.city == "" && styles.noError]}>{this.state.error.city}</Text>
              <Text style={[styles.errorMsg, this.state.error.txtstate == "" && styles.noError]}>{this.state.error.txtstate}</Text>
            </View>
            <View style={[styles.listItem, styles.formItem]}>
              <Input
                style={styles.inputbox}
                maxLength={5}
                placeholder="Zip Code *"
                keyboardType="numeric"
                placeholderTextColor="#3d3d3d"
                onChangeText={zipcode => this.setState({ zipcode })}
              />
              <Input
                style={styles.inputbox}
                placeholder="Email"
                placeholderTextColor="#3d3d3d"
                onChangeText={emailaddress => this.setState({ emailaddress })}
              />
            </View>
            <View style={[styles.listItem, styles.formItem]}>
             <Text style={[styles.errorMsg, this.state.error.zipcode == "" && styles.noError]}>{this.state.error.zipcode}</Text>
            </View>
            <View style={styles.checkContainer}>
              <View style={styles.listItem}>
                <CheckBox checked={this.state.checkEmail} onPress={this.setCheckEmail} />
                <Text style={styles.checkboxText}>Receiving emails, newsletters, and promotions</Text>
              </View>
              <View style={styles.listItem}>
                <CheckBox checked={this.state.checkSMS} onPress={this.setCheckSMS} />
                <Text style={styles.checkboxText}>Receiving SMS text message notifications</Text>
              </View>
            </View>
          </Form>

          <View style={styles.buttonContainer}>
            {/* Login Button */}
            <Button
              style={styles.button}
              onPress={this.userRegister}
            >
            <Text style={styles.loginText}>SUBMIT</Text></Button>
          </View>
        </View>
      </View>
      </StyleProvider>
    );
  }
}

export default Signup;
