import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  View, KeyboardAvoidingView, StyleSheet, ScrollView
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

import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

import {loginAPI, getCheckInTime, updateCheckTime, getSurveyAPI, updateSurveyCheckTime} from '../../services/Authentication'
import styles from './styles';

import { AntDesign, FontAwesome } from '@expo/vector-icons'

import Utils from '../../utils'

class Survey extends Component {
  state = {
    tabletData: null,
    sweepstakeData: null,
    cancelBox: false,
    logoutBox: false,
    admin_user: null,
    logout_error: null,
    sweep_user: null,
    question_no: 0,
    prev_question_no: -1,
    selected_answer: -1,
    survey_questions: null
  };

  componentDidMount(){
    const admin_user = this.props.navigation.getParam('user');
    const sweepData = this.props.navigation.getParam('sweepstakeData');
    const sweep_user = this.props.navigation.getParam('sweepuser');
    const tablet_data = this.props.navigation.getParam('tabletData');
    this.setState({sweepstakeData: sweepData, admin_user: admin_user[0], sweep_user, tabletData: tablet_data });
    console.log("SweepData: ", sweepData);
    const that = this;
    if(sweepData.survey1_check == "yes"){
      getSurveyAPI(sweepData.survey1_name).then(function(res){
        var survey_questions = new Array();
        for(var i = 0; i < res.questions.length; i++){
          var question = new Object();
          question.type = parseInt(res.questions[i].question_type);
          question.question = res.questions[i].question_text;
          question.question_count = res.questions[i].options_count;
          if(res.questions[i].question_type == "1"){
            var qu_answers = res.answer_text.filter(function(value){
              return value.option_question == res.questions[i].id;
            });
            var answers = [];
            for(var j = 0; j < res.questions[i].options_count; j++){
              answers.push(qu_answers[j]);
            }
            question.answers = answers;
          }else if(res.questions[i].question_type == "2"){
            var qu_answers = res.answer_image.filter(function(value){
              return value.option_question == res.questions[i].id;
            });
            var answers = [];
            for(var j = 0; j < res.questions[i].options_count; j++){
              answers.push(qu_answers[j]);
            }
            question.answers = answers;
          }
          survey_questions.push(question);
          console.log("Survey1", survey_questions);
        }
        that.setState({survey_questions});
      });
    }
  }

  componentWillReceiveProps(props){
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

  cancelSurvey = () => {
    const currenttime = new Date();
    this.setState({cancelBox: false})
    const {navigate} = this.props.navigation;
    getCheckInTime(this.state.sweep_user.id, this.state.tabletData.id, this.state.sweepstakeData.id).then((res1) => {
      // const checkedtime = new Date(res1.checkin.check_time.replace(" ", "T"));
      let checkedtime = '';
      if(res1.checkin.check_time != null){
        const checkedtime_array = res1.checkin.check_time.split("T");
        checkedtime = checkedtime_array[0].split("-");  
      }
      if(res1.checkin.check_time == "" || res1.checkin.check_time == null || currenttime.getFullYear() > parseInt(checkedtime[0]) || currenttime.getMonth() > parseInt(checkedtime[1]) - 1 || currenttime.getDate() > parseInt(checkedtime[2])){
        const check_time = currenttime.getFullYear() + "-" + (currenttime.getMonth() + 1) + "-" + currenttime.getDate() + " " + currenttime.getHours() + ":" + currenttime.getMinutes() + ":" + currenttime.getSeconds();
        updateCheckTime(this.state.sweep_user.id, this.state.tabletData.id, this.state.sweepstakeData.id, check_time).then((res2) => {
          console.log("Res2", res2);
        });
        navigate("SweepStake", {thankyou: true, comeback: false, tabletData: this.props.navigation.getParam('tabletData'), sweepstakeData: this.props.navigation.getParam('sweepstakeData'), tabletID: this.props.navigation.getParam('tabletID'), user: this.props.navigation.getParam('user'), sweepuser: this.props.navigation.getParam('sweepuser')})
      }else{
        navigate("SweepStake", {comeback: true, thankyou: false, tabletData: this.props.navigation.getParam('tabletData'), sweepstakeData: this.props.navigation.getParam('sweepstakeData'), tabletID: this.props.navigation.getParam('tabletID'), user: this.props.navigation.getParam('user'), sweepuser: this.props.navigation.getParam('sweepuser')})
      }
    });
  }

  gotoPrevQuiz = () => {
    if(this.state.prev_question_no > -1){
      this.setState({question_no: this.state.prev_question_no});
    }else{
      this.setState({question_no: this.state.question_no - 1})
    }
  }

  gotoNextQuiz = () => {
    const answer = this.state.survey_questions[this.state.question_no].answers[this.state.selected_answer];
    if(answer.option_complete == "2"){
      const currenttime = new Date();
      const {navigate} = this.props.navigation;
      getCheckInTime(this.state.sweep_user.id, this.state.tabletData.id, this.state.sweepstakeData.id).then((res1) => {
        // const checkedtime = new Date(res1.checkin.check_time.replace(" ", "T"));
        let checkedtime = '';
        if(res1.checkin.check_time != null){
          const checkedtime_array = res1.checkin.check_time.split("T");
          checkedtime = checkedtime_array[0].split("-");  
        }
        if(res1.checkin.check_time == "" || res1.checkin.check_time == null || currenttime.getFullYear() > parseInt(checkedtime[0]) || currenttime.getMonth() > parseInt(checkedtime[1]) - 1 || currenttime.getDate() > parseInt(checkedtime[2])){
          const check_time = currenttime.getFullYear() + "-" + (currenttime.getMonth() + 1) + "-" + currenttime.getDate() + " " + currenttime.getHours() + ":" + currenttime.getMinutes() + ":" + currenttime.getSeconds();
          updateSurveyCheckTime(this.state.sweep_user.id, this.state.tabletData.id, this.state.sweepstakeData.id, check_time).then((res3) => {
            navigate("SweepStake", {thankyou: true, comeback: false, tabletData: this.props.navigation.getParam('tabletData'), sweepstakeData: this.props.navigation.getParam('sweepstakeData'), tabletID: this.props.navigation.getParam('tabletID'), user: this.props.navigation.getParam('user'), sweepuser: this.props.navigation.getParam('sweepuser')})
          });
        }else{
          const check_time = currenttime.getFullYear() + "-" + (currenttime.getMonth() + 1) + "-" + currenttime.getDate() + " " + currenttime.getHours() + ":" + currenttime.getMinutes() + ":" + currenttime.getSeconds();
          updateSurveyCheckTime(this.state.sweep_user.id, this.state.tabletData.id, this.state.sweepstakeData.id, check_time).then((res3) => {
            navigate("SweepStake", {comeback: true, thankyou: false, tabletData: this.props.navigation.getParam('tabletData'), sweepstakeData: this.props.navigation.getParam('sweepstakeData'), tabletID: this.props.navigation.getParam('tabletID'), user: this.props.navigation.getParam('user'), sweepuser: this.props.navigation.getParam('sweepuser')});
          });
        }
      });
    }else if(answer.option_complete == "1"){
      const { question_no } = this.state;
      this.setState({question_no: answer.option_goquestion - 1, selected_answer: -1, prev_question_no: question_no});
    }else{
      const { question_no } = this.state;
      this.setState({question_no: this.state.question_no + 1, selected_answer: -1, prev_question_no: question_no});
    }
  }

  render(){
    const tabletData = this.props.navigation.getParam('tabletData');
    console.log("survey ", this.state.survey_questions);
    const image_structure = [[2, 1], [3, 1], [3, 2], [3, 2], [3, 2], [4, 2], [4, 2]];
    return (
      <StyleProvider style={getTheme(material)}>
        <View style={styles.container}>
          <View style={styles.topbar}>
            <Text style={styles.topbar_text}>Tablet ID: {tabletData.name}</Text>
            <AntDesign name="logout" size={32} color="#3d3d3d" onPress={this.showLogoutBox} />
          </View>
          <ScrollView style={styles.content} contentContainerStyle={styles.content_layout}>
            <Modal isVisible={this.state.cancelBox} onBackdropPress={this.closeCancelBox}>
              <View  style={styles.logoutModalContainer}>
                <Text style={styles.thankyouText}>The survey is optional. If you quit the survey you will still be checked in.</Text>
                <View style={styles.buttonsContainer}>
                  <Button
                      style={styles.button}
                      onPress={this.closeCancelBox}
                    >
                    <Text style={styles.button_text}>Cancel</Text>
                  </Button>
                  <Button
                      style={[styles.button, styles.active_button]}
                      onPress={this.cancelSurvey}
                    >
                    <Text style={[styles.button_text, styles.active_button_text]}>Skip Survey</Text>
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
              <Text style={styles.topBarText}>Survey is Optional.</Text>
              <Text style={styles.topBarText}>{this.state.question_no + 1} of {this.state.survey_questions != null &&this.state.survey_questions.length}</Text>
            </View>
            <View style={styles.survey_content}>
              <Text style={styles.servey_question}>{this.state.question_no + 1}.) {this.state.survey_questions != null &&this.state.survey_questions[this.state.question_no].question}</Text>
              {this.state.survey_questions != null && this.state.survey_questions[this.state.question_no].answers.length <=8 ?
              <View style={[styles.answers_container, this.state.survey_questions != null && this.state.survey_questions[this.state.question_no].type == 2 && styles.answer_img_container]}>
                {this.state.survey_questions != null && this.state.survey_questions[this.state.question_no].answers.map((value, index) => 
                  this.state.survey_questions[this.state.question_no].type == 1 ? 
                    <TouchableOpacity style={styles.answer_container} key={index} onPress={()=>{this.setState({selected_answer: index})}}>
                      <View style={[styles.answer_radio, this.state.selected_answer == index && {backgroundColor: '#'+this.state.sweepstakeData.primary_hex_color, borderColor: '#'+this.state.sweepstakeData.border_hightlight_hex_color}]}></View>
                      <Text style={styles.answer_text}>{value.option_text}</Text>
                    </TouchableOpacity>
                  : <TouchableOpacity style={[styles.answer_image, {width: 96/image_structure[this.state.survey_questions[this.state.question_no].answers.length - 2][0] + '%', height: 600/image_structure[this.state.survey_questions[this.state.question_no].answers.length - 2][0]}, this.state.selected_answer == index && {borderColor: '#' + this.state.sweepstakeData.border_hightlight_hex_color, borderWidth: 5, borderRadius: 5}]} key={index} onPress={()=>{this.setState({selected_answer: index})}}><Image source={{uri: Utils.serverUrl+'static/img/uploads/'+value.option_image}} style={{width: '100%', height: '100%'}} /></TouchableOpacity>
                )}
                <View style={{width: (image_structure[this.state.survey_questions[this.state.question_no].answers.length - 2][0] * image_structure[this.state.survey_questions[this.state.question_no].answers.length - 2][1] - this.state.survey_questions[this.state.question_no].answers.length ) * 32 + '%'}}></View>
              </View> : <View style={[styles.answers_container, this.state.survey_questions != null && this.state.survey_questions[this.state.question_no].type == 2 && styles.answer_img_container]}>
                {this.state.survey_questions != null && this.state.survey_questions[this.state.question_no].answers.map((value, index) => <TouchableOpacity style={[styles.answer_image, index == 0 && this.state.survey_questions[this.state.question_no].answers.length == 9 && {width: '100%'}, index >= this.state.survey_questions[this.state.question_no].answers.length - 8 && {width: '24%', height: 150,}, index < 3 && this.state.survey_questions[this.state.question_no].answers.length == 11 && {width: '36%', height: 220}, this.state.selected_answer == index && {borderColor: '#' + this.state.sweepstakeData.border_hightlight_hex_color, borderWidth: 5, borderRadius: 5}]} onPress={()=>{console.log(index); this.setState({selected_answer: index})}} key={index}>
                     <Image source={{uri: Utils.serverUrl+'static/img/uploads/'+value.option_image}} style={{width: '100%', height: '100%'}} />
                    </TouchableOpacity>
                  )
                }
              </View>
              }
            </View>
            <View style={styles.button_container}>
                <TouchableOpacity style={styles.button} onPress={this.showCancelBox}><Text style={styles.button_text}>Skip Survey</Text></TouchableOpacity>
                <View style={styles.next_button_container}>
                  {this.state.question_no > 0 && 
                    <TouchableOpacity style={[styles.button, styles.backbutton, styles.active_button]} onPress={this.gotoPrevQuiz}><Text style={[styles.button_text, styles.active_button_text]}>Back</Text></TouchableOpacity>
                  }
                  {this.state.selected_answer == -1 ?
                    <View style={styles.button}><Text style={styles.button_text}>Next</Text></View>
                    :
                    <TouchableOpacity style={[styles.button, styles.active_button]} onPress={this.gotoNextQuiz}><Text style={[styles.button_text, styles.active_button_text]}>Next</Text></TouchableOpacity>
                  }
                </View>
            </View>
          </ScrollView>
        </View>
      </StyleProvider>
    );
  }
}

export default Survey;
