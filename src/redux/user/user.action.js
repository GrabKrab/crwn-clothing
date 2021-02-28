import { userActionTypes } from './user,types';

export const setCurrentuser = user => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: user
})