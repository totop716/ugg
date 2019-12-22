import Utils from '../utils';
import APIClient from '../utils/api';
import APIConstants from '../utils/api/constants';
import Constants from 'expo-constants';

const loginAPI = (username, password) => {
  const path = 'login/?username='+username+'&password='+password;
  const url = `${Utils.serverUrl}${path}`;

  console.log(path);

  const client = new APIClient(url, APIConstants.HTTPMethod.POST);
  return client.sendRequest();
};

const signupAPI = (username, password, confirmPassword) => {
  const path = '/';
  const url = `${Utils.serverUrl}${path}`;
  const params = {
    username,
    password,
    confirmPassword,
  };

  const client = new APIClient(url, APIConstants.HTTPMethod.POST);

  return client.sendRequest(params);
};

const getUserAPI = (phoneNo) => {
  const path = 'sweepusers/'+phoneNo;
  const url = `${Utils.serverUrl}${path}/`;
  const users = new APIClient(url, APIConstants.HTTPMethod.GET);
  return users.sendRequest();
}

const getSurveyAPI = (survey_id) => {
  const path = 'savesurvey/' + survey_id;
  const url = `${Utils.serverUrl}${path}/`;
  const survey_data = new APIClient(url, APIConstants.HTTPMethod.GET);
  return survey_data.sendRequest();
}

const getCheckInTime = (user_id, tablet_id, sweep_id) => {
  const path = 'sweepcheckin/?user_id='+user_id+'&tablet_id='+tablet_id+'&sweep_id='+sweep_id;
  const url = `${Utils.serverUrl}${path}`;
  const users = new APIClient(url, APIConstants.HTTPMethod.GET);
  console.log(url);
  return users.sendRequest();
}

const updateCheckTime = (user_id, tablet_id, sweep_id, check_time) => {
  const path = 'sweepcheckin/?user_id='+user_id+'&tablet_id='+tablet_id+'&sweep_id='+sweep_id+'&check_time='+check_time;
  const url = `${Utils.serverUrl}${path}`;
  let users;
  users = new APIClient(url, APIConstants.HTTPMethod.PUT);
  console.log("URL", url);
  return users.sendRequest();
}

const updateSurveyCheckTime = (user_id, tablet_id, sweep_id, check_time, survey_answers) => {
  var path = 'sweepcheckin/?user_id='+user_id+'&tablet_id='+tablet_id+'&sweep_id='+sweep_id+'&survey_enter_time='+check_time;
  console.log("111", survey_answers);
  for(var i = 0; i < 10; i ++){
    path += '&survey_question_'+(i+1)+'=';
    if(i < survey_answers.length){
      path+= survey_answers[i];
    }
  }
  const url = `${Utils.serverUrl}${path}`;
  console.log(url);
  let users;
  users = new APIClient(url, APIConstants.HTTPMethod.PUT);
  console.log("URL", url);
  return users.sendRequest();
}

const getTabletAPI = (id, password) => {
  const path = 'tablets/?tablet_id='+id+'&password='+password;
  const url = `${Utils.serverUrl}${path}`;
  const users = new APIClient(url, APIConstants.HTTPMethod.GET);
  return users.sendRequest();
}

const getTabletfromKey = (device_key) => {
  const path = 'tablets/?tablet_id_code='+device_key;
  const url = `${Utils.serverUrl}${path}`;
  const users = new APIClient(url, APIConstants.HTTPMethod.GET);
  return users.sendRequest();
}

const getSweepstakeAPI = (id) => {
  const path = 'sweepstakes/'+id;
  const url = `${Utils.serverUrl}${path}/`;
  const users = new APIClient(url, APIConstants.HTTPMethod.GET);
  return users.sendRequest();
}

const getSettingsAPI = () => {
  const path = 'settings/';
  const url = `${Utils.serverUrl}${path}`;
  const users = new APIClient(url, APIConstants.HTTPMethod.GET);
  return users.sendRequest();
}

const signupUserAPI = (first_name, last_name, address, city, state, zipcode, email, phone, suite_po_box, checkEmail, checkSMS) => {
  const path = 'api/v1/signup/';
  const url = `${Utils.serverUrl}${path}`;
  const users = new APIClient(url, APIConstants.HTTPMethod.POST);
  const currentDate = new Date();
  return users.sendRequest({first_name, last_name, address, city, state, zipcode, email, phone, suite_po_box, label: 'Manual Signup', password: '', checkEmail, checkSMS});
}

const updateTabletID = (tabletData, tablet_id, tablet_password, user_id) => {
  let users; let url;
  if(tabletData == null){
    const path = 'tablets';
    url = `${Utils.serverUrl}${path}/?name=`+tablet_id+'&password='+tablet_password+'&confirm_password='+tablet_password+'&tablet_id_code='+Constants.device_id;
    if(user_id != null)
      url += `&user_id_id=`+user_id;
    users = new APIClient(url, APIConstants.HTTPMethod.POST);  
  }else{
    const path = 'tablets/'+tabletData.id;
    url = `${Utils.serverUrl}${path}/?name=`+tablet_id;
    if(tablet_password != null)
      url += '&password='+tablet_password+'&confirm_password='+tablet_password;
    if(user_id != null)
      url += `&user_id_id=`+user_id;
    users = new APIClient(url, APIConstants.HTTPMethod.PUT);
  }
  console.log("URL", url);
  return users.sendRequest();
}

const updateTabletKey = (tablet_id) => {
  const path = 'tablets/'+tablet_id;
  url = `${Utils.serverUrl}${path}/?tablet_id_code=`+Constants.deviceId;
  users = new APIClient(url, APIConstants.HTTPMethod.PUT);
  console.log("URL", url);
  return users.sendRequest();
}

const updateTabletStatus = (tablet_id, login) => {
  const path = 'tablets/'+tablet_id;
  url = `${Utils.serverUrl}${path}/?login_status=`+login;
  users = new APIClient(url, APIConstants.HTTPMethod.PUT);
  console.log("URL", url);
  return users.sendRequest();
}

export { loginAPI, signupAPI, getUserAPI, getSurveyAPI, signupUserAPI, updateCheckTime, updateTabletID, getTabletAPI, getSweepstakeAPI, getSettingsAPI, getCheckInTime, updateTabletKey, updateTabletStatus, getTabletfromKey, updateSurveyCheckTime };
