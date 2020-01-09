import { getGlobal } from 'reactn';
import { UserData } from '../..';

const getUserSessionSel = (): UserData => {
  return getGlobal().currentUser;
};

// default expiry is 1 day
const isLoggedInSel = (): boolean => {
  const userData = (getGlobal()?.currentUser ?? {}) as UserData;
  return !!(userData.token && userData.user.email);
};

export { getUserSessionSel, isLoggedInSel };
