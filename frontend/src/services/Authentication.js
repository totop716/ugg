import Utils from '../utils';
import APIClient from '../utils/api';
import APIConstants from '../utils/api/constants';


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
  const path = 'myusers/'+phoneNo;
  const url = `${Utils.serverUrl}${path}/`;
  const users = new APIClient(url, APIConstants.HTTPMethod.GET);
  return users.sendRequest();
}

const signupUserAPI = (first_name, last_name, address, city, state, zipcode, email, phone, po_box, unit_number, suite) => {
  const path = 'api/v1/signup/';
  const url = `${Utils.serverUrl}${path}`;
  const users = new APIClient(url, APIConstants.HTTPMethod.POST);
  const currentDate = new Date();
  const check_time = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  const tablet_id = 'Tablet';
  return users.sendRequest({first_name, last_name, address, city, state, zipcode, email, phone, check_time, tablet_id, po_box, unit_number, suite});
}

const updateCheckTime = (phone, check_time) => {
  const path = 'myusers/'+phone;
  const url = `${Utils.serverUrl}${path}/?check_time=`+check_time;
  const users = new APIClient(url, APIConstants.HTTPMethod.PUT);
  return users.sendRequest();
}

const updateTabletID = (phone, tablet_id) => {
  const path = 'myusers/'+phone;
  const url = `${Utils.serverUrl}${path}/?tablet_id=`+tablet_id;
  const users = new APIClient(url, APIConstants.HTTPMethod.PUT);
  return users.sendRequest();
}

export { loginAPI, signupAPI, getUserAPI, signupUserAPI, updateCheckTime, updateTabletID };
