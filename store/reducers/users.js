import {SET_USERS} from '../actions/users';

import User from '../../models/user';

const initialState = {
    availableUsers: [],
    loggedUsers: []
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_USERS:
        return{
          availableUsers: action.users,
          loggedUsers: action.userLogged,
        };
    }
    return state;
  };
  