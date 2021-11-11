import ACTION_TYPES from './actionTypes';
import { getAccessToken, getRefreshToken } from '../../../services/LocalStorage';
import produce from 'immer';

export const initialState = {
  token: getAccessToken() || null,
  refreshToken: getRefreshToken() || null
};

const tokenReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ACTION_TYPES.SET_TOKEN: {
        draft.token = action.token;
        break;
      }

      case ACTION_TYPES.SET_REFRESH: {
        draft.refreshToken = action.refreshToken;
        break;
      }

      default:
        return initialState;
    }
  });

export default tokenReducer;
