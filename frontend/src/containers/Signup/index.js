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
  Icon,
  CheckBox,
  StyleProvider
} from 'native-base';

import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

import styles from './styles';

import { signupUserAPI } from '../../services/Authentication';

class Signup extends Component {
  state = {
    firstname: '',
    lastname: '',
    address: '',
    emailaddress: '',
    checkEmail: true,
    checkSMS: true,
    cancelBox: false,
    error: {name: '', address: ''}
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
    this.props.navigation.navigate('Login');
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

    if(this.state.address == ''){
      error.address = 'You need to input address';
    }else{
      error.address = '';
    }
    
    this.setState({error});
    if(this.state.error.name == '' && this.state.error.address == ''){
      signupUserAPI(this.state.firstname, this.state.lastname, this.state.address, this.state.emailaddress, phoneNo).then(res => {
        this.props.navigation.navigate('Login');
      })
    }
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={styles.container}>
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
              <Item
                style={styles.item}
                last
              >
                <Input
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="#afb0d1"
                  autoCapitalize="none"
                  onChangeText={firstname => this.setState({ firstname })}
                />
                <Input
                  style={styles.input}
                  placeholder="Last Name"
                  placeholderTextColor="#afb0d1"
                  autoCapitalize="none"
                  onChangeText={lastname => this.setState({ lastname })}
                />
              </Item>
              {this.state.error.name != '' && <Text style={styles.errorMsg}>{this.state.error.name}</Text>}
              <Item
                style={styles.item}
                last
              >
                <Input
                  style={styles.input}
                  placeholder="Address"
                  placeholderTextColor="#afb0d1"
                  onChangeText={address => this.setState({ address })}
                />
              </Item>
              {this.state.error.address != '' && <Text style={styles.errorMsg}>{this.state.error.address}</Text>}
              <Item
                style={styles.item}
                last
              >
                <Input
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="#afb0d1"
                  onChangeText={emailaddress => this.setState({ emailaddress })}
                />
              </Item>
              <View style={styles.listItem}>
                <CheckBox checked={this.state.checkEmail} onPress={this.setCheckEmail} />
                <Text style={styles.checkboxText}>Receiving emails, newsletters, and promotions</Text>
              </View>
              <View style={styles.listItem}>
                <CheckBox checked={this.state.checkSMS} onPress={this.setCheckSMS} />
                <Text style={styles.checkboxText}>Receiving SMS text message notifications</Text>
              </View>
            </Form>

            <View style={styles.buttonContainer}>
              {/* Login Button */}
              <Button
                style={styles.button}
                onPress={this.userRegister}
                hasText
                block
                large
                dark
                rounded
              >
                <Text style={styles.signupText}>SUBMIT</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

export default Signup;
