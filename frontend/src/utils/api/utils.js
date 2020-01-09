import { AsyncStorage } from 'react-native';

import Constants from '../../constants';

const APIUtils = {
  convertQueryString: (queryParams = {}) => {
    const esc = encodeURIComponent;
    const query = Object.keys(queryParams)
      .map(key => `${esc(key)}=${esc(queryParams[key])}`)
      .join('&');

    return query ? `?${query}` : '';
  },

  getAccessToken: async () => {
    try {
      const userSession = await AsyncStorage.getItem(
        // Constants.IDENTIFIERS.ACCESS_TOKEN
        'userData'
      );
      return JSON.parse(userSession).token;
    } catch (e) {
      return '';
    }
  }

  // setAccessToken: async token => {
  //   AsyncStorage.setItem(Constants.IDENTIFIERS.ACCESS_TOKEN, token);
  // }
};

export default APIUtils;
