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

import styles from './styles';

class Signup extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
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

  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <View style={styles.topBar}>
            <Text style={styles.topBarText}>Thank you for registering Universal Gaming Group</Text>
            <Icon ios='ios-close' android="md-close" style={styles.closeIcon} onPress={this.hideThankyouBox}/>
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
              <CheckBox checked={true} checkboxSize={40} />
              <Text style={styles.checkboxText}>Receiving emails, newsletters, and promotions</Text>
            </View>
            <View style={styles.listItem}>
              <CheckBox checked={true} CheckboxFontSize={40} />
              <Text style={styles.checkboxText}>Receiving SMS text message notifications</Text>
            </View>
          </Form>

          <View style={styles.buttonContainer}>
            {/* Login Button */}
            <Button
              style={styles.button}
              onPress={this.onSignupButtonPressed}
              hasText
              block
              large
              dark
              rounded
            >
              <Text style={styles.signupText}>SIGNUP</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Signup;
