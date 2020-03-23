import {
  NavigationState,
  NavigationScreenProp,
  NavigationParams
} from 'react-navigation';

declare module 'reactn/default' {
  export interface Reducers {
    // setUserData: (
    //   global: State,
    //   dispatch: Dispatch,
    //   userData: {
    //     type: 'SET';
    //     payload: IUserData;
    //   }
    // ) => Pick<State, 'userData'>;
    // doNothing: (
    //   global: State,
    //   dispatch: Dispatch,
    // ) => null;
  }

  export interface State {
    currentUser: UserData;
  }
}

interface INavigation<T extends NavigationParams = {}> {
  navigation: NavigationScreenProp<NavigationState & { routeName?: string }, T>;
}

interface UserDataUser {
  email: string;
  username: string;
}

interface UserData {
  token: string;
  user: UserDataUser;
  lastLogin: Date;
}
