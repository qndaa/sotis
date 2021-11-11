import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectToken = (state) => state.tokens || initialState;

const makeSelectToken = () => createSelector(selectToken, (substate) => !!substate.token);

export default makeSelectToken;
