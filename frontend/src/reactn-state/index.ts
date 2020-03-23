import React from 'reactn';
import { UserData } from '../..';
const { setGlobal } = React;

// const empty = {
//   jwtAccessToken: '',
//   user: {
//     email: '',
//     carDetails: []
//   }
// };

// const emptyObj = {};
const defaultEmptyCurrentUser: UserData = {
  lastLogin: new Date('2020-01-01T00:00:00Z'),
  token: '',
  user: {
    email: '',
    username: ''
  }
};

const initialGlobalState = {
  currentUser: defaultEmptyCurrentUser
};

setGlobal(initialGlobalState);

export { defaultEmptyCurrentUser };
