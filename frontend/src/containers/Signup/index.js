import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  View, KeyboardAvoidingView
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

import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

import styles from './styles';

import { signupUserAPI, updateCheckTime } from '../../services/Authentication';
import { ScrollView } from 'react-native-gesture-handler';

class Signup extends Component {
  state = {
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    po_box_unit_number: '',
    suite: '',
    txtState: '',
    zipcode: '',
    emailaddress: '',
    checkEmail: true,
    checkSMS: true,
    cancelBox: false,
    error: {name: '', address: '', txtstate: '' }
  };

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

  cancelRegister = () => {
    this.props.navigation.navigate('Login', {exit: 1, tabletData: this.props.navigation.getParam('tabletData'), sweepstakeData: this.props.navigation.getParam('sweepstakeData'), tabletID: this.props.navigation.getParam('tabletID')});
  }

  userRegister = () => {
    const { navigation } = this.props;
    const phoneNo = navigation.getParam('phoneNumber');
    let error = this.state.error;

    if(this.state.firstname == '' && this.state.lastname != ''){
      error.name = 'You need to input first name';
    }else if(this.state.firstname != '' && this.state.lastname == ''){
      error.name = 'You need to input last name';
    }else if(this.state.firstname == '' && this.state.lastname == ''){
      error.name = 'You need to input first name and last name';
    }else{
      error.name = '';
    }

    if(this.state.city == '' && this.state.address != ''){
      error.address = 'You need to input city';
    }else if(this.state.city != '' && this.state.address == ''){
      error.address = 'You need to input address';
    }else if(this.state.city == '' && this.state.address == ''){
      error.address = 'You need to input city and address';
    }else{
      error.address = '';
    }

    if(this.state.zipcode == '' && this.state.txtState != ''){
      error.txtstate = 'You need to input zipcode';
    }else if(this.state.zipcode != '' && this.state.txtState == ''){
      error.txtstate = 'You need to input state';
    }else if(this.state.zipcode == '' && this.state.txtState == ''){
      error.txtstate = 'You need to input state and zipcode';
    }else{
      error.txtstate = '';
    }

    this.setState({error});
    console.log(this.state.checkEmail);
    if(this.state.error.name == '' && this.state.error.address == ''){
      signupUserAPI(this.state.firstname, this.state.lastname, this.state.address, this.state.city, this.state.txtState, this.state.zipcode, this.state.emailaddress, phoneNo,this.state.po_box_unit_number, this.state.suite, this.state.checkEmail, this.state.checkSMS).then(res => {
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const currenttime = new Date(utc - (3600000*5));
        const check_time = currenttime.getFullYear() + "-" + (currenttime.getMonth() + 1) + "-" + currenttime.getDate() + " " + currenttime.getHours() + ":" + currenttime.getMinutes() + ":" + currenttime.getSeconds();
        // updateCheckTime(res.id, navigation.getParam('tabletData').id, navigation.getParam('sweepstakeData').id, check_time).then((res2) => {
        this.props.navigation.navigate('Login', {exit: 2, tabletData: navigation.getParam('tabletData'), sweepstakeData: navigation.getParam('sweepstakeData'), tabletID: this.props.navigation.getParam('tabletID')});
        // })
      })
    }
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <Image source={require('../../assets/images/SummerShoppingBg.png')} style={styles.backgroundImage} />
        <Content contentContainerStyle={styles.content}>
          {this.state.registeredVisible && <View style={styles.thankyouBox}>
            <Icon ios='ios-close' android="md-close" style={styles.closeIcon} onPress={this.hideRegisteredBox}/>
            <Text style={styles.thankyouText}>You are successfully registered</Text>
          </View>
          }
          {this.state.cancelBox && <View style={styles.cancelBox}>
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
          }
          <View style={styles.topBar}>
            <Text style={styles.topBarText}>Thank you for registering Universal Gaming Group</Text>
            <Icon ios='ios-close' android="md-close" style={styles.closeIcon} onPress={this.showCancelBox}/>
          </View>
          {/* Form */}
          <Form style={styles.form}>
            <View style={[styles.listItem, styles.formItem]}>
              <Input
                style={[styles.inputbox, styles.firstinputbox]}
                placeholder="First Name *"
                placeholderTextColor="#919191"
                autoCapitalize="none"
                onChangeText={firstname => this.setState({ firstname })}
              />
              <Input
                style={styles.inputbox}
                placeholder="Last Name *"
                placeholderTextColor="#919191"
                autoCapitalize="none"
                onChangeText={lastname => this.setState({ lastname })}
              />
            </View>
            {this.state.error.name != '' && <Text style={styles.errorMsg}>{this.state.error.name}</Text>}
            <View style={[styles.listItem, styles.formItem]}>
              <Input
                style={[styles.inputbox, styles.firstinputbox]}
                placeholder="Address *"
                placeholderTextColor="#919191"
                onChangeText={address => this.setState({ address })}
              />
              <Input
                style={styles.inputbox}
                placeholder="City *"
                placeholderTextColor="#919191"
                onChangeText={city => this.setState({ city })}
              />
            </View>
            {this.state.error.address != '' && <Text style={styles.errorMsg}>{this.state.error.address}</Text>}
            <View style={[styles.listItem, styles.formItem]}>
              <Input
                style={[styles.inputbox, styles.firstinputbox]}
                placeholder="State *"
                placeholderTextColor="#919191"
                onChangeText={txtState => this.setState({ txtState })}
              />
              <Input
                style={styles.inputbox}
                placeholder="Zip Code *"
                placeholderTextColor="#919191"
                onChangeText={zipcode => this.setState({ zipcode })}
              />
            </View>
            {this.state.error.txtstate != '' && <Text style={styles.errorMsg}>{this.state.error.txtstate}</Text>}
            <View style={[styles.listItem, styles.formItem]}>
              <Input
                style={[styles.inputbox, styles.firstinputbox]}
                placeholder="PO Box(Unit Number)"
                placeholderTextColor="#919191"
                onChangeText={po_box_unit_number => this.setState({ po_box_unit_number })}
              />
              <Input
                style={styles.inputbox}
                placeholder="Suite"
                placeholderTextColor="#919191"
                onChangeText={suite => this.setState({ suite })}
              />
            </View>
            <View style={styles.listItem}>
              <Input
                style={styles.inputbox}
                placeholder="Email Address"
                placeholderTextColor="#919191"
                onChangeText={emailaddress => this.setState({ emailaddress })}
              />
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
        </Content>
      </KeyboardAvoidingView>
      </StyleProvider>
    );
  }
}

export default Signup;
