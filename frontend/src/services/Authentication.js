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

const getTabletAPI = (id) => {
  const path = 'tablets/?key='+id;
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
  const check_time = currentDate.getUTCFullYear() + "-" + (currentDate.getUTCMonth() + 1) + "-" + currentDate.getUTCDate() + " " + currentDate.getUTCHours() + ":" + currentDate.getUTCMinutes() + ":" + currentDate.getUTCSeconds();
  return users.sendRequest({first_name, last_name, address, city, state, zipcode, email, phone, check_time, po_box_unit_number, suite, label: 'Manual Signup', password: ''});
}

const updateCheckTime = (phone, check_time) => {
  const path = 'sweepusers/'+phone;
  const url = `${Utils.serverUrl}${path}/?check_time=`+check_time;
  const users = new APIClient(url, APIConstants.HTTPMethod.PUT);
  return users.sendRequest();
}

const updateTabletID = (tabletData, tablet_id, user_id) => {
  if(tabletData.name == ""){
    const path = 'tablets';
    const url = `${Utils.serverUrl}${path}/?name=`+tablet_id+'&tablet_id_code='+Constants.deviceId;
    if(user_id != null)
      url += `&user_id_id=`+user_id;
    users = new APIClient(url, APIConstants.HTTPMethod.POST);  
  }else{
    const path = 'tablets/'+tabletData.id;
    const url = `${Utils.serverUrl}${path}/?name=`+tablet_id+`&user_id_id=`+user_id;
    users = new APIClient(url, APIConstants.HTTPMethod.PUT);
  }
  return users.sendRequest();
}

export { loginAPI, signupAPI, getUserAPI, signupUserAPI, updateCheckTime, updateTabletID, getTabletAPI, getSweepstakeAPI, getSettingsAPI };
