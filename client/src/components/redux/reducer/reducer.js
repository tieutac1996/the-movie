import { combineReducers } from 'redux';

import hosting from './hosting';

const reducer = combineReducers({
  hosting: hosting,
});

export default reducer;
