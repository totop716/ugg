import Utils from '../utils';
import APIClient from '../utils/api';
import APIConstants from '../utils/api/constants';
import Constants from 'expo-constants';

const loginAPI = (username, password) => {
  const path = '/';
  const url = `${Utils.serverUrl}${path}`;
  const params = {
    username,
    password,
  };

  const client = new APIClient(url, APIConstants.HTTPMethod.POST);

  return client.sendRequest(params);
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

const getCheckInTime = (user_id, tablet_id, sweep_id) => {
  const path = 'sweepcheckin/?user_id='+user_id+'&tablet_id='+tablet_id+'&sweep_id='+sweep_id;
  const url = `${Utils.serverUrl}${path}`;
  const users = new APIClient(url, APIConstants.HTTPMethod.GET);
  console.log(url);
  return users.sendRequest();
}

const updateCheckTime = (methodType, user_id, tablet_id, sweep_id, check_time) => {
  const path = 'sweepcheckin/?user_id='+user_id+'&tablet_id='+tablet_id+'&sweep_id='+sweep_id+'&check_time='+check_time;
  const url = `${Utils.serverUrl}${path}`;
  let users;
  if(methodType == 1)
    users = new APIClient(url, APIConstants.HTTPMethod.POST);
  if(methodType == 2)
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

const signupUserAPI = (first_name, last_name, address, city, state, zipcode, email, phone, po_box_unit_number, suite) => {
  const path = 'api/v1/signup/';
  const url = `${Utils.serverUrl}${path}`;
  const users = new APIClient(url, APIConstants.HTTPMethod.POST);
  const currentDate = new Date();
  return users.sendRequest({first_name, last_name, address, city, state, zipcode, email, phone, po_box_unit_number, suite, label: 'Manual Signup', password: ''});
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

export { loginAPI, signupAPI, getUserAPI, signupUserAPI, updateCheckTime, updateTabletID, getTabletAPI, getSweepstakeAPI, getSettingsAPI, getCheckInTime };
