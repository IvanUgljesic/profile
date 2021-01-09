import { combineReducers } from 'redux';

import posts from './posts';
import theme from './themeSwitcher';
import qanda from './qanda';

export default combineReducers({posts, theme, qanda});