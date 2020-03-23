import React, { Component } from 'reactn';
import {
  Image,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Linking,
  Alert,
  AsyncStorage,
  ActivityIndicator
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
import { TextInputMask } from 'react-native-masked-text';

import styles from './styles';
import Utils from '../../utils';
import { setCurrentSessionAsync } from '../../utils/reactn-util';
import { defaultEmptyCurrentUser } from '../../reactn-state/index';
import {
  loginAPI,
  getUserAPI,
  updateCheckTime,
  updateTabletID,
  getTabletAPI,
  getSweepstakeAPI,
  getSettingsAPI,
  getCheckInTime,
  updateTabletKey,
  updateTabletStatus,
  getTabletfromKey
} from '../../services/Authentication';

import { AntDesign, FontAwesome } from '@expo/vector-icons';

import Modal from 'react-native-modal';

import moment from 'moment';

class SweepStake extends Component {
  state = {
    loading: false,
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
    phoneNumber: '',
    phoneNumberFormat: '',
    tabletID: '',
    tablet_Pass: '',
    tablet_password: '',
    tablet_confirmpassword: '',
    tabletIDLogin: '',
    tabletpasswordlogin: '',
    userData: null,
    tabletData: null,
    passwordError: '',
    tablet_PassError: '',
    tabletSubmitError: '',
    tabletLoginError: '',
    sweepstakeData: null,
    sweepbackground: require('../../assets/images/SummerShoppingBg.png'),
    sweeplogo: require('../../assets/images/Summer_Shopping.png'),
    sweepdisclaimer: 'Disclaimer Text',
    sweepadded: false,
    sweepcountdown: false,
    begin_date: '',
    admin_user: null,
    admin_password: '',
    logout_error: null,
    phoneNumberError: null,
    tabletDataFirstSweepIsActive: null
  };

  constructor(props) {
    super(props);
    // console.log(
    //   'props!!!',
    //   props.navigation.getParam('tabletDataFirstSweepIsActive'),
    //   props.navigation.getParam('tabletDataFirstSweep')
    // );
    this.phoneInputRef = React.createRef();

    this.state.tabletDataFirstSweepIsActive = props.navigation.getParam(
      'tabletDataFirstSweepIsActive'
    );
    this.state.tabletDataFirstSweep = props.navigation.getParam(
      'tabletDataFirstSweep'
    );
    this.state.tabletData = props.navigation.getParam('tabletData');
  }

  componentWillReceiveProps(props) {
    if (props.navigation.getParam('exit') == 1) {
      this.setState({
        showPasswordBox: false,
        showMenu: false,
        showTabletForm: false,
        thankyouBoxVisible: false,
        phoneNumberFormat: '',
        phoneNumber: '',
        tabletID: props.navigation.getParam('tabletData').name,
        userData: null,
        tabletData: props.navigation.getParam('tabletData'),
        sweepstakeData: props.navigation.getParam('sweepstakeData')
      });
    } else if (props.navigation.getParam('exit') == 2) {
      this.setState({
        showPasswordBox: false,
        showMenu: false,
        showTabletForm: false,
        thankyouBoxVisible: false,
        phoneNumberFormat: '',
        phoneNumber: '',
        tabletID: props.navigation.getParam('tabletID'),
        userData: null,
        tabletData: props.navigation.getParam('tabletData'),
        sweepstakeData: props.navigation.getParam('sweepstakeData')
      });
      this.setState({ signupBoxVisible: true });
    }
    if (props.navigation.getParam('thankyou') == true) {
      this.setState({ thankyouBoxVisible: true });
      this.setState({
        phoneNumberFormat: '',
        phoneNumber: '',
        userData: props.navigation.getParam('tabletData'),
        userData: props.navigation.getParam('sweepuser'),
        tabletData: props.navigation.getParam('tabletData'),
        sweepstakeData: props.navigation.getParam('sweepstakeData')
      });
    }
    if (props.navigation.getParam('comeback') == true) {
      console.log('comeback', props.navigation.getParam('comeback'));
      this.setState({ comebackBoxVisible: true });
      this.setState({
        phoneNumberFormat: '',
        phoneNumber: '',
        userData: props.navigation.getParam('tabletData'),
        userData: props.navigation.getParam('sweepuser'),
        tabletData: props.navigation.getParam('tabletData'),
        sweepstakeData: props.navigation.getParam('sweepstakeData')
      });
    }
  }

  componentDidMount() {
    const admin_user = this.props.navigation.getParam('user');
    console.log('admin_useradmin_user', admin_user);
    this.setState({ admin_user: admin_user[0] });
    const tabletData = this.props.navigation.getParam('tabletData');
    if (this.props.navigation.getParam('exit') == 2) {
      this.setState({ signupBoxVisible: true });
    }
    if (this.props.navigation.getParam('thankyou') == true) {
      this.setState({ thankyouBoxVisible: true });
      this.setState({
        phoneNumberFormat: '',
        phoneNumber: '',
        userData: this.props.navigation.getParam('tabletData'),
        userData: this.props.navigation.getParam('sweepuser'),
        tabletData: this.props.navigation.getParam('tabletData'),
        sweepstakeData: this.props.navigation.getParam('sweepstakeData')
      });
    }
    if (this.props.navigation.getParam('comeback') == true) {
      this.setState({ comebackBoxVisible: true });
      this.setState({
        phoneNumberFormat: '',
        phoneNumber: '',
        userData: this.props.navigation.getParam('tabletData'),
        userData: this.props.navigation.getParam('sweepuser'),
        tabletData: this.props.navigation.getParam('tabletData'),
        sweepstakeData: this.props.navigation.getParam('sweepstakeData')
      });
    }
    console.log('tabletData', tabletData);
    if (tabletData != null) {
      this.setState({ tabletData });
      this.setState({ tabletID: tabletData.name });
      this.setState({ showTabletLoginForm: false });
      this.setState({ tabletIDLogin: '' });
      this.setState({ tabletpasswordlogin: '' });
      this.setState({ tabletLoginError: '' });

      console.log(
        'this.state.tabletData.active_sweep != null &&',
        this.state?.tabletData?.active_sweep != null &&
          this.state?.tabletData?.active_sweep != '',
        this.state?.tabletData?.active_sweep ?? this.state.tabletData
      );

      updateTabletStatus(tabletData.id, 1).then(res1 => {
        console.log('res1res1', res1, this.state.tabletData);
        if (
          this.state.tabletData.active_sweep != null &&
          this.state.tabletData.active_sweep != ''
        ) {
          getSweepstakeAPI(this.state.tabletData.active_sweep)
            .then(res2 => {
              console.log('LOGINSTATUS ', res2);
              this.setState({ sweepstakeData: res2.sweepstake });
              this.setState({
                sweepbackground: {
                  uri: this.state.sweepstakeData.background
                }
              });
              // this.setState({
              //   sweeplogo: {
              //     uri: this.state.sweepstakeData.logo
              //   }
              // });
              this.setState({
                header_text: this.state.sweepstakeData.header_text,
                sweepdisclaimer: this.state.sweepstakeData.disclaimer
              });

              this.setState({ begin_date: res2.sweepstake.startdate });
              setTimeout(this.setSweepadded, 1000);
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          if (
            tabletData.sweep_ids != null &&
            this.state.tabletData.sweep_ids != ''
          ) {
            const sweep_array = this.state.tabletData.sweep_ids
              .substring(0, this.state.tabletData.sweep_ids.length - 1)
              .split(',');
            for (let i = 0; i < sweep_array.length; i++) {
              getSweepstakeAPI(sweep_array[i]).then(res3 => {
                if (i == 0) {
                  this.setState({ begin_date: res3.sweepstake.startdate });
                  this.setState({ sweepstakeData: res3.sweepstake });
                } else if (this.state.begin_date > res3.sweepstake.startdate) {
                  this.setState({ begin_date: res3.sweepstake.startdate });
                  this.setState({ sweepstakeData: res3.sweepstake });
                }
                if (i == sweep_array.length - 1) {
                  setTimeout(this.setSweepadded, 1000);
                }
              });
            }
          }
        }
      });
    }
  }

  sweepcountdown = () => {
    this.setState({ countdown: this.state.countdown - 1000 });
    if (this.state.countdown <= 0) {
      clearInterval(this.interval);
      this.setState({ sweepcountdown: false });
      this.setState({ sweepadded: true });
    }
  };

  // navigate to home after a successful login
  onLoginButtonPressed = () => {
    // TODO: Login

    this.props.navigation.navigate('Home');
  };

  // navigate to signup screen
  onSignupButtonPressed = () => {
    this.props.navigation.navigate('Signup', {
      user: this.props.navigation.getParam('user')
    });
  };

  // navigate to forgot password screen
  onForgotPasswordButtonPressed = () => {
    this.props.navigation.navigate('ForgotPassword');
  };

  hidePhoneNoAlert = () => {
    this.setState({ phoneNoAlert: false });
  };

  showThankyouBox = () => {
    if (this.state.phoneNumber.length <= 10) {
      this.setState({ phoneNumberError: 'Enter 10 DIGITS TO CHECK IN' });
    } else {
      if (this.state.loading) {
        return;
      }
      this.setState(
        {
          loading: true
        },
        () => {
          getUserAPI(this.state.phoneNumber)
            .then(res => {
              console.log('oeah??', res);
              this.setState({ userData: res.user, loading: false });
              if (
                this.state.sweepstakeData.survey1_check == 'no' &&
                this.state.sweepstakeData.survey2_check == 'no'
              ) {
                const currenttime = new Date();
                const { navigate } = this.props.navigation;
                getCheckInTime(
                  res.user.id,
                  this.state.tabletData.id,
                  this.state.sweepstakeData.id
                )
                  .then(res1 => {
                    // const checkedtime = new Date(res1.checkin.check_time.replace(" ", "T"));
                    let checkedtime = '';
                    if (res1.checkin.check_time != null) {
                      const checkedtime_array = res1.checkin.check_time.split(
                        'T'
                      );
                      checkedtime = checkedtime_array[0].split('-');
                    }
                    if (
                      res1.checkin.check_time == '' ||
                      res1.checkin.check_time == null ||
                      currenttime.getFullYear() > parseInt(checkedtime[0]) ||
                      currenttime.getMonth() > parseInt(checkedtime[1]) - 1 ||
                      currenttime.getDate() > parseInt(checkedtime[2])
                    ) {
                      const check_time =
                        currenttime.getFullYear() +
                        '-' +
                        (currenttime.getMonth() + 1) +
                        '-' +
                        currenttime.getDate() +
                        ' ' +
                        currenttime.getHours() +
                        ':' +
                        currenttime.getMinutes() +
                        ':' +
                        currenttime.getSeconds();
                      updateCheckTime(
                        this.state.userData.id,
                        this.state.tabletData.id,
                        this.state.sweepstakeData.id,
                        check_time
                      ).then(res2 => {
                        console.log('Res2', res2);
                      });
                      this.setState({
                        thankyouBoxVisible: true
                      });
                      Utils.phoneInputRefInvokeMethod(
                        this.phoneInputRef,
                        'clear'
                      );
                    } else {
                      this.setState({
                        comebackBoxVisible: true
                      });
                      Utils.phoneInputRefInvokeMethod(
                        this.phoneInputRef,
                        'clear'
                      );
                    }
                  })
                  .catch(e => {
                    Utils.phoneInputRefInvokeMethod(
                      this.phoneInputRef,
                      'clear'
                    );
                  });
              } else {
                const { sweepstakeData } = this.state;
                getCheckInTime(
                  res.user.id,
                  this.state.tabletData.id,
                  this.state.sweepstakeData.id
                ).then(res1 => {
                  let checkedtime = '';
                  let survey_enter_time = '';
                  if (res1.checkin.survey_enter_time != null) {
                    survey_enter_time = res1.checkin.survey_enter_time;
                  }
                  if (res1.checkin.check_time != null) {
                    const checkedtime_array = res1.checkin.check_time.split(
                      'T'
                    );
                    checkedtime = checkedtime_array[0].split('-');
                  }
                  const hour_diff = moment(survey_enter_time).diff(
                    moment(),
                    'hours'
                  );
                  const day_diff = moment(survey_enter_time).diff(
                    moment(),
                    'days'
                  );
                  let survey_checked = false;
                  if (survey_enter_time != '') {
                    if (sweepstakeData.customer_checkin_frequency == '0') {
                      if (day_diff < 1) survey_checked = true;
                    } else if (
                      sweepstakeData.customer_checkin_frequency == '1'
                    ) {
                      if (hour_diff < 1) survey_checked = true;
                    }
                    console.log(
                      'Survey Checkin',
                      sweepstakeData.customer_checkin_frequency,
                      ' ',
                      hour_diff,
                      ' ',
                      day_diff
                    );
                    if (survey_checked == false) {
                      this.props.navigation.navigate('Survey', {
                        sweepuser: res.user,
                        user: this.props.navigation.getParam('user'),
                        tabletData: this.state.tabletData,
                        sweepstakeData: this.state.sweepstakeData
                      });
                    } else {
                      const currenttime = new Date();
                      if (
                        res1.checkin.check_time == '' ||
                        res1.checkin.check_time == null ||
                        currenttime.getFullYear() > parseInt(checkedtime[0]) ||
                        currenttime.getMonth() > parseInt(checkedtime[1]) - 1 ||
                        currenttime.getDate() > parseInt(checkedtime[2])
                      ) {
                        const check_time =
                          currenttime.getFullYear() +
                          '-' +
                          (currenttime.getMonth() + 1) +
                          '-' +
                          currenttime.getDate() +
                          ' ' +
                          currenttime.getHours() +
                          ':' +
                          currenttime.getMinutes() +
                          ':' +
                          currenttime.getSeconds();
                        updateCheckTime(
                          this.state.userData.id,
                          this.state.tabletData.id,
                          this.state.sweepstakeData.id,
                          check_time
                        ).then(res2 => {
                          console.log('Res2', res2);
                        });
                        this.setState({
                          thankyouBoxVisible: true
                        });
                        Utils.phoneInputRefInvokeMethod(
                          this.phoneInputRef,
                          'clear'
                        );
                      } else {
                        this.setState({
                          comebackBoxVisible: true
                        });
                        Utils.phoneInputRefInvokeMethod(
                          this.phoneInputRef,
                          'clear'
                        );
                      }
                      this.setState({ phoneNumber: '', phoneNumberFormat: '' });
                    }
                  } else {
                    this.props.navigation.navigate('Survey', {
                      sweepuser: res.user,
                      user: this.props.navigation.getParam('user'),
                      tabletData: this.state.tabletData,
                      sweepstakeData: this.state.sweepstakeData
                    });
                  }
                });
              }
            })
            .catch(error => {
              this.setState({ loading: false });
              console.log('err, user unregistered', error);
              if (error) this.goToSignup();
            });
        }
      );
    }
  };

  hideThankyouBox = () => {
    this.setState({ thankyouBoxVisible: false });
  };

  hidecomeebackBox = () => {
    this.setState({ comebackBoxVisible: false });
  };

  showPasswordBox = () => {
    this.setState({ showPasswordBox: true });
  };

  hidePasswordBox = () => {
    this.setState({ showPasswordBox: false });
  };

  showTabletForm = () => {
    this.setState({ showTabletForm: true });
  };

  hideTabletForm = () => {
    this.setState({ showTabletForm: false });
  };

  showTabletLoginForm = () => {
    this.setState({ showTabletLoginForm: true });
  };

  hideTabletLoginForm = () => {
    this.setState({ showTabletLoginForm: false });
  };

  passwordSubmit = () => {
    getSettingsAPI().then(res => {
      if (
        (res.settings.length == 0 && this.state.menuPass == '') ||
        (res.settings.length > 0 &&
          this.state.menuPass == res.settings[0].device_code)
      ) {
        this.setState({ passwordError: '' });
        this.setState({ showPasswordBox: false });
        this.setState({ showMenu: true });
      } else {
        this.setState({ passwordError: 'Please input correct password' });
      }
    });
  };

  hideSignupBox = () => {
    this.setState({ signupBoxVisible: false });
  };

  exitFunction = () => {
    this.setState({ showTabletPasswordBox: true });
  };

  hideTabletPasswordBox = () => {
    this.setState({ showTabletPasswordBox: false });
  };

  passwordTabletSubmit = () => {
    getTabletAPI(this.state.tabletID, this.state.tablet_Pass)
      .then(res => {
        console.log(res);
        if (res.tablet.length > 0) {
          updateTabletStatus(this.state.tabletData.id, 0).then(res => {
            this.setState({
              showPasswordBox: false,
              showMenu: false,
              showTabletForm: false,
              showTabletPasswordBox: false,
              tablet_PassError: '',
              thankyouBoxVisible: false,
              phoneNumberFormat: '',
              phoneNumber: '',
              tabletID: '',
              tablet_password: '',
              tablet_confirmpassword: '',
              tabletData: null,
              sweepstakeData: null,
              userData: null,
              sweepbackground: require('../../assets/images/SummerShoppingBg.png'),
              sweeplogo: require('../../assets/images/Summer_Shopping.png'),
              sweepdisclaimer: 'Disclaimer Text'
            });
          });
        } else {
          this.setState({ tablet_PassError: 'Password is not correct' });
        }
      })
      .catch(error => {});
  };

  submitTabletID = () => {
    if (this.state.tabletID == '') {
      this.setState({ tabletSubmitError: 'Please input tablet ID' });
    } else if (
      this.state.tablet_password !== this.state.tablet_confirmpassword
    ) {
      this.setState({
        tabletSubmitError: 'Password and Confirm password do not match'
      });
    } else {
      updateTabletID(
        this.state.tabletData,
        this.state.tabletID,
        this.state.tablet_password,
        this.state.userData == null ? null : this.state.userData.id
      ).then(res1 => {
        console.log(res1);
        getTabletAPI(this.state.tabletID, this.state.tablet_password).then(
          res2 => {
            this.setState({ tabletData: res2.tablet[0] });
            this.setState({ tablet_password: '' });
            this.setState({ tablet_confirmpassword: '' });
            this.setState({ tabletSubmitError: '' });
            this.setState({ showTabletForm: false });
            this.setState({ showMenu: false });
            updateTabletStatus(this.state.tabletData.id, 1).then(res2 => {
              console.log(res2);
            });
          }
        );
      });
    }
  };

  setSweepadded = () => {
    const { sweepstakeData } = this.state;
    const hasEnded = moment().isAfter(sweepstakeData.enddate);
    const hasntStarted = moment(sweepstakeData.startdate).isAfter(moment());
    const bgImage =
      hasEnded &&
      sweepstakeData.background_image_after_sweepstake_check === 'yes'
        ? sweepstakeData.background_image_after_sweepstake
        : sweepstakeData.background;

    const sweeplogoImage =
      hasEnded || hasntStarted
        ? ''
        : {
            uri: this.state.sweepstakeData.logo
          };
    const sweepdisclaimer =
      hasEnded || hasntStarted ? '' : this.state.sweepstakeData.disclaimer;
    const header_text =
      hasEnded || hasntStarted ? '' : this.state.sweepstakeData.header_text;

    this.setState({
      header_text,
      sweepbackground: {
        uri: bgImage
      },
      sweeplogo: sweeplogoImage
    });

    console.log('Sweep Array', hasEnded, hasntStarted, this.state.sweeplogo);
    this.setState({ sweepdisclaimer });
    console.log('SweepData ', this.state.sweepbackground);
    const currentdate = new Date().getTime();
    const begindatetime = new Date(this.state.begin_date).getTime();
    console.log(
      currentdate,
      ' ',
      begindatetime,
      moment(),
      moment(this.state.begin_date)
    );
    if (currentdate < begindatetime) {
      this.setState({ sweepcountdown: true });
      this.setState({ countdown: begindatetime - currentdate });
      this.interval = setInterval(this.sweepcountdown, 1000);
      this.setState({ sweepadded: false });
    } else {
      this.setState({ sweepadded: !hasEnded });
    }
  };

  goToSignup = () => {
    /*console.log('when goin', {
      user: this.props.navigation.getParam('user'),
      phoneNumber: this.state.phoneNumber,
      tabletData: this.state.tabletData,
      sweepstakeData: this.state.sweepstakeData,
      tabletID: this.state.tabletID
    });*/

    this.props.navigation.navigate('Signup', {
      user: this.props.navigation.getParam('user'),
      phoneNumber: this.state.phoneNumber,
      tabletData: this.state.tabletData,
      sweepstakeData: this.state.sweepstakeData,
      tabletID: this.state.tabletID
    });
  };

  updateDeviceID = () => {
    if (this.state.tabletData == null) {
      this.setState({ showAssignTabletBox: true });
    } else {
      updateTabletKey(this.state.tabletData.id).then(res => {
        this.setState({ showTabletKeyUpdateBox: true });
        this.setState({ showMenu: false });
        setTimeout(() => {
          this.setState({ showTabletKeyUpdateBox: false });
        }, 3000);
      });
    }
  };

  hideAssignTabletBox = () => {
    this.setState({ showAssignTabletBox: false });
  };

  hideTabletKeyUpdateBox = () => {
    this.setState({ showTabletKeyUpdateBox: false });
  };

  showLogoutBox = () => {
    this.setState({ logoutBox: true });
  };

  hideLogoutBox = () => {
    this.setState({ logoutBox: false });
  };

  logout = () => {
    this.props.navigation.navigate('Login');
  };

  submitTabletLogout = () => {
    loginAPI(this.state.admin_user.username, this.state.admin_password)
      .then(res => {
        console.log(res);
        if (res.user) {
          this.props.navigation.navigate('Login');
        }
        if (res.error) {
          this.setState({
            logout_error: 'You need to input correct password!'
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.tabletDataFirstSweepIsActive === true) {
      if (
        this.state.tabletDataFirstSweep.background_image_after_sweepstake &&
        this.state.background_image_after_sweepstake_check === 'yes'
      ) {
        return (
          <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            enabled
          >
            <View style={styles.topbar}>
              <Text style={styles.topbar_text}>
                Tablet ID:{' '}
                {this.state.tabletData !== null && this.state.tabletData.name}
              </Text>
              <AntDesign
                name="logout"
                size={32}
                color="#3d3d3d"
                onPress={this.showLogoutBox}
              />
            </View>
            <Image
              source={{
                uri: this.state.tabletDataFirstSweep
                  .background_image_after_sweepstake
              }}
              style={styles.backgroundImage}
            />
          </KeyboardAvoidingView>
        );
      }
    }

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.topbar}>
          <Text style={styles.topbar_text}>
            Tablet ID:{' '}
            {this.state.tabletData !== null && this.state.tabletData.name}
          </Text>
          <AntDesign
            name="logout"
            size={32}
            color="#3d3d3d"
            onPress={this.showLogoutBox}
          />
        </View>
        <Modal
          isVisible={this.state.logoutBox}
          onBackdropPress={this.hideLogoutBox}
        >
          <View style={styles.logoutModalContainer}>
            <TouchableOpacity
              style={styles.logoutContainer}
              onPress={this.hideLogoutBox}
            >
              <Icon
                ios="ios-close"
                android="md-close"
                style={styles.logoutButton}
              />
            </TouchableOpacity>
            <View style={styles.inputfield_container}>
              <View style={styles.inputicon_container}>
                <FontAwesome.Button
                  name="lock"
                  backgroundColor="#989898"
                  color="#fff"
                  size={35}
                  borderRadius={50}
                  iconStyle={{ marginRight: 0, paddingHorizontal: 5 }}
                ></FontAwesome.Button>
              </View>
              <Input
                style={styles.inputTabletID}
                placeholder="Password"
                placeholderTextColor="#989898"
                autoCapitalize="none"
                value={this.state.admin_password}
                onChangeText={admin_password =>
                  this.setState({ admin_password })
                }
                secureTextEntry
              />
            </View>
            {this.state.logout_error !== null && (
              <Text style={styles.logout_error}>{this.state.logout_error}</Text>
            )}
            <Button
              style={styles.logoutbutton}
              onPress={this.submitTabletLogout}
            >
              <Text style={styles.logoutText}>LOGOUT</Text>
            </Button>
          </View>
        </Modal>
        <View style={{ flexGrow: 1 }}>
          <Image
            source={this.state.sweepbackground}
            style={styles.backgroundImage}
          />
          <Modal
            isVisible={this.state.signupBoxVisible}
            onBackdropPress={this.hideSignupBox}
          >
            <View style={styles.thankyouBox}>
              <TouchableOpacity
                style={styles.logoutContainer}
                onPress={this.hideSignupBox}
              >
                <Icon
                  ios="ios-close"
                  android="md-close"
                  style={styles.logoutButton}
                />
              </TouchableOpacity>
              <Text style={styles.thankyouText}>
                Thank you for signing up with Universal Gaming Group
              </Text>
            </View>
          </Modal>
          {this.state.showAssignTabletBox && (
            <View style={styles.thankyouBox}>
              <Icon
                ios="ios-close"
                android="md-close"
                style={styles.closeIcon}
                onPress={this.hideAssignTabletBox}
              />
              <Text style={styles.thankyouText}>
                Please assign tablet at first.
              </Text>
            </View>
          )}
          {this.state.showTabletKeyUpdateBox && (
            <View style={styles.thankyouBox}>
              <Icon
                ios="ios-close"
                android="md-close"
                style={styles.closeIcon}
                onPress={this.hideTabletKeyUpdateBox}
              />
              <Text style={styles.thankyouText}>
                Tablet key updated successfully.
              </Text>
            </View>
          )}
          <Modal
            isVisible={this.state.thankyouBoxVisible}
            onBackdropPress={this.hideThankyouBox}
          >
            <View style={styles.thankyouBox}>
              <TouchableOpacity
                style={styles.logoutContainer}
                onPress={this.hideThankyouBox}
              >
                <Icon
                  ios="ios-close"
                  android="md-close"
                  style={styles.logoutButton}
                />
              </TouchableOpacity>
              <Text style={styles.thankyouText}>
                Thank you{' '}
                {this.state.userData == null
                  ? ''
                  : this.state.userData.first_name}{' '}
                for checking into{' '}
                {this.state.tabletData == null
                  ? ''
                  : this.state.tabletData.name + '.'}
              </Text>
            </View>
          </Modal>
          <Modal
            isVisible={this.state.comebackBoxVisible}
            onBackdropPress={this.hidecomeebackBox}
          >
            <View style={styles.thankyouBox}>
              <TouchableOpacity
                style={styles.logoutContainer}
                onPress={this.hidecomeebackBox}
              >
                <Icon
                  ios="ios-close"
                  android="md-close"
                  style={styles.logoutButton}
                />
              </TouchableOpacity>
              <Text style={styles.thankyouText}>
                You have already checked into{' '}
                {this.state.tabletData == null
                  ? ''
                  : this.state.tabletData.name}{' '}
                Today. Come back and check in again tomorrow!
              </Text>
            </View>
          </Modal>
          {this.state.showPasswordBox && (
            <View style={styles.thankyouBox}>
              <Icon
                ios="ios-close"
                android="md-close"
                style={styles.closeIcon}
                onPress={this.hidePasswordBox}
              />
              <Input
                style={styles.inputMenuPass}
                placeholder="Enter Password"
                placeholderTextColor="#333"
                autoCapitalize="none"
                onChangeText={menuPass => this.setState({ menuPass })}
                onSubmitEditing={this.passwordSubmit}
                secureTextEntry
              />
              {this.state.passwordError != '' && (
                <Text style={styles.errorText}>{this.state.passwordError}</Text>
              )}
              <Button style={styles.button} onPress={this.passwordSubmit}>
                <Text style={styles.loginText}>SUBMIT</Text>
              </Button>
            </View>
          )}
          {this.state.showTabletPasswordBox && (
            <View style={styles.thankyouBox}>
              <Icon
                ios="ios-close"
                android="md-close"
                style={styles.closeIcon}
                onPress={this.hideTabletPasswordBox}
              />
              <Input
                style={styles.inputMenuPass}
                placeholder="Enter Password for the Tablet"
                placeholderTextColor="#333"
                autoCapitalize="none"
                onChangeText={tablet_Pass => this.setState({ tablet_Pass })}
                onSubmitEditing={this.passwordTabletSubmit}
                secureTextEntry
              />
              {this.state.tablet_PassError != '' && (
                <Text style={styles.errorText}>
                  {this.state.tablet_PassError}
                </Text>
              )}
              <Button style={styles.button} onPress={this.passwordTabletSubmit}>
                <Text style={styles.loginText}>SUBMIT</Text>
              </Button>
            </View>
          )}
          {this.state.showTabletForm && (
            <View style={styles.thankyouBox}>
              <Icon
                ios="ios-close"
                android="md-close"
                style={styles.closeIcon}
                onPress={this.hideTabletForm}
              />
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
                onChangeText={tablet_password =>
                  this.setState({ tablet_password })
                }
                secureTextEntry
              />
              <Input
                style={styles.inputTabletID}
                placeholder="Confirm Password"
                placeholderTextColor="#333"
                autoCapitalize="none"
                value={this.state.tablet_confirmpassword}
                onChangeText={tablet_confirmpassword =>
                  this.setState({ tablet_confirmpassword })
                }
                secureTextEntry
              />
              {this.state.tabletSubmitError != '' && (
                <Text style={styles.errorText}>
                  {this.state.tabletSubmitError}
                </Text>
              )}
              <Button style={styles.button} onPress={this.submitTabletID}>
                <Text style={styles.loginText}>Submit</Text>
              </Button>
            </View>
          )}
          {this.state.showTabletLoginForm && (
            <View style={styles.thankyouBox}>
              <Icon
                ios="ios-close"
                android="md-close"
                style={styles.closeIcon}
                onPress={this.hideTabletLoginForm}
              />
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
                onChangeText={tabletpasswordlogin =>
                  this.setState({ tabletpasswordlogin })
                }
                secureTextEntry
              />
              {this.state.tabletLoginError != '' && (
                <Text style={styles.errorText}>
                  {this.state.tabletLoginError}
                </Text>
              )}
              <Button style={styles.button} onPress={this.submitTabletLogin}>
                <Text style={styles.loginText}>Submit</Text>
              </Button>
            </View>
          )}
          <View style={styles.content}>
            {this.state.tabletData != null &&
              this.state.sweepstakeData != null && (
                <View style={styles.content}>
                  {/* Logo */}
                  <View style={styles.logoContainer}>
                    {this.state.sweeplogo ? (
                      <Image
                        style={styles.logo}
                        source={this.state.sweeplogo}
                      />
                    ) : (
                      <></>
                    )}
                  </View>

                  {/* Form */}
                  <Form style={styles.form}>
                    <Text
                      style={[
                        {
                          fontSize: this.state.sweepstakeData.header_font_size,
                          color:
                            '#' + this.state.sweepstakeData.header_hex_color,
                          fontWeight: 'bold',
                          marginBottom: 15
                        }
                      ]}
                    >
                      {this.state.header_text}
                    </Text>
                    {this.state.sweepadded && (
                      <TextInputMask
                        refInput={r => (this.phoneInputRef = r)}
                        value={this.state.phoneNumberFormat}
                        onChangeText={phoneNumberFormat => {
                          const phoneNumberf = phoneNumberFormat.startsWith('1')
                            ? phoneNumberFormat
                            : '1' + phoneNumberFormat;
                          const phoneNumber = phoneNumberf
                            .toString()
                            .replace(/\D+/g, '');
                          this.setState({
                            phoneNumberFormat: phoneNumberf,
                            phoneNumber: phoneNumber
                          });
                        }}
                        onSubmitEditing={this.showThankyouBox}
                        type={'cel-phone'}
                        maxLength={18}
                        options={
                          this.state.phoneNumber.startsWith('1')
                            ? {
                                dddMask: '9 (999) 999 - '
                              }
                            : {
                                dddMask: '(999) 999 - '
                              }
                        }
                        style={styles.inputPhoneNo}
                        placeholder="+1 (000) 000 - 0000"
                        placeholderTextColor="#a1a1a1"
                      />
                    )}
                    {this.state.phoneNumberError !== null && (
                      <Text style={styles.phoneNoErrorText}>
                        {this.state.phoneNumberError}
                      </Text>
                    )}
                    {this.state.sweepadded &&
                      (this.state.loading ? (
                        <View style={styles.button}>
                          <ActivityIndicator color="#FFF" />
                        </View>
                      ) : (
                        <Button
                          loading
                          onPress={this.showThankyouBox}
                          fontSize="20"
                          style={styles.button}
                          primary
                        >
                          <Text style={styles.loginText}>SUBMIT</Text>
                        </Button>
                      ))}
                    {this.state.sweepcountdown && (
                      <Text style={styles.countdown}>
                        {Math.floor(this.state.countdown / 86400000) > 1
                          ? Math.floor(this.state.countdown / 86400000) +
                            ' Days '
                          : Math.floor(this.state.countdown / 86400000) > 0
                          ? '1 Day '
                          : ''}
                        {Math.floor(
                          (this.state.countdown % 86400000) / 3600000
                        ) >= 10
                          ? Math.floor(
                              (this.state.countdown % 86400000) / 3600000
                            )
                          : '0' +
                            Math.floor(
                              (this.state.countdown % 86400000) / 3600000
                            )}
                        :
                        {Math.floor((this.state.countdown % 3600000) / 60000) >=
                        10
                          ? Math.floor((this.state.countdown % 3600000) / 60000)
                          : '0' +
                            Math.floor(
                              (this.state.countdown % 3600000) / 60000
                            )}
                        :
                        {Math.floor((this.state.countdown % 60000) / 1000) >= 10
                          ? Math.floor((this.state.countdown % 60000) / 1000)
                          : '0' +
                            Math.floor(
                              (this.state.countdown % 60000) / 1000
                            )}{' '}
                        Remaining to start
                      </Text>
                    )}

                    <View style={styles.disclaimerContain}>
                      <Text
                        style={[
                          styles.disclaimerText,
                          {
                            fontSize: this.state.sweepstakeData.fontsize,
                            color:
                              '#' + this.state.sweepstakeData.disclaimer_color
                          }
                        ]}
                      >
                        {this.state.sweepdisclaimer}
                      </Text>
                    </View>
                  </Form>
                  <View style={styles.buttonContainer}>
                    {/* Login Button */}

                    <View style={styles.forgotPasswordContainer}>
                      <TouchableOpacity
                        onPress={this.onForgotPasswordButtonPressed}
                      >
                        <Text style={styles.forgotPasswordText}>
                          Forgot Password?
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/* Signup Button */}
                    <View style={styles.signupContainer}>
                      <Text style={styles.dontHaveAccountText}>
                        Don't have an account?
                      </Text>
                      <TouchableOpacity onPress={this.onSignupButtonPressed}>
                        <Text style={styles.signupText}>Sign Up Now.</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default SweepStake;
