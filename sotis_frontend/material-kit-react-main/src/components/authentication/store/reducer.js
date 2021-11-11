import { ACTION_TYPES } from './actionTypes';
import { getTokens } from '../../../services/LocalStorage';
import produce from 'immer';

export const initialState = {
  tokens: getTokens() || null
};

const authenticationReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ACTION_TYPES.SET_TOKEN:
        draft.tokens = action.tokens;
        break;

      default:
        return initialState;
    }
  });

export default authenticationReducer;
