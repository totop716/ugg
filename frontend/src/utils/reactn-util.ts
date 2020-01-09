import { AsyncStorage } from 'react-native';
import { defaultEmptyCurrentUser } from '../reactn-state';
import { UserData } from '../..';
import moment from 'moment';
import { isLoggedInSel, getUserSessionSel } from '../reactn-state/selectors';

const setCurrentSessionAsync = async (
  data: string | UserData,
  setUserData?: (val: UserData) => Promise<void>
): Promise<void> => {
  try {
    if (typeof data === 'string') {
      await AsyncStorage.setItem('userData', data);
      if (setUserData) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        await getCurrentSessionAsync(setUserData);
      }
      return;
    }

    await AsyncStorage.setItem('userData', JSON.stringify(data));
    if (setUserData) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      await getCurrentSessionAsync(setUserData);
    }
  } catch (e) {
    console.log('setCurrentSessionAsync error:', e);
  }
};

const getCurrentSessionAsync = async (
  setUserData?: (val: UserData) => Promise<void>
): Promise<UserData> => {
  const userData: UserData = defaultEmptyCurrentUser;
  try {
    const item = await AsyncStorage.getItem('userData');
    if (item) {
      const jsoned = (JSON.parse(
        (item as unknown) as string
      ) as unknown) as UserData;
      if (typeof setUserData === 'function') {
        await setUserData(jsoned);
      }

      return jsoned;
    }

    if (typeof setUserData === 'function') {
      await setUserData(userData as UserData);
    }
  } catch (e) {
    console.log('getCurrentSessionAsync e', e);
    throw e;
  }

  return userData as UserData;
};

// session expires 12am the next day
const forceLogoutIfSessionExpired = async (
  setUserData: (val: UserData) => Promise<void>
): Promise<void> => {
  if (isLoggedInSel()) {
    const user = getUserSessionSel();

    if (moment(user.lastLogin).isValid()) {
      const lastLoginStartOfDay = moment(user.lastLogin)
        .startOf('day')
        .toISOString();

      if (
        lastLoginStartOfDay !==
        moment()
          .startOf('day')
          .toISOString()
      ) {
        const userData: UserData = defaultEmptyCurrentUser;
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        await setUserData(userData);
      }
    }
  }
};

export {
  forceLogoutIfSessionExpired,
  setCurrentSessionAsync,
  getCurrentSessionAsync
};
